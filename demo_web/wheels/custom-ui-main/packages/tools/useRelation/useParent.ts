/**
 * 1. 此方法用于子组件将当前实例，加入到父组件child集合中，并可接受父组件传递过来的值
 * 2. 接收父组件的link和unlink方法，分别用于向父组件的child集合中，添加或删除当前子组件实例
 * 3. 方法返回值
 *  parent：子组件对应的父组件，如useChildren中的example，parent为<father>组件
 *  index: 子组件在父组件child集合中对应的索引值
 */
import {
  ref,
  inject,
  computed,
  onUnmounted,
  InjectionKey,
  getCurrentInstance,
  ComponentPublicInstance,
  ComponentInternalInstance,
} from 'vue';

type ParentProvide<T> = T & {
  link(child: ComponentInternalInstance): void;
  unlink(child: ComponentInternalInstance): void;
  children: ComponentPublicInstance[];
  internalChildren: ComponentInternalInstance[];
};

export function useParent<T>(key: InjectionKey<ParentProvide<T>>) {
  const parent = inject(key, null);

  if (parent) {
    const instance = getCurrentInstance()!;
    const { link, unlink, internalChildren } = parent;

    // 向父组件的子组件们中添加当前子组件
    link(instance);
    onUnmounted(() => unlink(instance));

    const index = computed(() => internalChildren.indexOf(instance));

    return {
      parent,
      index,
    };
  }

  return {
    parent: null,
    index: ref(-1),
  };
}
