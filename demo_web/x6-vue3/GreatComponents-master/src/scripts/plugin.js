// 给异步加加载样式,无需手动关闭，异步停止时自动停止
/**
 * @loadingProps { lock, text, target, spinner, background }
 * target: 不传为给document.body加加载
*/
import { Loading, Message } from 'element-ui';

export default {
  install (Vue) {
    let map = new Map()
    Vue.prototype.$server = async (fun, loadingProps ) => {
      let { text, target = document.body, spinner, background } = loadingProps || {}
      try {
        if (map.get(target)) {
          map.get(target).value++
        } else {
          map.set(target, {
            value: 1,
            loading: Loading.service({
              lock: true,
              text: text || 'Loading',
              target: target || document.body,
              spinner: spinner || 'el-icon-loading',
              background: background || 'rgba(0, 0, 0, .5)'
            })
          })
        }
        // 不加await，会立即进入finally，而导致loading秒关
        return await fun()
      } catch (e) {
        Message.error(e)
      } finally {
        if ( map.get(target) ) {
          if ( --map.get(target).value === 0 ) {
            map.get(target).loading.close()
            map.delete(target)
          }
        }
      }
    }
  }
}