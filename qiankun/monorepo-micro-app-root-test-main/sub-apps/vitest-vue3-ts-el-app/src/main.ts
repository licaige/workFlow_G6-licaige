import { createApp, type App as AppInstance } from 'vue';
import { createPinia } from 'pinia';
import type { RouterHistory, Router } from 'vue-router';
import generateRouter from '@/router';
import { useGlobalPlugins, handleMicroData, fixBugForVueRouter4 } from '@/plugins';
import VApp from './App.vue';

// ----------分割线---umd模式------两种模式任选其一-------------- //
let app: AppInstance | null = null;
let router: Router | null = null;
let history: RouterHistory | null = null;

// 👇 将渲染操作放入 mount 函数，子应用初始化时会自动执行
window.mount = () => {
	console.log('微应用child-vue3 开始渲染:', window.microApp);

	const { grouter, ghistory } = generateRouter();
	const pinia = createPinia();
	app = createApp(VApp);
	router = grouter;
	history = ghistory;

	// if (!!app && !!router)
	useGlobalPlugins(app, pinia, router);

	console.log('微应用child-vue3 渲染了', app);

	handleMicroData(router);
	// fixBugForVueRouter4(router);
};

// 👇 将卸载操作放入 unmount 函数，就是上面步骤2中的卸载函数
window.unmount = () => {
	app?.unmount();
	history?.destroy();
	// 卸载所有数据监听函数 window.eventCenterForAppViteVue3新版中获取不到
	// window.eventCenterForAppViteVue3?.clearDataListener();
	app = null;
	router = null;
	history = null;
	console.log('微应用child-vite卸载了');
};

// 如果不在微前端环境，则直接执行mount渲染
if (!window.__MICRO_APP_ENVIRONMENT__) {
	window.mount();
}

// window.mount();

// 微前端环境下，注册mount和unmount方法  window.__MICRO_APP_BASE_APPLICATION__是否为主应用
// if (window.__MICRO_APP_ENVIRONMENT__) {
// 	// @ts-ignore
// 	window[`micro-app-${window.__MICRO_APP_NAME__}`] = { mount, unmount };
// 	// window['micro-app-app-subvue3'] = { mount, unmount };
// 	// mount();
// } else {
// 	// 非微前端环境直接渲染
// 	mount();
// }
