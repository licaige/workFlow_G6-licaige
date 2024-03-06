import { registerMicroApps, start, createStore } from '../../micro'

import { loading } from '../store'

const store = createStore()

window.store = store
store.subscribe((newValue, oldValue) => {
  console.log(newValue, oldValue, '---')
})
//把微应用，注册到对应的微前端框框中；通过微前端框架，去管理对应的微应用即子应用
export const registerApp = (list) => {
  // 注册到微前端框架里
  registerMicroApps(list, {
    beforeLoad: [
      () => {
        loading.changeLoading(true)
        console.log('开始加载')
      }
    ],
    mounted: [
      () => {
        loading.changeLoading(false)
        console.log('渲染完成')
      }
    ],
    destoryed: [
      () => {
        console.log('卸载完成')
      }
    ]
  })
  // 开启微前端框架
  start()
}
