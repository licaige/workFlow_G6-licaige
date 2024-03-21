# Vue3

- [vue2-源码分析仓库](https://github.com/woow-wu7/7-vue2-source-code-analysis)
- [vue2-组件库-divinePlus](https://github.com/woow-wu7/8-divine-plus)
- [pinia-使用细节](https://github.com/woow-wu7/5-pinia-test)

# (一) vue3 对比 vue2 做了哪些优化？

```
性能优化

1
Proxy 代替 Object.defineProperty
- 原理
  - Object.defineProps 监听的是对象中的某个 ( 属性 )，如果要监听整个对象，就需要通过循环遍历对象的所有属性来实现，并且对 ( 新增删除 ) 属性无法监听
- 解决
  - 对象属性添加，删除无法响应式
  - 数组下标修改值，通过length修改数组长度都无法响应式 - ( push pop shift unshift splice sort reverse 这原型7种方法因为Vue重写所以能实现响应式 )
- 对比
  - 优势:
    - Proxy: 是对 ( 整个对象 ) 的拦截实现响应式，不需要深层次遍历对象的每个属性，再添加响应式
    - Object.defineProperty: 是对 ( 对象所有已有属性 ) 的拦截实现响应式，需要 ( 深度递归遍历所有属性 ) 添加响应式，性能差
  - 兼容性:
    - proxy 无法兼容ie
    - Object.defineProps 兼容ie8以上的版本
  - 详见 本项目/1-FRONTEND/3-VUE/8-VUE3-Proxy.html

2
tree-shaking，减少打包体积
- 比如:
  - 内置组件: Transition KeepAlive Teleport Suspense TransitionGroup 在项目中如果没有使用到，就不会打包
  - 指令: v-model 在项目中如果没有使用到，也不会打包


3
PatchFlag 和 hoistStatic
- vue2
  - parse -----> 将 template 转成 ast
  - optimize --> 将 静态节点 和 静态根节点 打上标记，在diff时不做diff算法对比；vue2中template有10个p标签，但只有一个p是动态节点即存在变量，vue2整个组件模版中的元素都会重渲染
  - generate --> 将 ast 转成 render 函数
- vue3
  - 动态节点 - PatchFlag 动态节点标记
    - 在vue2中如果一个template中有10个p标签，但只有一个p是动态节点即只有一个p标签存在变量
      - vue2 也会整个组件模版中的元素都会渲染，即 ----------------------------- ( vue2的更新是组件级别的 )
      - vue3 则只会更新模版中打上PatchFlag标记的标签，而不会重渲染整个template -- ( vue3的更新是元素级别的 )
  - 静态节点 - hoistStatic 静态节点提升
    - hoistStatic静态节点提升 ( hoist 是提升的意思 )
    - 当使用hoistStatic时，所有 静态的节点都被提升到render方法之外
    - 这意味着，他们只会在应用启动的时候被创建一次，而后随着每次的渲染被不停地复用


4
cacheHandler 事件监听缓存
- 默认情况下 ( @click等事件 ) 会被认为是 ( 动态变量 )，所以每次 ( 视图更新时会去追踪事件的变化 )
- 但是正常情况下，视图渲染前后，事件一般都不会变化的，是不需要去追踪变化的，所以vue3做了 ( 事件缓存优化 )
- 类比于 React 中的 ( useMemo/useCallback 去缓存函数 )


5
Fragment
- Vue2中的template模版中 只能有 ( 一个 ) ( 根 ) 节点
- Vue3中的template模版中 可以有 ( 多个 ) ( 根 ) 节点
- 这个和react的升级保持一致，react16以后也支持多个根节点
- 注意: 当我们在组件上做 ( 属性透传时 - 不在props和emit中的属性，会自动透传到根元素上 )，如果组件存在多个根节点，将会报错，因为Vue 不知道要将 attribute 透传到哪里


6
删除了一些不常用的api
- filters
  - 原因: 因为可以使用 ( 计算属性 ) 等来完成同样的功能
  - 连接: https://v3-migration.vuejs.org/breaking-changes/props-data.html
- $listeners
  - vue2
    - 透传组件属性
    - $attrs: 组件上不在props中的属性可以通过 $attrs 来获取
    - $listeners: 组件上 v-on 事件可以通过 $listeners 来获取
    - $slots/$scopedSlots: 透传插槽
  - vue3
    - 废除了 $listeners，而是直接通过 ( $attrs ) 来统一获取 ( 不在props, emit, v-on事件 )
    - 保留了 $attrs 和 $slots，注意 $attrs 的变化
    - 属性透传还要注意组件有多个根节点时，将报错 ( vue3 组件支持多个根节点 )
- $children
  - vue3中删除了$children，可以使用 ( template Refs ) 代替


7 其他api的变化
- compositionAPI 和 optionsAPI
  - compositionAPI 来取代 mixin 复用逻辑优势明显
- v-model: 在 api 写法上的变化也要注意
  - 变化
    - 用于组件上-modelValue-默认: v-model="aaa" props->modelValue emit->update:modelValue
    - 用于组件上-aaa-自定义属性: v-model:aaa="xxx" props->aaa emit->update:aaa
  - 扩展
    - vue2.0 时 v-model 和 .sync 的区别？
- 生命周期钩子命名上的变化
  - options api 中生命周期钩子
  - composition api 中的 setup 中的钩子命名
  - 卸载阶段的钩子命名变化
    - vue3 (beforeUnmount,unmounted)
    - vue2 (beforeDestroy,destroyed)
- 自定义指令
  - directive 生命周期钩子命名的变化
  - vue2指令: bind，inserted，update，componentUpdated，unbind
  - vue3指令: 和vue3的生命周期保持一致了，比如 beforeMount，mounted，beforeUpdate，updated ...
  - 扩展
    - 勾子函数的参数: 参数在vue2和vue3中都是一样的 (el, binding, vnode, prevVnode)
    - 详见: 本项目/2-FRONTEND/3-VUE/3.v-permission-VUE3.html
- provide和inject
  - vue2只能在option-api中通过配置项的方式使用
  - vue3还可以直接从vue中获取 provide 和 inject 函数
  - 注意：
    - provide和inject并不保证响应式
    - 解决方案: 在 provide 中使用 computed 包装 // provide() { return { message: computed(() => this.message) } }
    - 解决方案官网说明: https://cn.vuejs.org/guide/components/provide-inject.html#working-with-reactivity
  - 详情请查看 本项目/NOTE/VUE2.md/19
- watch
  - watchEffect(callback) -------- 在依赖更新前也会执行一次
  - watchPostEffect(callback) ---- 在依赖更新前也会执行一次，相当于 flush = 'post'
  - watchSyncEffect() ------------ 在依赖更新前也会执行一次，相当于 flush = 'sync'
  - vue2: 当 watch 的key对应的是一个对象时，属性有 handler，deep，immediate，sync
  - vue3: 当 watch 的key对应的是一个对象时，属性有 handler，deep，immediate，flush，onTrack/onTrigger
    - flush: post ------- 在组件 ( 渲染后 ) 执行侦听器，在侦听器回调中能访问更新之后的 DOM，需设置 flush = 'post'
    - flush: pre -------- 在组件 ( 渲染前执 ) 行侦听器，获取不到最新的DOM，默认值
    - flush: sync ------- 在某些特殊情况下 (例如要使缓存失效)，在响应式依赖发生改变时立即触发侦听器。需设置 flush = 'sync'
- v-for和v-if的优先级
  - vue2: v-for > v-if
  - vue3: v-if > v-for
  - 详见: 1-FRONTEND/3-VUE/1-VUE2.md/(10)vue2中v-if和v-for的优先级

8
其他
- 更好的代码管理方式: monorepo
- 类型系统: typescript

9
资料
- https://juejin.cn/post/6844904199726055437#heading-3
- https://www.bilibili.com/video/BV1ke411W7WB?spm_id_from=333.337.search-card.all.click&vd_source=a8374ac38c77856369542fc154a1e043
```

# (二) setup 和 created 谁先执行？

- setup 先于 beforeCreate 和 created 选项式钩子函数执行
- setup 配置对象中是没有 onBeforeCreate() onCreated() 两个钩子函数

# (三) 为什么 ref 要设计 .value

```
为什么 ref 要设计 .value ?
---

1
实现响应式
- 因为 proxy 实现响应式，是对 ( 对象 ) 的拦截，所以 ( ref ) 必须是一个对象，而 ( value ) 是ref的一个属性，用来 ( 存储数据值 )
- vue3 是通过对 ref 的 value 属性做 get 和 set 实现的响应式

2
保持相应式
- 因为如果 ref 是一个值类型，不是对象的的话，没法保持相应式
- 详见下面的例子
let a = 0;
function computed(getter) {
  let ref = 0;
  setTimeout(() => {
    ref = getter();
  }, 1000);
  return ref;
}
a = computed(() => 1);
// 1s后，打印 a，值是 0

// -------
let b = {};
function computed2(getter) {
  let ref = {
    value: 0,
  };
  setTimeout(() => {
    ref.value = getter();
  }, 1000);
  return ref;
}
b = computed2(() => 1);
// 1s后打印 b，值是 { value: 1 }

// (一)
// 比较以上 computed 和 computed2 中的 ref 的区别

// 1. 1s后a的值还是 0
// - 因为 computed 中的 ref 是 ( 值类型 )，为return的值类型，返回后就不变了

// 2. 1s后b的值变成了 { value: 1 }
// - 因为 computed2 中的 ref 是 ( 引用类型 )，为return的引用类型，返回的是 ( 值的引用 )，1s后引用被修改了，所以 b 就会变化

// (二)
let aa = 100;
let bb = aa;
aa = 200;
console.log(bb); // 100

let cc = { count: 1 };
let dd = cc;
cc.count = 100;
console.log(dd); // { count: 100 };
```

# (四) 内置组件

### transition

- 官网 https://cn.vuejs.org/guide/built-ins/transition.html#css-based-transitions

```
transition
- 概念
  - 内置组件
  - 作用是将 ( 进入和开动画 ) 通过默认插槽应用到插槽的 ( 元素或组件 ) 上
- 触发条件
  - v-if 触发的切换
  - v-show 触发的切换
  - component 切换的动态组件
- 属性
  - name 表示过渡效果名称
- 事件
  -  @before-enter @enter @after-enter  @enter-cancelled
  -  @before-leave @leave @after-leave @leave-cancelled
- 注意
  - transition 仅支持单个元素或组件作为其插槽内容，如果是组件则该组件必须只有一个根元素
---

1
css过渡class
- enter
  - v-enter-from
  - v-enter-active
  - v-enter-to
- leave
  - v-leave-from
  - v-leave-active
  - v-leave-to

2
性能
- transform 和 opacity
  - 1. 以上两个属性在动画中 ( 不影响DOM结构 )，不会发生 ( 重排 )，性能优秀
  - 2. transform可以触发 ( GPU硬件加速，并且不会影响重排回流，因为是新生成的图层，和普通的图层不影响 )
```

# (四) 其他

```
1
命令式 和 声明式 和 函数式 的区别？
---

命令式 - imperative
- 主要思想: 命令式编程的主要思想是关注计算机执行的步骤，即 ( 一步一步 ) 告诉计算机先做什么再做什么

声明式 - Declarative
- 声明式编程是以数据结构的形式来表达程序执行的逻辑
- 主要思想: 它的主要思想是告诉计算机应该做什么，但不指定具体要怎么做

函数式 - Functional
- 函数式 和 声明式类似
- 主要思想: 它的主要思想是告诉计算机应该做什么，但不指定具体要怎么做
- 主要区别: 函数式和命令式的区别: 函数式编程不仅仅局限于声明式编程
```

```
2
问题: 包名以 @ 开头是什么意思？
回答:
  - @组织名/包名
  - 这样的包被称为 ( Scoped Package )
  - github上可以建立 Organization 组织，在组织中新建的包在npm发布时就可以发布具有 ( scoped ) 的包
 资料
  - https://blog.csdn.net/u013727805/article/details/80849329
```

# (五) Pinia

- [pinia-使用细节](https://github.com/woow-wu7/5-pinia-test)

```
Pinia
--

1
plugin
- 持久化插件: pinia-plugin-persistedstate

2
问题: 组件外如何使用store ？
- 只要满足: app.use(pinia) 即vue插件pinia安装后，就可以调用各个store
- https://pinia.vuejs.org/zh/core-concepts/outside-component-usage.html

3
store属性
- 内部暴露的属性和方法都是以 $ 开头的
- 手写重置插件
  - store.$reset() 通过建立一个新的状态对象，将 store 重设为初始状态
  - store.$state 获取state
  - store.$patch(state) 更新state
- store.$id
- store.$state
- store.$onAction()
  - $onAction(callback, detached?): () => void
  - 设置一个回调，当一个 action 即将被调用时，就会被调用。
  - callback参数: store name args
  - 详见: 本项目/src/views/PiniaView.vue
- store.$subscribe
  - $subscribe(callback, options?): () => void
  - 设置一个回调，当状态发生变化时被调用

4
问题: 如何给每个store实现一个reset方法？(好处: 复用，不用每个store都实现一个)
报错: 我们直接在 <script setup> 中调用 store.$reset 会报错，所以我们需要手动实现reset方法
报错信息: Uncaught Error: 🍍: Store "counter" is built using the setup syntax and does not implement $reset().
实现:
  - 我们需要借助 pinia/plugin 用插件的方式来为每个store添加 reset() 方法
  - store.$reset() 通过建立一个新的状态对象，将 store 重设为初始状态
  - store.$state 获取state
  - store.$patch(state) 更新state
链接: https://stackoverflow.com/questions/71690883/pinia-reset-alternative-when-using-setup-syntax
详细:
const reset = ({ store }: { store: Store }) => {
  const initialState = lodash.cloneDeep(store.$state)
  store.$reset = () => store.$patch(initialState) // 重写 store.$reest() 方法
}
const pinia = createPinia()
pinia.use(reset) // pinia reset
```
