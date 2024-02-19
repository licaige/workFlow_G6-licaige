import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import piniaStore from './store';
import '/@/styles/index.less';
import '/@/styles/reset.less';
import 'uno.css';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
// 支持SVG
import 'virtual:svg-icons-register';

const app = createApp(App);
app.use(Antd);
app.use(router);
app.use(piniaStore);
app.mount('#app');
