import './public-path.js'
import { createApp } from 'vue'
import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router';
import App from './App.vue'
import routes from './router'



let app;
let history;
let router;
function render(props) {
    app = createApp(App)
    history = createWebHistory(window.__POWERED_BY_QIANKUN__ ? '/vue' : '/')
    router = createRouter({
        history,
        routes
    })
    app.use(router)
    const container = props.container
    app.mount(container ? container.querySelector('#app'):document.getElementById('app'))
}

if(!window.__POWERED_BY_QIANKUN__){
    render({})
}

export async function bootstrap() {
    console.log('vue bootsrap')
}
export async function mount(props) {
    render(props)
}
export async function unmount() {
    app.unmount()
    history.destroy();
    app = null;
    router = null
}