# Virtual DOM 开源库——Snabbdom

### Snabbdom 特点

- Vue 2.x 内部使用的 Virtual DOM 就是改造的 Snabbdom
- 大约 200 行代码
- 通过模块可扩展
- 源码使用 TypeScript 开发
- 最快的 Virtual DOM 之一

### 常用模块

#### class

- 方便**动态切换** class
- 注意：给元素设置类是通过 sel 选择器

#### attributes

- 设置 DOM 元素的属性，使用 setAttribute()
- 能处理布尔类型的属性

#### props

- 跟上面的 attributes 模块相似，不过设置 DOM 元素的属性是用 element[attr] = value 的形式
- 不处理布尔类型的属性

#### dataset

- 设置 `data-*` 的自定义属性

#### style

- 设置行内样式，支持动画
- 增加了三个属性：delayed/remove/destroy

#### eventlisteners

- 注册和移除事件

### Snabbdom 源码解析

先说一下如何学习源码：先宏观了解，然后带着目标看源码，看源码的过程中不要陷入细节，而是要不求甚解，可以配合调试理解源码的运行，并且可以参考必要的资料。

#### Snabbdom 核心

- 使用 h() 函数创建 JavaScript 对象（VNode）描述真实 DOM
- init() 设置模块，创建 patch()
- patch() 比较新旧两个 VNode
- 把变化的内容更新到真实 DOM 树上

#### h() 函数

h()函数最早见于 hyperscript，使用 JavaScript 创建超文本。Snabbdom 中的 h()函数不是用来创建超文本，而是创建 VNode。

h() 函数有函数重载的概念，函数重载是参数个数和类型不同的同一函数实现不同的逻辑，JavaScript 中没有重载，TypeScript 中有重载，不过重载的实现还是通过代码调整参数。

```ts
export function h(sel: string): VNode
export function h(sel: string, data: VNodeData | null): VNode
export function h(sel: string, children: VNodeChildren): VNode
export function h(sel: string, data: VNodeData | null, children: VNodeChildren): VNode
export function h(sel: any, b?: any, c?: any): VNode {
  let data: VNodeData = {}
  let children: any
  let text: any
  let i: number

  if (c !== undefined) {
    // 三个参数的情况
    if (b !== null) {
      data = b
    }
    if (is.array(c)) {
      children = c
    } else if (is.primitive(c)) {
      text = c
    } else if (c && c.sel) {
      children = [c]
    }
  } else if (b !== undefined && b !== null) {
    // 两个参数的情况
    if (is.array(b)) {
      children = b
    } else if (is.primitive(b)) {
      text = b
    } else if (b && b.sel) {
      children = [b]
    } else {
      data = b
    }
  }
  if (children !== undefined) {
    for (i = 0; i < children.length; ++i) {
      if (is.primitive(children[i])) children[i] = vnode(undefined, undefined, undefined, children[i], undefined)
    }
  }
  if (sel[0] === 's' && sel[1] === 'v' && sel[2] === 'g' && (sel.length === 3 || sel[3] === '.' || sel[3] === '#')) {
    addNS(data, children, sel)
  }
  return vnode(sel, data, children, text, undefined)
}
```

#### VNode

```ts
export interface VNode {
  // 选择器
  sel: string | undefined
  // 节点数据：属性、样式、事件等
  data: VNodeData | undefined
  // 子节点，和 text 只能互斥
  children: Array<VNode | string> | undefined
  // 记录 vnode 对应的真实 DOM
  elm: Node | undefined
  // 节点中的内容，和 children 只能互斥
  text: string | undefined
  // 优化用
  key: Key | undefined
}

export function vnode(
  sel: string | undefined,
  data: any | undefined,
  children: Array<VNode | string> | undefined,
  text: string | undefined,
  elm: Element | Text | undefined
): VNode {
  const key = data === undefined ? undefined : data.key
  return { sel, data, children, text, elm, key }
}
```

#### VNode 渲染成真实 DOM

- patch(oldVnode, newVnode)
- 打补丁，把新节点中变化的内容渲染到真实 DOM，最后返回新节点作为下一次处理的旧节点

具体对比过程如下：

- 对比新旧 VNode 是否是相同节点（节点的 key 和 sel 相同）
- 如果不是相同节点，删除之前的内容，重新渲染
- 如果是相同节点，再判断新的 VNode 是否有 text，如果有并且和 oldVnode 的 text 不同，直接更新 文本内容
- 如果新的 VNode 有 children，判断子节点是否有变化，判断子节点的过程使用的就是 diff 算法
- diff 过程只进行同层比较

#### init() 返回 patch()

init 是高阶函数，内部返回 patch 函数，把 vnode 渲染成真实 DOM，并返回 VNode。

```ts
export function init(modules: Array<Partial<Module>>, domApi?: DOMAPI) {
  let i: number
  let j: number
  const cbs: ModuleHooks = {
    create: [],
    update: [],
    remove: [],
    destroy: [],
    pre: [],
    post: [],
  }
  // 初始化转换虚拟节点的 api
  const api: DOMAPI = domApi !== undefined ? domApi : htmlDomApi
  // 把传入的所有模块的钩子函数，统一存储到 cbs 对象中
  // 最终构建的 cbs 对象的形式 cbs = {create: [fn1, fn2], update: [], ... }
  for (i = 0; i < hooks.length; ++i) {
    // cbs.create = [], cbs.update = [] ...
    cbs[hooks[i]] = []
    for (j = 0; j < modules.length; ++j) {
      // modules 传入的模块数组
      // 获取模块中的 hook 函数
      // hook = modules[0][create] ...
      const hook = modules[j][hooks[i]]
      if (hook !== undefined) {
        // 把获取到的 hook 函数放入到 cbs 对应的钩子函数数组中
        ;(cbs[hooks[i]] as any[]).push(hook)
      }
    }
  }

  function emptyNodeAt(elm: Element) {
    // ……
  }

  function createRmCb(childElm: Node, listeners: number) {
    // ……
  }

  function createElm(vnode: VNode, insertedVnodeQueue: VNodeQueue): Node {
    // ……
  }

  function addVnodes(parentElm: Node, before: Node | null, vnodes: VNode[], startIdx: number, endIdx: number, insertedVnodeQueue: VNodeQueue) {
    // ……
  }

  function invokeDestroyHook(vnode: VNode) {
    // ……
  }

  function removeVnodes(parentElm: Node, vnodes: VNode[], startIdx: number, endIdx: number): void {
    // ……
  }

  function updateChildren(parentElm: Node, oldCh: VNode[], newCh: VNode[], insertedVnodeQueue: VNodeQueue) {
    // ……
  }

  function patchVnode(oldVnode: VNode, vnode: VNode, insertedVnodeQueue: VNodeQueue) {
    // ……
  }

  return function patch(oldVnode: VNode | Element, vnode: VNode): VNode {
    let i: number, elm: Node, parent: Node
    // 保存新插入节点的队列，为了触发钩子函数
    const insertedVnodeQueue: VNodeQueue = []
    // 执行模块的 pre 钩子函数
    for (i = 0; i < cbs.pre.length; ++i) cbs.pre[i]()

    // 如果 oldVnode 不是 VNode, 创建 VNode 并设置 elm
    if (!isVnode(oldVnode)) {
      // 把 DOM 元素转换成空的 VNode
      oldVnode = emptyNodeAt(oldVnode)
    }

    // 如果新旧节点是相同节点（key 和 sel 相同）
    if (sameVnode(oldVnode, vnode)) {
      // 找节点的差异并更新 DOM
      patchVnode(oldVnode, vnode, insertedVnodeQueue)
    } else {
      // 如果新旧节点不同，vnode 创建对应的 DOM
      // 获取当前的 DOM 元素
      elm = oldVnode.elm!
      parent = api.parentNode(elm) as Node
      // 创建 vnode 对应的 DOM 元素，并触发 init/create 钩子函数
      createElm(vnode, insertedVnodeQueue)

      if (parent !== null) {
        // 如果父节点不为空，把 vnode 对应的 DOM 插入到文档中
        api.insertBefore(parent, vnode.elm!, api.nextSibling(elm))
        // 移除老节点
        removeVnodes(parent, [oldVnode], 0, 0)
      }
    }
    // 执行用户设置的 insert 钩子函数
    for (i = 0; i < insertedVnodeQueue.length; ++i) {
      insertedVnodeQueue[i].data!.hook!.insert!(insertedVnodeQueue[i])
    }
    // 执行模块的 post 钩子函数
    for (i = 0; i < cbs.post.length; ++i) cbs.post[i]()
    // 返回 vnode
    return vnode
  }
}
```

#### createElm()

创建 vnode 对应的 DOM 元素，即给 vnode.elm 赋值，并触发 init/create 钩子函数

```ts
function createElm(vnode: VNode, insertedVnodeQueue: VNodeQueue): Node {
  let i: any
  let data = vnode.data
  if (data !== undefined) {
    // 执行用户设置的 init 钩子函数
    const init = data.hook?.init
    if (isDef(init)) {
      init(vnode)
      data = vnode.data
    }
  }
  // 把 vnode 转换成真实 DOM 对象（没有渲染到页面）
  const children = vnode.children
  const sel = vnode.sel
  if (sel === '!') {
    // 如果选择器是 ! ，创建注释节点
    if (isUndef(vnode.text)) {
      vnode.text = ''
    }
    vnode.elm = api.createComment(vnode.text!)
  } else if (sel !== undefined) {
    // 如果选择器不为空
    // 解析选择器
    // Parse selector
    const hashIdx = sel.indexOf('#')
    const dotIdx = sel.indexOf('.', hashIdx)
    const hash = hashIdx > 0 ? hashIdx : sel.length
    const dot = dotIdx > 0 ? dotIdx : sel.length
    const tag = hashIdx !== -1 || dotIdx !== -1 ? sel.slice(0, Math.min(hash, dot)) : sel
    const elm = (vnode.elm = isDef(data) && isDef((i = data.ns)) ? api.createElementNS(i, tag, data) : api.createElement(tag, data))
    if (hash < dot) elm.setAttribute('id', sel.slice(hash + 1, dot))
    if (dotIdx > 0) elm.setAttribute('class', sel.slice(dot + 1).replace(/\./g, ' '))
    // 执行模块的 create 钩子函数
    for (i = 0; i < cbs.create.length; ++i) cbs.create[i](emptyNode, vnode)
    // 如果 vnode 中有子节点，创建子 vnode 对应的 DOM 元素并追加到 DOM 树上
    if (is.array(children)) {
      for (i = 0; i < children.length; ++i) {
        const ch = children[i]
        if (ch != null) {
          api.appendChild(elm, createElm(ch as VNode, insertedVnodeQueue))
        }
      }
    } else if (is.primitive(vnode.text)) {
      // 如果 vnode 的 text 值是 string/number，创建文本节点并追加到 DOM 树
      api.appendChild(elm, api.createTextNode(vnode.text))
    }
    const hook = vnode.data!.hook
    if (isDef(hook)) {
      // 执行用户传入的钩子 create
      hook.create?.(emptyNode, vnode)
      if (hook.insert) {
        // 把 vnode 添加到队列中，为后续执行 insert 钩子做准备
        insertedVnodeQueue.push(vnode)
      }
    }
  } else {
    // 如果选择器为空，创建文本节点
    vnode.elm = api.createTextNode(vnode.text!)
  }
  // 返回新创建的 DOM
  return vnode.elm
}
```

![](https://cdn.jsdelivr.net/gh/qiqihaobenben/picture/2021-8-17/1629210680295-createElm.png)

#### removeVnodes()

```ts
function createRmCb(childElm: Node, listeners: number) {
  // 返回删除元素的回调函数
  return function rmCb() {
    if (--listeners === 0) {
      const parent = api.parentNode(childElm) as Node
      api.removeChild(parent, childElm)
    }
  }
}

function invokeDestroyHook(vnode: VNode) {
  const data = vnode.data
  if (data !== undefined) {
    // 执行用户设置的 destroy 钩子函数
    data?.hook?.destroy?.(vnode)
    // 调用模块中的 destroy 钩子函数
    for (let i = 0; i < cbs.destroy.length; ++i) cbs.destroy[i](vnode)
    // 执行子节点的 destroy 钩子函数
    if (vnode.children !== undefined) {
      for (let j = 0; j < vnode.children.length; ++j) {
        const child = vnode.children[j]
        if (child != null && typeof child !== 'string') {
          invokeDestroyHook(child)
        }
      }
    }
  }
}

function removeVnodes(parentElm: Node, vnodes: VNode[], startIdx: number, endIdx: number): void {
  for (; startIdx <= endIdx; ++startIdx) {
    let listeners: number
    let rm: () => void
    const ch = vnodes[startIdx]
    if (ch != null) {
      // 如果 sel 有值
      if (isDef(ch.sel)) {
        // 执行 destroy 钩子函数（会执行所有子节点的 destroy 钩子函数）
        invokeDestroyHook(ch)
        // listeners 保证模块的 remove 钩子函数都调用完毕后，才删除节点，避免重复删除
        listeners = cbs.remove.length + 1
        // 创建删除的回调函数
        rm = createRmCb(ch.elm!, listeners)
        for (let i = 0; i < cbs.remove.length; ++i) cbs.remove[i](ch, rm)
        // 执行用户设置的 remove 钩子函数
        const removeHook = ch?.data?.hook?.remove
        if (isDef(removeHook)) {
          removeHook(ch, rm)
        } else {
          // 如果没有用户钩子函数，直接调用删除元素的方法
          rm()
        }
      } else {
        // Text node
        // 如果是文本节点，直接调用删除元素的方法
        api.removeChild(parentElm, ch.elm!)
      }
    }
  }
}
```

#### addVnodes()

```ts
function addVnodes(parentElm: Node, before: Node | null, vnodes: VNode[], startIdx: number, endIdx: number, insertedVnodeQueue: VNodeQueue) {
  for (; startIdx <= endIdx; ++startIdx) {
    const ch = vnodes[startIdx]
    if (ch != null) {
      api.insertBefore(parentElm, createElm(ch, insertedVnodeQueue), before)
    }
  }
}
```

#### patchVnode()

```ts
function patchVnode(oldVnode: VNode, vnode: VNode, insertedVnodeQueue: VNodeQueue) {
  const hook = vnode.data?.hook
  // 首先执行用户设置的 prepatch 钩子函数
  hook?.prepatch?.(oldVnode, vnode)
  const elm = (vnode.elm = oldVnode.elm)!
  const oldCh = oldVnode.children as VNode[]
  const ch = vnode.children as VNode[]
  // 如果新旧 vnode 相同，直接返回
  if (oldVnode === vnode) return
  if (vnode.data !== undefined) {
    //  执行模块的 update 钩子函数
    for (let i = 0; i < cbs.update.length; ++i) cbs.update[i](oldVnode, vnode)
    // 执行用户设置的 update 钩子函数
    vnode.data.hook?.update?.(oldVnode, vnode)
  }
  // 如果 vnode.text 未定义
  if (isUndef(vnode.text)) {
    if (isDef(oldCh) && isDef(ch)) {
      // 新旧节点都有 children，且不相等，调用 updateChildren()，使用 diff 算法，对比子节点，并且更新子节点的差异
      if (oldCh !== ch) updateChildren(elm, oldCh, ch, insertedVnodeQueue)
    } else if (isDef(ch)) {
      // 只有新节点有 children 属性，如果旧节点有 text 属性，清空对应的 DOM 元素的 textContent，然后添加所有的子节点
      if (isDef(oldVnode.text)) api.setTextContent(elm, '')
      addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue)
    } else if (isDef(oldCh)) {
      // 只有旧节点有 children 属性，就移除旧节点的所有子节点
      removeVnodes(elm, oldCh, 0, oldCh.length - 1)
    } else if (isDef(oldVnode.text)) {
      // 只有旧节点有 text 属性， 清空对应 DOM 元素的 textContent
      api.setTextContent(elm, '')
    }
  } else if (oldVnode.text !== vnode.text) {
    // 新节点有 text 属性，且不等于旧节点的 text 属性
    // 如果旧节点有 children，移除旧节点 children 对应的 DOM 元素
    if (isDef(oldCh)) {
      removeVnodes(elm, oldCh, 0, oldCh.length - 1)
    }
    // 设置新节点对应 DOM 元素的 textContent
    api.setTextContent(elm, vnode.text!)
  }
  // 执行用户设置的 postpatch 钩子函数
  hook?.postpatch?.(oldVnode, vnode)
}
```
