import Vue from 'vue'
import App from './App.vue'
import router from './router';
import store from './store';

Vue.config.productionTip = false

let instance = null;
console.log(instance);
export async function bootstrap() {
  console.log('vue app bootstraped');
}
if (!window.__MICRO_WEB__) {
  instance = new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app-vue')
}

export async function mount() {
  instance = new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app-vue')
}
export async function unmount(ctx) {
  instance = null;
  const { container } = ctx
  if (container) {
    document.querySelector(container).innerHTML = ''
  }
}
