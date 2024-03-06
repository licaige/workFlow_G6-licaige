import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// 拿到子应用列表清单
import { subNavList } from './store/sub'
import { registerApp } from './util'
// 导入微前端框架到主应用中
registerApp(subNavList)

createApp(App).use(router()).mount('#micro_web_main_app')
