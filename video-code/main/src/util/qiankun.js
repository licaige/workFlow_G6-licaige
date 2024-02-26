import {registerMicroApps, start, initGlobalState} from "qiankun";
import {loading} from "../store";

const state = {
  a: 1,
  b: 2
}

initGlobalState(state)

export const registerApp = (list) => {
  // 注册到微前端框架里
  registerMicroApps(list, {
    beforeLoad: [
      () => {
        loading.changeLoading(true)
        console.log('开始加载')
      }
    ],
    afterMount: [
      () => {
        loading.changeLoading(false)
        console.log('渲染完成')
      }
    ],
    afterUnmount: [
      () => {
        console.log('卸载完成')
      }
    ]
  })

  // 开启微前端框架
  start()
}
