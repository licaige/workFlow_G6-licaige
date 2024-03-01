import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { setMain } from './utils/global'

let instance = null;

function render() {
  instance = createApp(App);
  instance
    .use(router)
    .mount('#app');
}

if (!window.__MICRO_WEB__) {
  render();
}
export async function bootstrap() {
  console.log('vue3.0 app bootstrap');
}

export async function mount(app) {
  setMain(app)
  render();
}

export async function unmount(ctx) {
  instance.unmount();
  instance = null;
  const { container } = ctx
  if (container) {
    document.querySelector(container).innerHTML = ''
  }
}
