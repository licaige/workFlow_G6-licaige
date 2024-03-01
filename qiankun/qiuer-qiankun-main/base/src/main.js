import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import startQiankun from './qiankun/index'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

// 开启乾坤架构
startQiankun() 
