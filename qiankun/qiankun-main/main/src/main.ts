import './assets/main.css'
import 'element-plus/dist/index.css'

import { createApp, nextTick } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

const app = createApp(App)
await nextTick()
app.use(router).use(createPinia())
app.mount('#main')
