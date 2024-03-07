import Vue from 'vue'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import microApp from '@micro-zoe/micro-app'
import routes from './router'
import App from './App.vue'
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
  lifeCycles: {
    created () {
      console.log('created 全局监听')
    },
    beforemount () {
      console.log('beforemount 全局监听')
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
    modules: {
      react16: [{
        loader(code, url) {
          if (code.indexOf('sockjs-node') > -1) {
            console.log('react16插件', url)
            code = code.replace('window.location.port', '3001')
          }
          return code
        }
      }],
      react162: [{
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
    if (url === 'http://localhost:3001/micro-app/react16/') {
      config = {
        headers: {
          'custom-head': 'custom-head',
        }
      }
    }

    return fetch(url, Object.assign(options, config)).then((res) => {
      return res.text()
    })
  }
})

Vue.config.productionTip = false
Vue.use(ElementUI)

const router = new VueRouter({
  // options: {
  //   base: '/micro-app/demo/',
  // },
  mode: 'history',
  routes,
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
