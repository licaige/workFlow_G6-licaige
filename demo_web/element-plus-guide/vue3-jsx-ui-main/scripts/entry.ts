// 入口文件
// 1. 引入实现组件批量导出去
import type { App } from 'vue'
import ButtonPlugin, { Button } from '../src/button'
// 2. 导出一个 Vue 插件
export { Button }

const installs = [ButtonPlugin]

export default {
    install(app: App) {
        installs.forEach(p => app.use(p))
    }
}