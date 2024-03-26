import { createApp } from 'vue'
import './index.scss'
import App from './App.vue'
import Button from './button'

import Vue3JsxUI from '../build/vue3-jsx-ui.es.js'

createApp(App).use(Vue3JsxUI).mount('#app')