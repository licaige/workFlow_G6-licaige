import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue'
import Page1 from './pages/page1.vue'
import Page2 from './pages/page2.vue'

const routes = [
  { path: '/', component: Page1 },
  { path: '/page2', component: Page2 },
]

// const router = VueRouter.createRouter({
//   history: VueRouter.createWebHashHistory('/micro-app/vite/'),
//   routes,
// })

// const app = createApp(App)
// app.use(router)
// app.mount('#vite-app')

let app = null
let router = null
let history = null
// 将渲染操作放入 mount 函数
function mount () {
  history = createWebHashHistory()
  router = createRouter({
    history,
    routes,
  })

  app = createApp(App)
  app.use(router)
  app.mount('#vite-app')

  console.log('微应用child-vite渲染了')

  // eventCenterForVite 是基座添加到window的数据通信对象
  // 主动获取基座下发的数据
  // safari12 not support ?.
  console.log('child-vite getData:', window.eventCenterForVite && window.eventCenterForVite.getData())

  // 监听基座下发的数据变化
  window.eventCenterForVite && window.eventCenterForVite.addDataListener((data) => {
    console.log('child-vite addDataListener:', data)
  })

  // 向基座发送数据
  setTimeout(() => {
    window.eventCenterForVite && window.eventCenterForVite.dispatch({ myname: 'child-vite' })
  }, 3000)
}

// 将卸载操作放入 unmount 函数
function unmount () {
  app && app.unmount()
  history && history.destroy()
  // 卸载所有数据监听函数
  window.eventCenterForVite && window.eventCenterForVite.clearDataListener()
  app = null
  router = null
  history = null
  console.log('微应用child-vite卸载了')
}

// 微前端环境下，注册mount和unmount方法
if (window.__MICRO_APP_BASE_APPLICATION__) {
  window['micro-app-vite'] = { mount, unmount }
} else {
  // 非微前端环境直接渲染
  mount()
}
