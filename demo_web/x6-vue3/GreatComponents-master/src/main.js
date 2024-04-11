import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import plugin from '@/scripts/plugin'
Vue.use(plugin);

import 'element-ui/lib/theme-chalk/index.css';
import bindDirective from './directive'
bindDirective(Vue)

import VideoPlayer from 'vue-video-player'
require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')
Vue.use(VideoPlayer);

import '@/assets/greatComponentsStyle.less'
import { AllTemplate } from '@/components'
Vue.use(AllTemplate)

// 单例登录框
import registryDialog from '@/components/LoginDialog'
Vue.use(registryDialog)

// 监听localStorage事件
let originSetItem = localStorage.setItem
localStorage.setItem = function (key, val) {
  let setItemEvent = new Event('setItemEvent')
  setItemEvent.val = val
  window.dispatchEvent(setItemEvent)
  originSetItem.apply(this, [key, val])
}
window.addEventListener('setItemEvent', (e) => {
  console.log(e)
})
localStorage.setItem('test', 'test')


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
