export function createVNode(type, props, children) {
    const vnode = {
        type, // 虚拟DOM 类型
        props, // props 属性
        children, // 虚拟DOM 的孩子元素
        component: null, // 虚拟DOM 的组件实例
        key: props && props.key, // 虚拟DOM 的 key
        el: null // 真实DOM 元素
    }
    return vnode
}