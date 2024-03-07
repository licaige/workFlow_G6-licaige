import { withInstall } from '@zi-shui/utils/with-install'
import _Upload from './src/upload.vue'

const Upload = withInstall(_Upload); // 为了用户可以将组件进行全局安装 app.use

export default Upload

declare module 'vue' { // 给我们的编辑器添加类型
  export interface GlobalComponents {
    ZUpload: typeof Upload
  }
}
export * from './src/upload'
