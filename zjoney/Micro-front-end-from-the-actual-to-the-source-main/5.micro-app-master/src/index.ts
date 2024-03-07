export {
  default,
  MicroApp,
  getActiveApps,
  getAllApps,
  unmountApp,
  unmountAllApps,
} from './micro_app'
export {
  default as preFetch,
} from './prefetch'
export {
  removeDomScope,
  pureCreateElement,
  version,
} from './libs/utils'
export {
  EventCenterForMicroApp,
} from './interact'

// 1) 对于我们的micro-app 他里面的核心是创建一个webComponent组件
// 2) 获取html， 将模板放到 webComponent中
// 3) css 做作用域隔离   js 做proxy沙箱 （function (window){with(window){}}(proxyWindow)） new Function
// 4) 执行完毕后应用可以正常挂载

// qiankun 改造的子应用 mount / unmount, 让以前的qiankun项目也能接入进来
