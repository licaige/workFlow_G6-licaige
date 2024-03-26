import { ref } from '../node_modules/@vue/reactivity/dist/reactivity.esm-browser.js'
import { resolveComponent } from './resolveAssets.js'
import { createVNode } from './vnode.js'
import { Component } from './Component.js'
export const App = {
    name: 'App',
    components: {
        // 注册局部组件
        Component
    },
    setup() {
       const count = ref(520) 
       return {
        count
       }
    },
    // 一般在 SFC 的模式组件下我们是不用写 render 选项的，render 选项是由 template 进行编译生成
    render() {
        // 获取局部组件
        const comp = resolveComponent('Component')
        // 获取全局组件
        const RouterView = resolveComponent('RouterView')
        return createVNode('div', {}, [
            createVNode('p', {}, 'Hi Vue3 Component param count is：' + this.count),
            createVNode(comp),
            createVNode(RouterView)
        ])
    }
}