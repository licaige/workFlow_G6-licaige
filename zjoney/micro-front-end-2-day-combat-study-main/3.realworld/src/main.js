import Vue from 'vue';
import singleSpaVue from 'single-spa-vue';
import App from './App.vue';

import VueRouter from 'vue-router'
Vue.use(VueRouter)

// 路由组件
// const Foo = { template: "<div>Foooooo</div>" }
import Foo from './components/Foo'

const Bar = { template: "<div>Barrrrr</div>" }

// 路由规则
const routes = [
  { path: '/foo', component: Foo },
  { path: '/bar', component: Bar },
]

// 路由实例
const router = new VueRouter({ routes, mode: "history", base: "/realworld" })


Vue.config.productionTip = false;

const vueLifecycles = singleSpaVue({
  Vue,
  appOptions: {
    // 注册路由
    router,
    render(h) {
      return h(App, {
        props: {
          // 组件传参
        },
      });
    },
  },
});

export const bootstrap = vueLifecycles.bootstrap;
export const mount = vueLifecycles.mount;
export const unmount = vueLifecycles.unmount;
