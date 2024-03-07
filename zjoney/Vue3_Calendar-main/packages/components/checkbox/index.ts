// 用来整合组件的 最终实现导出组件

import _Checkbox from './src/checkbox.vue'
import { withInstall } from '@zi-shui/utils/with-install'

const Checkbox = withInstall(_Checkbox)

export default Checkbox // 可以通过app.use来使用 也可以通过 import方式单独使用

export * from './src/checkbox'

// 这里添加的类型 可以再模版中被解析
declare module 'vue' {
  export interface GlobalComponents {
    // 我们的接口可以自动合并
    ZCheckbox: typeof Checkbox
  }
}
