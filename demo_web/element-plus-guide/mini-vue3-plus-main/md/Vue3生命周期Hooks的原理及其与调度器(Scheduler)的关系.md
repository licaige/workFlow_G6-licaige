# Vue3生命周期Hooks的原理及其与调度器(Scheduler)的关系
### 写在最前：本文章的目标
Vue3的生命周期的实现原理是比较简单的，但要理解整个Vue3的生命周期则还要结合整个Vue的运行原理，又因为Vue3的一些生命周期的执行机制是通过Vue3的调度器来完成的，所以想要彻底了解Vue3的生命周期原理还必须要结合Vue3的调度器的实现原理来理解。同时通过对Vue3的调度器的理解，从而加深对Vue底层的一些设计原理和规则的理解，所以本文章的目标是理解Vue3生命周期Hooks的原理以及通过Vue3生命周期Hooks的运行了解Vue3调度器(Scheduler)的原理。

### Vue3生命周期的实现原理
Vue3的生命周期Hooks函数的实现原理还是比较简单的，就是把各个生命周期的函数挂载或者叫注册到组件的实例上，然后等到组件运行到某个时刻，再去组件实例上把相应的生命周期的函数取出来执行。

下面来看看具体代码的实现

#### 生命周期类型

```javascript
// packages/runtime-core/src/component.ts
export const enum LifecycleHooks {
    BEFORE_CREATE = 'bc', // 创建之前
    CREATED = 'c', // 创建
    BEFORE_MOUNT = 'bm', // 挂载之前
    MOUNTED = 'm', // 挂载之后
    BEFORE_UPDATE = 'bu', // 更新之前
    UPDATED = 'u', // 更新之后
    BEFORE_UNMOUNT = 'bum', // 卸载之前
    UNMOUNTED = 'um', // 卸载之后
	// ...
}
```

#### 各个生命周期Hooks函数的创建

```javascript
// packages/runtime-core/src/apiLifecycle.ts
export const onBeforeMount = createHook(LifecycleHooks.BEFORE_MOUNT)
export const onMounted = createHook(LifecycleHooks.MOUNTED)
export const onBeforeUpdate = createHook(LifecycleHooks.BEFORE_UPDATE)
export const onUpdated = createHook(LifecycleHooks.UPDATED)
export const onBeforeUnmount = createHook(LifecycleHooks.BEFORE_UNMOUNT)
export const onUnmounted = createHook(LifecycleHooks.UNMOUNTED)
```

可以看到各个生命周期的Hooks函数是通过createHook这个函数创建的

#### 创建生命周期函数createHook

```javascript
// packages/runtime-core/src/apiLifecycle.ts
export const createHook = (lifecycle) => (hook, target = currentInstance) => injectHook(lifecycle, hook, target)
```

createHook是一个闭包函数，通过闭包缓存当前是属于哪个生命周期的Hooks,target表示该生命周期Hooks函数被绑定到哪个组件实例上，默认是当前工作的组件实例。createHook底层又调用了一个injectHook的函数，那么下面我们继续来看看这个injectHook函数。

#### injectHook函数

injectHook是一个闭包函数，通过闭包缓存绑定对应生命周期Hooks到对应的组件实例上。

```javascript
// packages/runtime-core/src/apiLifecycle.ts
export function injectHook(type, hook, target) {
    if(target) {
        // 把各个生命周期的Hooks函数挂载到组件实例上，并且是一个数组，因为可能你会多次调用同一个组件的同一个生命周期函数
        const hooks = target[type] || (target[type] = [])
        // 把生命周期函数进行包装并且把包装函数缓存在__weh上
        const wrappedHook =
        hook.__weh ||
        (hook.__weh = (...args: unknown[]) => {
          if (target.isUnmounted) {
            return
          }
            // 当生命周期调用时 保证currentInstance是正确的
            setCurrentInstance(target)
            // 执行生命周期Hooks函数
            const  res = args ? hook(...args) : hook()
            unsetCurrentInstance()
          return res
        })
        // 把生命周期的包装函数绑定到组件实例对应的hooks上
        hooks.push(wrappedHook)
        // 返回包装函数
        return wrappedHook
    }
}
```
#### 生命周期Hooks的调用

```javascript
instance.update = effect(() => {
    if (!instance.isMounted) {
        const { bm, m } = instance
        // 生命周期：beforeMount hook
        if (bm) {
            invokeArrayFns(bm)
        }
        // 组件初始化的时候会执行这里
        // 为什么要在这里调用 render 函数呢
        // 是因为在 effect 内调用 render 才能触发依赖收集
        // 等到后面响应式的值变更后会再次触发这个函数  
        const subTree = (instance.subTree = renderComponentRoot(instance))
        patch(null, subTree, container, instance, anchor)
        instance.vnode.el = subTree.el 
        instance.isMounted = true
        // 生命周期：mounted
        if(m) {
            // mounted需要通过Scheduler的函数来调用
            queuePostFlushCb(m)
        }
    } else {
        // 响应式的值变更后会从这里执行逻辑
        // 主要就是拿到新的 vnode ，然后和之前的 vnode 进行对比

        // 拿到最新的 subTree
        const { bu, u, next, vnode } = instance
        // 如果有 next 的话， 说明需要更新组件的数据（props，slots 等）
        // 先更新组件的数据，然后更新完成后，在继续对比当前组件的子元素
        if(next) {
            next.el = vnode.el
            updateComponentPreRender(instance, next)
        }

        // 生命周期：beforeUpdate hook
        if (bu) {
            invokeArrayFns(bu)
        }

        const subTree = renderComponentRoot(instance)
        // 替换之前的 subTree
        const prevSubTree = instance.subTree
        instance.subTree = subTree
        // 用旧的 vnode 和新的 vnode 交给 patch 来处理
        patch(prevSubTree, subTree, container, instance, anchor)

        // 生命周期：updated hook
        if (u) {
            // updated 需要通过Scheduler的函数来调用
            queuePostFlushCb(u)
        }
    }
}, {
    scheduler() {
        queueJobs(instance.update)
    }
})
```

上面这个是Vue3组件实例化之后，通过effect包装一个更新的副作用函数来和响应式数据进行依赖收集。在这个副作用函数里面有两个分支，第一个是组件挂载之前执行的，也就是生命周期函数beforeMount和mount调用的地方，第二个分支是组件挂载之后更新的时候执行的，在这里就是生命周期函数beforeUpdate和updated调用的地方。
具体就是在挂载之前，还没生成虚拟DOM之前就执行beforeMount函数，之后则去生成虚拟DOM经过patch之后，组件已经被挂载到页面上了，也就是页面上显示视图了，这个时候就去执行mount函数;在更新的时候，还没获取更新之后的虚拟DOM之前执行beforeUpdate，然后去获取更新之后的虚拟DOM，然后再去patch，更新视图，之后就执行updated。
需要注意的是beforeMount和beforeUpdate是同步执行的，都是通过invokeArrayFns来调用的。
invokeArrayFns函数

```javascript
export const invokeArrayFns = (fns: Function[], arg?: any) => {
  for (let i = 0; i < fns.length; i++) {
    fns[i](arg)
  }
}
```

组件挂载和更新则是异步的，需要通过Scheduler来处理。

### Vue3调度器(Scheduler)原理 
在Vue3的一些API，例如：组件的生命周期API、watch API、组件更新的回调函数都不是立即执行的，而是放到异步任务队列里面，然后按一定的规则进行执行的，比如说任务队列里面同时存在，watch的任务，组件更新的任务，生命周期的任务，它的执行顺序是怎么样的呢？这个就是由调度器的调度算法决定，同时调度算法只调度执行的顺序，不负责具体的执行。这样设计的好处就是即便将来Vue3增加新的异步回调API，也不需要修改调度算法，可以极大的减少 Vue API 和 队列间耦合。
Vue3的Scheduler提供了三个入列方式的API：

queuePreFlushCb API: 加入 Pre 队列 组件更新前执行

```javascript
export function queuePreFlushCb(cb: SchedulerJob) {
  queueCb(cb, activePreFlushCbs, pendingPreFlushCbs, preFlushIndex)
}
```

queueJob API: 加入 queue 队列 组件更新执行

```javascript
export function queueJob(job: SchedulerJob) {

}
```

queuePostFlushCb API: 加入 Post 队列 组件更新后执行

```javascript
export function queuePostFlushCb(cb: SchedulerJobs) {
  queueCb(cb, activePostFlushCbs, pendingPostFlushCbs, postFlushIndex)
}
```
由于Vue3只提供了入列方式的API并没有提供出列方式的API，所以我们只能控制何时入列，而何时出列则由Vue3调度器本身控制。

那么Vue3调度器如何控制出列方式呢？其实也很简单。

```javascript
function flushJobs(seen?) {
    isFlushPending = false
    // 组件更新前队列执行
    flushPreFlushCbs(seen)
    try{
        // 组件更新队列执行
        let job
        while (job = queue.shift()) {
            job && job()
        }
    } finally {
        // 组件更新后队列执行
        flushPostFlushCbs(seen)
        // 如果在执行异步任务的过程中又产生了新的队列，那么则继续回调执行
        if (
            queue.length ||
            pendingPreFlushCbs.length ||
            pendingPostFlushCbs.length
        ) {
            flushJobs(seen)
        }
    }
}
```



### Vue父子组件的生命周期的执行顺序
这里有两个概念需要厘清的概念，一：父子组件的执行顺序，二：父子组件生命周期的执行顺序。这两个是不一样的

#### 父子组件的执行顺序

这个是先执行父组件再执行子组件，先父组件实例化，然后去获取父组件的虚拟DOM之后在patch的过程中，如果父组件的虚拟DOM中存在组件类型的虚拟DOM也就是子组件，那么在patch的分支中就会去走组件初始化的流程，如此循环。

#### 父子组件生命周期的执行顺序

父子组件生命周期的执行顺序是在父子组件的执行顺序下通过调度算法按Vue的规则进行执行的。首先父组件先实例化进行执行，通过上面的生命周期的调用说明，我们可以知道，父组件在更新函数update第一次执行，也就是组件初始化的时候，先执行父组件的beforeMount，然后去获取父组件的虚拟DOM，然后在patch的过程中遇到虚拟节点是组件类型的时候，就又会去走组件初始化的流程，这个时候其实就是子组件初始化，那么之后子组件也需要走一遍组件的所有流程，子组件在更新update第一次执行的时候，先执行子组件的beforeMount，再去获取子组件的虚拟DOM，然后patch子组件的虚拟DOM，如果过程中又遇到节点是组件类型的话，又去走一遍组件初始化的流程，直到子组件patch完成，然后执行子组件的mounted生命周期函数，接着回到父组件的执行栈，执行父组件的mounted生命周期。

所以在初始化创建的时候，是深度递归创建子组件的过程，父子组件的生命周期的执行顺序是：

1. 父组件 -> beforeMount
2. 子组件 -> beforeMount
3. 子组件 -> mounted
4. 父组件 -> mounted

父子组件更新顺序同样是深度递归执行的过程：

1. 如果父子组件没通过props传递数据，那么更新的时候，就各自执行各自的更新生命周期函数。
2. 如果父子组件存在通过props传递数据的话，就必须先更新父组件，才能更新子组件。因为父组件 DOM 更新前，需要修改子组件的 props，子组件的 props 才是正确的值。

下面我们来看源码

```javascript
if (next) {
    next.el = vnode.el
    // 在组件更新前，先更新一些数据
    updateComponentPreRender(instance, next, optimized)
} else {
    next = vnode
}
```

例如更新props,更新slots

```javascript
  const updateComponentPreRender = (
    instance: ComponentInternalInstance,
    nextVNode: VNode,
    optimized: boolean
  ) => {
    nextVNode.component = instance
    const prevProps = instance.vnode.props
    instance.vnode = nextVNode
    instance.next = null
    // 更新props
    updateProps(instance, nextVNode.props, prevProps, optimized)
    // 更新slots
    updateSlots(instance, nextVNode.children, optimized)
	// ...
  }
```

所以在父子组件更新的时候，父子组件的生命周期执行顺序是：

1. 父组件 -> beforeUpdate 
2. 子组件 -> beforeUpdate
3. 子组件 -> updated
4. 父组件 -> updated

同样卸载的时候父子组件也是深度递归遍历执行的过程：

1. 父组件 -> beforeUnmount 
2. 子组件 -> beforeUnmount 
3. 子组件 -> unmounted
4. 父组件 -> unmounted

### 组件卸载的时候，是在卸载些什么呢？

组件卸载的时候主要是卸载模版引用，清除effect里面保存的相关组件的更新函数的副作用函数，如果是缓存组件，则清除相关缓存，最后去移除真实DOM上相关节点。

另外组件 DOM 更新（instance.update）是有保存在调度器的任务队列中的，组件卸载的时候，也需要把相关的组件更新（instance.update）设置失效。

在源码的unmountComponent函数中，有这么一段：

```javascript
if (update) {
    // 把组件更新函数的active设置false
    update.active = false
    unmount(subTree, instance, parentSuspense, doRemove)
}
```

然后在Scheduler执行queue队列任务的时候，那些job的active为false的则不执行

```javascript
const job = queue[flushIndex]
// 那些job的active为false的则不执行
if (job && job.active !== false) {
    callWithErrorHandling(job, null, ErrorCodes.SCHEDULER)
}
```

那么组件 DOM 更新（instance.update）什么时候会被删除呢？

在源码的updateComponent函数可以找到删除instance.update的设置

```javascript
invalidateJob(instance.update)
// 立即执行更新任务
instance.update()
```

调度器删除任务

```javascript
export function invalidateJob(job: SchedulerJob) {
  // 找到 job 的索引
  const i = queue.indexOf(job)
  if (i > flushIndex) {
    // 删除 Job
    queue.splice(i, 1)
  }
}
```

由此我们可以得知在一个组件更新的时候，会先把该组件在调度器里的更新任务先删除。因为组件更新也是一个递归执行更新的过程，在递归的过程中执行了子组件的更新，那么调度器的任务队列里面的子组件更新任务就不需要再执行了，所以就要删除掉，将来子组件依赖的响应式数据发生了更新，那么则重新把子组件的更新任务放到调度器的任务队列里去。

### 组件更新的调度器里的队列任务的失效与删除的区别

通过上述组件卸载的介绍我们可以总结一下组件更新的调度器里的队列任务的失效与删除的区别

失效

- 组件卸载时，将 Job 设置为失效，Job 从队列中取出时，不再执行 
- 不能再次加入队列，因为会被去重
- 被卸载的组件，无论它依赖的响应式变量如何更新，该组件都不会更新了 

删除

- 组件更新时，删除该组件在调度器任务队列中的 Job 
- 可以再次加入队列 
- 删除任务，因为已经更新过了，不需要重复更新。 如果依赖的响应式变量再次被修改，仍然需要加入调度器的任务队列，等待更新 

### 父子组件执行顺序与调度器的关系

假设有有这样一个场景，有一对父子组件，子组件使用watch API监听某个子组件的响应式数据发生改变之后，然后去修改了N个父组件的响应式数据。那么N个父组件的更新函数都将被放到调度器的任务队列中等待执行。这种情况调度器怎么确保最顶层的父组件的更新函数最先执行呢？

我们先看看调度器的任务队列里的Job的数据结构

```javascript
export interface SchedulerJob extends Function {
  id?: number  // 用于对队列中的 job 进行排序，id 小的先执行
  active?: boolean
  computed?: boolean
  allowRecurse?: boolean 
  ownerInstance?: ComponentInternalInstance	
}
```

Job是一个函数，并且带有一些属性。其中id，表示优先级，用于实现队列插队，id 小的先执行,active通过上文我们可以知道active表示 Job 是否有效，失效的 Job 不执行，如组件卸载会导致 Job 失效。

调度器任务队列的数据结构

```javascript
const queue: SchedulerJob[] = []
```

是一个数组

调度器任务队列的执行

```javascript
// 按任务id大小排序
queue.sort((a, b) => getId(a) - getId(b))
try {
    for (flushIndex = 0; flushIndex < queue.length; flushIndex++) {
        const job = queue[flushIndex]
        if (job && job.active !== false) {
            // 使用带有 Vue 内部的错误处理函数执行job
            callWithErrorHandling(job, null, ErrorCodes.SCHEDULER)
        }
    }
} finally {
    // 清空 queue 队列
    flushIndex = 0
    queue.length = 0
}
```

那么又怎么确保父组件的更新函数的任务id是最小的呢？

通过查看源码我们可以看在创建组件实例的createComponentInstance函数中有一个uid的属性，并且它的初始值为0，后续则++

```javascript
let uid = 0 // 初始化为0
export function createComponentInstance(
  vnode
  parent
  suspense
) {
  const instance: ComponentInternalInstance = {
    uid: uid++,
   // ...   
  }
```

然后在创建组件更新函数的时候可以看到，组件更新函数的id就是该组件实例的uid

```javascript
const update = (instance.update = effect.run.bind(effect) as SchedulerJob)
update.id = instance.uid
```

组件创建的过程是深度递归创建子组件的过程，所以最先的父组件是0，后面的子组件则一路++上去，这样就确保了子组件的更新函数的任务id是一定大于父组件更新函数的id的。所以当调度器的任务队列里面同时存在很多组件的更新函数的时候，通过优先级排序，就可以确保一定父组件的更新函数最先执行了。

当前中途也可以进行插队

```javascript
export function queueJob(job: SchedulerJob) {
	// 没有id的则push到最后
    if (job.id == null) {
      queue.push(job)
    } else {
      // 进行插队处理
      queue.splice(findInsertionIndex(job.id), 0, job)
    }
    queueFlush()
}
```




### Hooks的本质
最后探讨一下Hooks的本质

Vue的Hooks设计是从React的Hooks那里借鉴过来的，React的Hooks的本质就是把状态变量、副作用函数存到函数组件的fiber对象上，等到将来状态变量发生改变的时候，相关的函数组件fiber就重新进行更新。Vue3这边的实现原理也类似，通过上面的生命周期的Hooks实现原理，我们可以知道Vue3的生命周期的Hooks是绑定到具体的组件实例上，而状态变量，则因为Vue的变量是响应式的，状态变量会通过effect和具体的组件更新函数进行依赖收集，然后进行绑定，将来状态变量发生改变的时候，相应的组件更新函数会重新进入调度器的任务队列进行调度执行。

所以Hooks的本质就是让那些状态变量或生命周期函数和组件绑定起来，组件运行到相应时刻执行相应绑定的生命周期函数，那些绑定的变量发生改变的时候，相应的组件也重新进行更新。



### 最后

下一篇准备写一下watch API的实现原理，同时watch API也需要和调度器结合进行理解，只有相互串联理解才可以把Vue3底层设计和实现原理理解得更加透切一些。





最后推荐一个学习 vue3 源码的库，它是基于崔效瑞老师的开源库 mini-vue 而来，在 mini-vue 的基础上实现更多的 vue3 核心功能，用于深入学习 vue3， 让你更轻松地理解 vue3 的核心逻辑。

Github 地址：[mini-vue3-plus](https://github.com/amebyte/mini-vue3-plus)