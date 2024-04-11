import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElIcons from "@element-plus/icons"
import './assets/font-icons/iconfont.css'
import 'x6-vue3-components/lib/x6-vue3-components.min.css';
import X6Vue3Components from 'x6-vue3-components';
// import X6Vue3Components from './components/X6UI';

const app = createApp(App)
app.use(ElementPlus, { size: 'small', zIndex: 3000 })
for (const name in ElIcons){
    app.component(name, ElIcons[name])
}
app.use(X6Vue3Components)
app.use(store)
app.mount('#app')
