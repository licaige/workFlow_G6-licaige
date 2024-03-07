import DefaultTheme from 'vitepress/theme'

import ZIcon from '@zi-shui/components/icon'
import '@zi-shui/theme-chalk/src/index.scss'

console.log(ZIcon)
export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.use(ZIcon) // 在vitepress中 注册全局组件
  }
}
