import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { subNavList } from './store/sub'
import { registerApp } from './util'

registerApp(subNavList)

createApp(App).use(router()).mount('#micro_web_main_app')
