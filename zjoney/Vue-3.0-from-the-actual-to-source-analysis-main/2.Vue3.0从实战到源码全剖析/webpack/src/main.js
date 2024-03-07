import {
	createApp
} from 'vue';
import App from './App.vue';
import router from './router';

/* 导入公共的样式*/
import './assets/news_qa.auto.css';
import './assets/reset.min.css';
import './assets/common.less';

const app = createApp(App);
app.use(router);
app.mount('#app');