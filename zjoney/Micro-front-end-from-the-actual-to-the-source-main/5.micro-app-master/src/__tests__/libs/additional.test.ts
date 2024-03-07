import { listenUmountOfNestedApp, releaseUnmountOfNestedApp } from '../../libs/additional'
import CreateApp, { appInstanceMap } from '../../create_app'

describe('test additional', () => {
  // 卸载循环内嵌的子应用
  test('unmount app loop build-in', () => {
    // test-app1模拟开启shadowRoot的未卸载孙应用
    const con1 = document.createElement('micro-app')
    // @ts-ignore
    con1.disconnectedCallback = jest.fn
    con1.attachShadow({ mode: 'open' })
    const app1 = {
      name: 'test-app1',
      url: 'http://localhost:3000/',
      scopecss: true,
      useSandbox: true,
      container: con1.shadowRoot,
    }
    appInstanceMap.set('test-app1', app1 as CreateApp)

    // test-app2模拟正常未卸载孙应用
    const con2 = document.createElement('micro-app')
    // @ts-ignore
    con2.disconnectedCallback = jest.fn
    const app2 = {
      name: 'test-app2',
      url: 'http://localhost:3000/',
      scopecss: true,
      useSandbox: true,
      container: con2,
    }
    appInstanceMap.set('test-app2', app2 as CreateApp)

    // test-app3模拟已卸载孙应用(没有container)
    const app3 = {
      name: 'test-app3',
      url: 'http://localhost:3000/',
      scopecss: true,
      useSandbox: true,
    }
    appInstanceMap.set('test-app3', app3 as CreateApp)

    expect(appInstanceMap.size).toBe(3)

    // 模拟非嵌套循环
    releaseUnmountOfNestedApp()
    listenUmountOfNestedApp()

    // 模拟嵌套循环
    window.__MICRO_APP_ENVIRONMENT__ = true
    releaseUnmountOfNestedApp()
    listenUmountOfNestedApp()

    // 模拟当前应用被卸载
    const event = new CustomEvent('unmount')
    window.dispatchEvent(event)

    expect(appInstanceMap.size).toBe(0)

    window.__MICRO_APP_ENVIRONMENT__ = false
  })

  // 分支覆盖
  test('coverage of branch', () => {
    // test-app4模已卸载孙应用
    const app1 = {
      name: 'test-app4',
      url: 'http://localhost:3000/',
      scopecss: true,
      useSandbox: true,
    }
    appInstanceMap.set('test-app4', app1 as CreateApp)

    // 模拟嵌套循环
    window.__MICRO_APP_ENVIRONMENT__ = true
    window.__MICRO_APP_UMD_MODE__ = true // 设置为umd模式
    releaseUnmountOfNestedApp()
    listenUmountOfNestedApp()

    // 模拟当前应用被卸载
    const event = new CustomEvent('unmount')
    window.dispatchEvent(event)

    // umd模式不清空appInstanceMap
    expect(appInstanceMap.size).toBe(1)
  })
})
