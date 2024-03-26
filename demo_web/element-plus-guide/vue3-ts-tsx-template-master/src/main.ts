import { createApp } from 'vue'
import App from './App'
import router from './router'
import { store } from './store'
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
import '@/permission'

createApp(App).use(ElementPlus).use(store).use(router).mount('#app')
