import { Button } from './Button.js';
import { Icon } from './Icon.js';
// 为每个组件安装插件
Button.install = app => app.component('Button', Button)
Icon.install = app => app.component('Icon', Icon)
// 组件库
const components = [
    Button,
    Icon
]
// 是否已安装标识
const INSTALLED_KEY = Symbol('INSTALLED_KEY')
// 组件库插件
export const ElementPlus = {
    install(app) {
        // 如果该组件库已经安装过了，则不进行安装
        if (app[INSTALLED_KEY]) return;
        // 将标识值设置为 true，表示已经安装了
        app[INSTALLED_KEY] = true;
        // 循环组件库中的每个组件进行安装
        components.forEach((c) => app.use(c));
    }
}