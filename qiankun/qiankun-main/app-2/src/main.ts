import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import {
  renderWithQiankun,
  qiankunWindow,
  type QiankunProps
} from 'vite-plugin-qiankun/dist/helper'

/**
 * @description 注意！每次执行路由，都要createApp一次，否则警告：
 * @description [Vue warn]: App has already been mounted.
 * @description If you want to remount the same app, move your app creation logic into a factory function and create fresh app instances for each mount - e.g. `const createMyApp = () => createApp(App)
 * */
let app: any = null

const render = ({ container }: any) => {
  // 如果是在主应用的环境下就挂载主应用的节点，否则挂载到本地
  const appDom = container ? container : '#app'
  app = createApp(App)
  app.use(createPinia()).use(router)
  app.mount(appDom)
}

const initQiankun = () => {
  renderWithQiankun({
    // bootstrap 只会在微应用初始化的时候调用一次，下次微应用重新进入时会直接调用 mount 钩子，不会再重复触发 bootstrap
    // 通常我们可以在这里做一些全局变量的初始化，比如不会在 unmount 阶段被销毁的应用级别的缓存等
    bootstrap() {
      console.log('bootstrap')
    },
    // 应用每次进入都会调用 mount 方法，通常我们在这里触发应用的渲染方法，也可以接受主应用传来的参数
    mount(_props: any) {
      console.log('%c%s', 'padding: 2px 10px;color: #fff; background: #67C23A', 'mount', _props)
      render(_props)
    },
    // 应用每次 切出/卸载 会调用的unmount方法，通常在这里我们会卸载微应用的应用实例
    unmount(_props: any) {
      console.log('%c%s', 'padding: 2px 10px;color: #fff; background: #F56C6C', 'unmount', _props)
      const appDom = _props.container ? _props.container : '#app'
      app.unmount(appDom)
    },
    update: function (props: QiankunProps): void | Promise<void> {
      console.log('update')
    }
  })
}

qiankunWindow.__POWERED_BY_QIANKUN__ ? initQiankun() : render({})

// console.log(__APP_ENV__.NODE_ENV, '------ENV')
