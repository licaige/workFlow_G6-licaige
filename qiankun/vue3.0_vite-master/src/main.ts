import { registerMicroApps, start } from "qiankun";
import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VueGridLayout from 'vue-grid-layout'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'
import App from './App.vue'
import Test from './Test.vue'
import router from './router'

const env = import.meta.env.VITE_NODE_ENV
if(env=='test'){
  var app = createApp(Test)
}else{
  var app = createApp(App)
}

//这个插件不能像vue2那样，在组件中引入。会警告：
app.use(VueGridLayout)
app.use(Antd);
app.use(createPinia())
app.use(router)
app.mount('#app')

registerMicroApps([
  {
    name: "vueApp", //子应用名称
    entry: "//localhost:8091", //子应用启动的地址
    container: "#container", // 子应用在主应用的容器名称
    activeRule: "/app-vue", // 路由地址
    props: {
      data: "child子应用",
    }, //传参
  },
]);
// 启动
start();


