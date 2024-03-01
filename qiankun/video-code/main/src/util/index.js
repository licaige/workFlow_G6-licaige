import { registerMicroApps, start, createStore } from '../../micro'

import { loading } from '../store'

const store = createStore()

window.store = store
store.subscribe((newValue, oldValue) => {
  console.log(newValue, oldValue, '---')
})

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
