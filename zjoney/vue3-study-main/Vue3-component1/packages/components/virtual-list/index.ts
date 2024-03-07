import { withInstall } from '@zi-shui/utils/with-install'
import _vertual from './src/virtual'

const VirtualList = withInstall(_vertual) // 生成带有install方法的组件

export default VirtualList // 导出Icon组件

declare module 'vue' {
  export interface GlobalComponents {
    ZVirtualList: typeof VirtualList
  }
}
