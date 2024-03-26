import { ref } from '../node_modules/@vue/reactivity/dist/reactivity.esm-browser.js'
import { createVNode } from './vnode.js'
export const Component = {
    name: 'Component',
    setup() {
       const txt = ref('局部组件') 
       return {
        txt
       }
    },
    // 一般在 SFC 的模式组件下我们是不用写 render 选项的，render 选项是由 template 进行编译生成
    render() {
        return createVNode('div', {}, 'Hi Vue3 Component param txt is：' + this.txt)
    }
}