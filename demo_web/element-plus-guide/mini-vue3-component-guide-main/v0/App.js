import { createVNode } from './vnode.js'
export const App = {
    name: 'App',
    setup() {
       return {
        count: 520
       }
    },
    // 一般在 SFC 的模式组件下我们是不用写 render 选项的，render 选项是由 template 进行编译生成
    render() {
        return createVNode('div', {}, 'Hi Vue3 Component param count is：' + this.count)
    }
}