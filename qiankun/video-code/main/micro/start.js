import { setList, getList } from './const/subApps'
import { currentApp } from './utils'
import { rewriteRouter } from './router/rewriteRouter'
import { setMainLifecycle } from './const/mainLifeCycle'
import { prefetch } from './loader/prefetch'
import { Custom } from './customevent'
const custom = new Custom()
custom.on('test', (data) => {
  console.log(data)
})
window.custom = custom
// 实现路由拦截
rewriteRouter()
export const registerMicroApps = (appList, lifeCycle) => {
  // 把微应用的列表清单数据，放到微前端框架中
  setList(appList)
  // 微前端框架提供的是生命周期钩子函数
  setMainLifecycle(lifeCycle)
}
// 启动微前端框架
export const start = () => {
  // 首先验证当前子应用列表是否为空
  // 拿到对应的微应用的列表清单数据
  const apps = getList()
  if (!apps.length) {
    // 子应用列表为空
    throw Error('子应用列表为空， 请正确注册')
  }
  // 有子应用的内容， 查找到符合当前路由的子应用
  // 主要是拿到当前激活状态下的子应用
  const curApp = currentApp()
  const { pathname, hash } = window.location
  if (!hash) {
    // 当前没有在使用的子应用
    // 1. 抛出一个错误，请访问正确的连接
    // 2. 访问一个默认的路由，通常为首页或登录页面
    window.history.pushState(null, null, '/vue3#/index')
  }
  // 意思就是有对应子应用信息了
  if (curApp && hash) {
    const url = pathname + hash
    // 备用数据，为后面的数据清理做储备
    window.__CURRENT_SUB_APP__ = curApp.activeRule
    // 更新url，进行路由跳转
    window.history.pushState('', '', url)
  }
  // 预加载 - 加载接下来的所有子应用，但是不显示
  prefetch()
}
