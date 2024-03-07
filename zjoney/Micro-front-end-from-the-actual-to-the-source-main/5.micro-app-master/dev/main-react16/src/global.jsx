import 'babel-polyfill'
import microApp, { unmountApp, unmountAllApps } from '@micro-zoe/micro-app'
import config from './config'

// microApp.preFetch([
//   {name: 'vite', url: `${config.vite}micro-app/vite`},
//   {name: 'vue2', url: `${config.vue2}micro-app/vue2`},
//   {name: 'react16', url: `${config.react16}micro-app/react16`},
//   {name: 'react17', url: `${config.react17}micro-app/react17`},
//   {name: 'vue3', url: `${config.vue3}micro-app/vue3`},
//   {name: 'angular11', url: `${config.angular11}micro-app/angular11`},
// ])

microApp.start({
  // shadowDOM: true,
  // inline: true,
  // destroy: true,
  // disableScopecss: true,
  // disableSandbox: true,
  // macro: true,
  lifeCycles: {
    created () {
      console.log('created 全局监听')
    },
    beforemount (e) {
      console.log('beforemount 全局监听', e)
    },
    mounted () {
      console.log('mounted 全局监听')
    },
    unmount () {
      console.log('unmount 全局监听')
    },
    error () {
      console.log('error 全局监听')
    }
  },
  plugins: {
    global: [
      {
        scopeProperties: ['scopeKey1', 'scopeKey2'],
        escapeProperties: ['escapeKey1', 'escapeKey2'],
        options: {a: 1,},
        loader(code, url, options) {
          // console.log('vue2插件', url, options)
          return code
        }
      },
      {
        loader (code) {
          code = `
            window.__micro_app_environment__ = window.__MICRO_APP_ENVIRONMENT__
            window.__micro_app_name__ = window.__MICRO_APP_NAME__
            window.__full_public_path__ = window.__MICRO_APP_PUBLIC_PATH__
            window.baseurl = window.__MICRO_APP_BASE_ROUTE__
            ;${code}
          `
          return code
        }
      }
    ],
    modules: {
      react16: [{
        scopeProperties: ['scopeKey3', 'scopeKey4'],
        escapeProperties: ['escapeKey3', 'escapeKey4'],
        loader(code, url) {
          if (process.env.NODE_ENV === 'development' && code.indexOf('sockjs-node') > -1) {
            console.log('react16插件', url)
            code = code.replace('window.location.port', '3001')
          }
          return code
        }
      }],
      react17: [{
        loader(code, url) {
          if (process.env.NODE_ENV === 'development' && code.indexOf('sockjs-node') > -1) {
            console.log('react17插件', url)
            code = code.replace('window.location.port', '3002')
          }
          return code
        }
      }],
      vue2: [{
        scopeProperties: ['scopeKey5', 'scopeKey6'],
        escapeProperties: ['escapeKey5', 'escapeKey6'],
        loader(code, url) {
          // console.log('vue2插件', url)
          return code
        }
      }],
      vite: [{
        loader(code) {
          if (process.env.NODE_ENV === 'development') {
            code = code.replace(/(from|import)(\s*['"])(\/micro-app\/vite\/)/g, (all) => {
              return all.replace('/micro-app/vite/', 'http://localhost:7001/micro-app/vite/')
            })
          }
          return code
        }
      }]
    }
  },
  /**
   * 自定义fetch
   * @param url 静态资源地址
   * @param options fetch请求配置项
   * @returns Promise<string>
  */
  fetch (url, options, appName) {
    if (url === 'http://localhost:3001/error.js') {
      return Promise.resolve('')
    }

    let config = null
    if (url === 'http://localhost:3001/micro-app/react16/?a=1') {
      config = {
        // headers: {
        //   'custom-head': 'custom-head',
        // },
        // micro-app默认不带cookie，如果需要添加cookie需要设置credentials
        // credentials: 'include',
      }
    }

    return fetch(url, Object.assign(options, config)).then((res) => {
      return res.text()
    })
  },
  excludeAssetFilter (assetUrl) {
    if (assetUrl === 'http://127.0.0.1:8080/js/defer.js') {
      return true
    } else if (assetUrl === 'http://127.0.0.1:8080/facefont.css') {
      return true
    }
    return false
  }
})

// ----------------------分割线--测试全局方法--------------------- //
// setTimeout(() => {
//   unmountAllApps({
//     destroy: true,
//     clearAliveState: true,
//   }).then(() => {
//     console.log('unmountAllApps方法 -- 主动卸载所有应用成功')
//   })
// }, 10000)
