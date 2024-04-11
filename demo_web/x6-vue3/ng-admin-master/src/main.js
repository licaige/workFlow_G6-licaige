import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n
import { Button, Layout } from 'ant-design-vue'
import { loadStyle } from './utils/util'
import { iconfontUrl, iconfontVersion } from '@/config/env'
import store from './store'
import i18n from './lang'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/css/iconfont/1.0.0/index.css'
import 'normalize.css/normalize.css'
import '@/styles/index.scss'
import './mock'
import '@/assets/library/font-awesome-4.7.0/css/font-awesome.min.css'
import '@/icons'
import '@/permission'
import * as filters from './filters'

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.use(ElementUI, { locale })

iconfontVersion.forEach(ele => {
  loadStyle(iconfontUrl.replace('$key', ele))
})
Vue.use(ElementUI, {
  size: 'medium', // set element-ui default size
  i18n: (key, value) => i18n.t(key, value)
})

Vue.config.productionTip = false
Vue.use(Button, Layout)

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
