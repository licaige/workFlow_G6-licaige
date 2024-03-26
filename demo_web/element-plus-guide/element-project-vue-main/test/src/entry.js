import MyButton from "./MyButton";
import SfcButton from './SfcButton.vue'
// 添加插件方法
MyButton.install = app => app.component('MyButton', MyButton)
SfcButton.install = app => app.component('SfcButton', SfcButton)

// 组件库
const Element = {
    MyButton,
    SfcButton,
    install: app => {
        app.use(MyButton)
        app.use(SfcButton)
    }
}

export default Element