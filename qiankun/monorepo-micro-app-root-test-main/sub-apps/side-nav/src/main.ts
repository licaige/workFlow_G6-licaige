import { createApp } from 'vue';
// import { createPinia } from 'pinia';
import VApp from './App.vue';
import { handleMicroData } from './utils.ts';

import 'dayjs/locale/zh-cn';
// import 'element-plus/dist/index.css'; // 全局引入样式
import '@/assets/styles/main/base.scss';
import '@/assets/styles/components/app.scss';
// import 'uno.css';

let app: AppInstance | null = createApp(VApp);
// let router: any = null;
// let history: any = null;

// 👇 将渲染操作放入 mount 函数，子应用初始化时会自动执行

// const store = createPinia();

app.mount('#sidemenu-app');
// async function mount() {

// 	console.log('微应用side-nav渲染了', app);

// 	handleMicroData();
// }

// 👇 将卸载操作放入 unmount 函数，就是上面步骤2中的卸载函数
// function unmount() {
// 	app?.unmount();
// 	history?.destroy();
// 	// 卸载所有数据监听函数
// 	window.microApp?.clearDataListener();
// 	// window.eventCenterForAppViteSideNav?.clearDataListener();
// 	app = null;
// 	router = null;
// 	history = null;
// 	console.log('微应用child-vite卸载了');
// }

// 微前端环境下，注册mount和unmount方法
// if (window.__MICRO_APP_ENVIRONMENT__) {
// 	// @ts-ignore
// 	window[`micro-app-${window.__MICRO_APP_NAME__}`] = { mount, unmount };
// 	// window['micro-app-app-subvue3'] = { mount, unmount };
// } else {
// 	// 非微前端环境直接渲染
// 	mount();
// }

console.log('子应用side-nav的window:', window);
console.log('子应用side-nav的eventCenterForAppViteSideNav:', window.eventCenterForAppViteSideNav);

console.log(
	'子应用side-nav的window.__MICRO_APP_ENVIRONMENT__:',
	window.__MICRO_APP_ENVIRONMENT__,
	'判断应用是否在微前端环境中',
);

console.log('子应用side-nav的window.__MICRO_APP_NAME__:', window.__MICRO_APP_NAME__, '应用名称');

console.log(
	'子应用side-nav的window.__MICRO_APP_BASE_APPLICATION__:',
	window.__MICRO_APP_BASE_APPLICATION__,
	'判断应用是否是主应用',
);

console.log(
	'子应用side-nav的window.__MICRO_APP_PUBLIC_PATH__:',
	window.__MICRO_APP_PUBLIC_PATH__,
	'子应用的静态资源前缀',
);

console.log(
	'子应用side-nav的window.__MICRO_APP_BASE_ROUTE__:',
	window.__MICRO_APP_BASE_ROUTE__,
	'子应用的基础路由',
);
