/*
 * @Descripttion:
 * @version:
 * @Author: chunwen
 * @Date: 2021-11-01 17:24:48
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-03-31 10:17:09
 */
import { registerMicroApps, start } from 'qiankun'
import store from '@/store'

export const microApps = [
  {
    name: 'micro_vue',
    entry: '//localhost:4001',
    activeRule: '/micro_vue',
    container: '#subapp1', // 子应用挂载的div
    props: {
      routerBase: '/micro_vue', // 下发路由给子应用，子应用根据该值去定义qiankun环境下的路由
      mainStore: store,
    },
  },
  {
    name: 'micro_react',
    entry: '//localhost:4002',
    activeRule: '/micro_react',
    container: '#subapp2', // 子应用挂载的div
    props: {
      routerBase: '/micro_react',
      mainStore: store,
    },
  },
]

export const registerApps = () => {
  registerMicroApps(microApps, {
    beforeLoad: (app) => {
      store.commit('app/loadingMicro', true)
      console.log('before load app.name====>>>>>', app.name)
    },
    beforeMount: [
      (app) => {
        console.log('[LifeCycle] before mount %c%s', 'color: green;', app.name)
      },
    ],
    afterMount: [
      (app) => {
        store.commit('app/loadingMicro', false)
        console.log('[LifeCycle] after mount %c%s', 'color: green;', app.name)
      },
    ],
    afterUnmount: [
      (app) => {
        console.log('[LifeCycle] after unmount %c%s', 'color: green;', app.name)
      },
    ],
  })

  start({
    sandbox: {
      // 默认开启预加载
      prefetch: 'all',
      // qiankun提供的样式隔离方法（严格模式）
      strictStyleIsolation: true,
      experimentalStyleIsolation: true,
    },
  })
}
