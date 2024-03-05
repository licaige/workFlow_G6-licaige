import { handleRouterChange } from './handleRouter'
import type { AppConfig } from './interface'


let apps: AppConfig[] = []

export function registerMicroApps(appConfigs: AppConfig[]) {
    apps = appConfigs
    console.log(apps);
}

export function start() {
    // 乾坤运行原理：

    // 1.监视路由变化
    rewriteRouter_hash()
    // rewriteRouter_history()

    // 初始执行app匹配
    handleRouterChange()
}

export function getApps() {
    return apps
}



export default { registerMicroApps, start, getApps }


// 重写原生history路由方法  进行监视劫持
// 1.监视路由变化 hash:window.onhashchange  history:  
// 监听history.go  back   forward 使用popstate事件  window.onpopstate
// pushState replaceState通过函数重写进行修改劫持(同react-router)
function rewriteRouter_history() {
    window.addEventListener('popstate', () => { // 监听popState方法
        handleRouterChange()
    })


    const originPushState = window.history.pushState  // 劫持原生的pushState方法
    window.history.pushState = (...args) => {
        originPushState.apply(window.history, args)
        handleRouterChange()
    }


    const originReplaceState = window.history.replaceState  // 劫持原生replace方法
    window.history.replaceState = (...args) => {
        originReplaceState.apply(window.history, args)
        handleRouterChange()
    }
}


function rewriteRouter_hash() {
    window.addEventListener('DOMContentLoaded', handleRouterChange)
    window.addEventListener('hashchange', handleRouterChange)
}