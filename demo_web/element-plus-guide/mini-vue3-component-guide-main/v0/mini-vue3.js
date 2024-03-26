import { createVNode } from './vnode.js'
// 创建渲染器
function createRenderer(options) {
    // 把参数进行解构进行重命名，方便区分理解
    const {
        createElement: hostCreateElement,
        insert: hostInsert,
        setElementText: hostSetElementText
    } = options
    // 渲染函数，主要是把一个虚拟 DOM 渲染到某一个元素节点上
    function render(vnode, container) {
        patch(null, vnode, container, null, null)
    }
    // 补丁函数， n1 旧虚拟DOM, n2 新虚拟DOM，container 渲染的节点
    function patch(n1, n2, container) {
        const { type } = n2
        if(typeof type === 'string') {
            // 作为普通元素进行处理
            if (!n1) {
                // 创建节点
                mountElement(n2, container)
            } else {
                // 更新节点
            }
        } else if(typeof type === 'object') {
            // 如果是 type 是对象，那么就作为组件进行处理
            if(!n1) {
                // 挂载组件
                mountComponent(n2, container)
            } else {
                // 更新组件
            }
        }
    }
    // 组件挂载
    function mountComponent(vnode, container) {
        // 获取组件的 setup、render 方法
        const { setup, render } = vnode.type 
        // 运行组件对象的 setup 方法，获取返回结果
        const setupResult = setup()
        // 通过组件的实例的 render 函数生成子树，通过 call 方法设置 render 函数中的 this 指向组件 setup 返回的结果，让 render 函数能够访问组件自身的状态数据
        const subTree = render.call(setupResult)
        // 调用 patch 把虚拟DOM 渲染成真实DOM
        patch(null, subTree, container)
    }
    // 具体怎么把虚拟DOM 渲染成真实DOM 
    function mountElement(vnode, container) {
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
                patch(null, v, el)
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
// 创建 Vue3 应用实例
function createAppAPI(render) {
    return function createApp(rootComponent) {
        // 创建 Vue3 应用实例
        const app = {
            // 实例挂载方法
            mount(rootContainer) {
                // 创建根组件虚拟DOM
                const vnode = createVNode(rootComponent)
                // 把根组件的虚拟DOM 渲染到 #app 节点上
                render(vnode, rootContainer)
            }
        }
        return app
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
// 创建元素文本节点
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