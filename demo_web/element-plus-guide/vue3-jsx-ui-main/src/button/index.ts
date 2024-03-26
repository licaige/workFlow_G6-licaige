import { App } from "vue"
import Button from "./src/button"
// 具名导出
export { Button }
// 导出插件
export default {
    install(app: App) {
        app.component(Button.name, Button)
    }
}

import '@vue/runtime-core'

declare module '@vue/runtime-core' {
  // GlobalComponents for Volar
  export interface GlobalComponents {
    CButton: typeof Button
  }
}