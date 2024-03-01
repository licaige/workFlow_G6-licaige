import Vue from 'vue'
import App from './App.vue'
import router from './router'
Vue.config.productionTip = false

const render = () => {
  new Vue({
    router,
    render: h => h(App)
  }).$mount('#app-vue')
}

if (!window.__MICRO_WEB__) {
  render()
}

export async function bootstrap() {
  console.log('bootstrap');
}

export async function mount() {
  render()
}

export async function unmount(ctx) {
  const { container } = ctx
  if (container) {
    document.querySelector(container).innerHTML = ''
  }
}
