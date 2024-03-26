import { proxyRefs, effect } from '../node_modules/@vue/reactivity/dist/reactivity.esm-browser.js'
import { createVNode } from './vnode.js'
// 当前运行的组件实例
export let currentInstance = null
// 当前运行的渲染组件实例
export let currentRenderingInstance = null

// 创建渲染器
function createRenderer(options) {
    // 把参数进行解构进行重命名，方便区分理解
    const {
        createElement: hostCreateElement,
        insert: hostInsert,
        setElementText: hostSetElementText
    } = options
    // 渲染函数，主要是把一个虚拟 DOM 渲染到某一个元素节点上
    function render(vnode, container, parentComponent) {
        patch(null, vnode, container, parentComponent)
    }
    // 补丁函数，n1 旧虚拟DOM, n2 新虚拟DOM，container 渲染的节点
    function patch(n1, n2, container, parentComponent) {
        const { type } = n2
        if(typeof type === 'string') {
            // 作为普通元素进行处理
            if (!n1) {
                // 创建节点
                mountElement(n2, container, parentComponent)
            } else {
                // 更新节点
            }
        } else if(typeof type === 'object') {
            // 如果是 type 是对象，那么就作为组件进行处理
            if(!n1) {
                // 挂载组件
                mountComponent(n2, container, parentComponent)
            } else {
                // 更新组件
            }
        }
    }
    // 初始化一个组件的上下文对象
    const emptyAppContext = createAppContext()
    // 组件挂载
    function mountComponent(vnode, container, parent) {
        // 组件的 appContext 继承父组件的 appContext 或者虚拟DOM 的 appContext，如果都不存在则创建一个空的上下文对象
        const appContext =
              (parent ? parent.appContext : vnode.appContext) || emptyAppContext
        // 定义组件实例，一个组件实例本质上就是一个对象，它包含与组件有关的状态信息
        const instance = {
            vnode,
            type: vnode.type,
            appContext,
            setupState: null, // 组件自身的状态数据，即 setup 的返回值
            isMounted: false, // 用来表示组件是否已经被挂载，初始值为 false
            subTree: null, // 组件所渲染的内容，即子树 (subTree)
            update: null, // 更新函数
            render: null, // 组件渲染函数
            proxy: null, // 组件代理对象
        }
        // 将组件实例设置到 vnode 上，用于后续更新
        vnode.component = instance
        const { setup, render } = instance.type
        // 设置当前的组件实例
        setCurrentInstance(instance)
        // 运行组件对象的 setup 方法，获取返回结果
        const setupResult = setup()
        // 设置当前组件当前组件实例为空
        setCurrentInstance(null)

        if(typeof setupResult === 'object') {
            // 如果组件的 setup 方法返回的是一个对象，则通过 proxyRefs 方法处理之后设置到 instance 的 setupState 属性上
            // proxyRefs 转换 ref 类型省去 .value 繁琐操作
            instance.setupState = proxyRefs(setupResult)
        } else {
            // 返回的值还有可能是函数，这里不作展开分析了
        }
        // 设置 render 函数中的 this 代理对象，通过 call 方法设置 render 函数中的 this 指向此 Proxy 代理对象
        instance.proxy = new Proxy({ _:instance }, {
            get({ _: instance}, key) {
                if(key in instance.setupState) {
                    // 如果获取的 key 存在 instance.setupState 上则返回 instance.setupState 对应的值
                    return instance.setupState[key]
                }
                // 其他可以是 props, slots 等
            }
        })
        // 把组件对象上的 render 函数赋值给组件实例的 render 属性
        instance.render = render
        // 将渲染任务包装到一个 effect 中，这样组件自身状态发生变化时，组件便能进行自动触发更新；另外 effect 函数会返回一个 runner 函数，把返回的 runner 函数设置到组件实例对象上 update 属性上，后续更新则可以直接调用组件实例上的 update 方法了
        instance.update = effect(() => {
            // 如果 isMounted 为 false 则是组件挂载阶段
            if(!instance.isMounted) {
                // 通过组件的实例的 render 函数生成子树
                const subTree = (instance.subTree = renderComponentRoot(instance))
                // 把虚拟DOM 渲染到对应的节点上
                patch(null, subTree, container, instance)
                // 把生成的真实DOM 设置到虚拟DOM 的真实DOM 属性 el 上，后续如果没有变化，则不需要再次生成
                instance.vnode.el = subTree.el
                // 表示组件挂载完成
                instance.isMounted = true
            } else {
                // 组件更新阶段
            }
        })

    }
    // 具体怎么把虚拟DOM 渲染成真实DOM 
    function mountElement(vnode, container, parentComponent) {
        // 使用 vnode.type 作为标签名称创建 DOM 元素
        const el = (vnode.el = hostCreateElement(vnode.type))
        // 获取 children 内容
        const { children } = vnode
        if(typeof children === 'string') {
            // 如果 children 是字符串，则说明它是元素的文本节点
            hostSetElementText(el, children)
        } else if(Array.isArray(children)) {
            // 如果是子节点是数组则进行循环创建
            children.forEach((v) => {
                // 递归调用 patch 函数渲染子节点，使用上面新创建的当前元素 el 作为挂载点
                patch(null, v, el, parentComponent)
            })
        }
        // 将元素插入到挂载点下
        hostInsert(el, container)
    }
    // 返回渲染器对象
    return {
        createApp: createAppAPI(render)
    }
}
// 设置当前的组件实例
function setCurrentInstance(instance) {
    currentInstance = instance
}

function renderComponentRoot(
    instance
  ) {
    const { proxy, render } = instance
    let result
    // 返回上一个正在渲染的实例对象
    const prev = setCurrentRenderingInstance(instance)
    result = render.call(proxy)
    // 再设置当前的渲染对象上一个，具体场景是嵌套循环渲染的时候，渲染完子组件，再返回去渲染父组件
    setCurrentRenderingInstance(prev)
    return result
}
// 设置正在渲染的组件实例
function setCurrentRenderingInstance(instance) {
    const prev = currentRenderingInstance
    currentRenderingInstance = instance
    return prev
}
// 创建 Vue3 应用
function createAppAPI(render) {
    return function createApp(rootComponent) {
        // 创建应用实例的上下文对象
        const context = createAppContext()
        // 插件注册池
        const installedPlugins = new Set()
        // 创建 Vue3 应用实例对象
        const app = (context.app = {
            // 注册插件方法
            use(plugin, ...options) {
                if (installedPlugins.has(plugin)) {
                  // 已经注册过的插件不运行再进行注册
                  console.warn(`Plugin has already been applied to target app.`)
                } else if (plugin && typeof plugin.install === 'function') {
                  // 如果插件对象的 install 属性是一个函数，那么就通过调用插件对象的 install 方法进行插件注册
                  installedPlugins.add(plugin)
                  plugin.install(app, ...options)
                } else if (typeof plugin === 'function') {
                  // 如果插件对象本身是一个函数，那么就直接执行插件本身进行插件注册
                  installedPlugins.add(plugin)
                  plugin(app, ...options)
                }
                return app
            },
            // 注册全局组件方法
            component(name, component) {
                if (!component) {
                  // 如果不存在 component 那么就是获取组件对象
                  return context.components[name]
                }
                // 把组件注册到 Vue3 应用实例上下文对象的 components 属性上
                context.components[name] = component
                return app
            },
            // 实例挂载方法
            mount(rootContainer) {
                // 创建根组件虚拟DOM
                const vnode = createVNode(rootComponent)
                // 把应用实例的上下文对象设置到根组件的虚拟DOM 的 appContext 属性上
                vnode.appContext = context
                // 把根组件的虚拟DOM 渲染到 #app 节点上
                render(vnode, rootContainer)
            }
        })
        return app
    }
}
// 当前组件上下文对象，其中包含 config，app，components 等，而 components 则是我们这期重点要了解的
function createAppContext() {
    return {
        app: null,
        config: {},
        mixins: [],
        components: {},
        directives: {},
        provides: Object.create(null),
    }
}
// 创建元素
function createElement(type) {
    return document.createElement(type)
}
// 插入元素
function insert(child, parent, anchor) {
    parent.insertBefore(child, anchor || null)
}
// 创建元素文本
function setElementText (el, text) {
    el.textContent = text
}
// 创建渲染器
const renderer = createRenderer({
    createElement,
    insert,
    setElementText
})
// 创建 Vue3 应用
export function createApp(...args) {
    return renderer.createApp(...args)
}