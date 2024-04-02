/**
 * 1. 此方法用于父组件获取其归属的所有子组件集合
 * examples: 
 *  <Father>
 *    <Child>
 *      子组件1
 *      <Grandchild>孙组件1</Grandchild>
 *      <Grandchild>孙组件2</Grandchild>
 *    </Child>
 *    <Child>
 *      子组件2
 *      <Grandchild>孙组件1</Grandchild>
 *      <Grandchild>孙组件2</Grandchild>
 *    </Child>
 *    <Child>子组件3</Child>
 *  </Father>
 * 
 * 2. 使用的vue类型
 * （1）ComponentPublicInstance: 子组件实例
 * （2）ComponentInternalInstance：子组件的虚拟DOM实例
 * （3）InjectionKey: Symbol类型的Key
 * 
 * 3. flattenVNodes:
 *  以递归的形式获取父组件所有子组件
 *
 * 4.sortChildren
 * 按着子组件在父组件中存在的顺序进行排列，目的是用于unlink时，internalChildren，和children中各项数据一一对应
 * 
 * 5.useChildren【核心方法】
 * 参数:key -> Symbol类型的唯一值，用于子组件通过Symbol值找到其对应的父组件
 * - 子方法link：
 *    参数value，可用于父组件向子组件传递值，比如传递props等
 *    分别向internalChildren和children数组中放入当前子组件
 * - 子方法unlink
 *    参数child，子组件实例
 *    分别在internalChildren和children中删除当前子组件
 */

import {
  ComponentInternalInstance,
  VNode,
  ComponentPublicInstance,
  getCurrentInstance,
  InjectionKey,
  isVNode, 
  reactive,
  VNodeNormalizedChildren,
  provide } from "vue";

export function flattenVNodes(children: VNodeNormalizedChildren) {
  const result: VNode[] = [];

  const traverse = (children: VNodeNormalizedChildren) => {
    if (Array.isArray(children)) {
      children.forEach((child) => {
        if (isVNode(child)) {
          result.push(child);

          if (child.component?.subTree) {
            result.push(child.component.subTree);
            traverse(child.component.subTree.children);
          }

          if (child.children) {
            traverse(child.children);
          }
        }
      });
    }
  };

  traverse(children);

  return result;
}


export function sortChildren(
  parent: ComponentInternalInstance,
  publicChildren: ComponentPublicInstance[],
  internalChildren: ComponentInternalInstance[]
) {
  const vnodes = flattenVNodes(parent.subTree.children);

  internalChildren.sort(
    (a, b) => vnodes.indexOf(a.vnode) - vnodes.indexOf(b.vnode)
  );

  const orderedPublicChildren = internalChildren.map((item) => item.proxy!);

  publicChildren.sort((a, b) => {
    const indexA = orderedPublicChildren.indexOf(a);
    const indexB = orderedPublicChildren.indexOf(b);
    return indexA - indexB;
  });
}

export function useChildren<
  // eslint-disable-next-line @typescript-eslint/ban-types
  Child extends ComponentPublicInstance = ComponentPublicInstance<{}, any>,
  ProvideValue = any
>(key: InjectionKey<ProvideValue>) {
  const children: Child[] = reactive([])
  const internalChildren: ComponentInternalInstance[] = reactive([])
  const parent = getCurrentInstance()!

  const linkChildren = (value?: ProvideValue) => {
    const link = (child: ComponentInternalInstance) => {
      if (child.proxy) {
        internalChildren.push(child)
        children.push(child.proxy as Child)
        sortChildren(parent, children, internalChildren);
      }
    }

    const unlink = (child: ComponentInternalInstance) => {
      const index = internalChildren.indexOf(child);
      children.splice(index, 1);
      internalChildren.splice(index, 1);
    };

    provide(
      key,
      Object.assign(
        {
          link,
          unlink,
          children,
          internalChildren,
        },
        value
      )
    );
  }
  return {
    children,
    linkChildren,
  };
}