import { type App as AppInstance, createApp } from 'vue';
import type { Router, RouteLocationNormalized, NavigationGuardNext } from 'vue-router';
import dayjs from 'dayjs';
// import Fetch from '@/api/fetch';
// import { asyncApi, asyncModuleApi } from '@/apis';
import EventBus from './eventbus';
// import CookieStorage from '@/utils/cookiestorage';

import SvgIcon from '@/components/SvgIcon/index.vue';
import 'virtual:svg-icons-register';
// import NProgress from 'nprogress';
// import 'nprogress/nprogress.css';

const GeneralPlugin = {
	install(app: AppInstance): void {
		// 全局实例方法
		app.config.globalProperties.$EventBus = new EventBus();
		app.config.globalProperties.$dayjs = dayjs;
		// 全局的api
		// app.config.globalProperties.$ApiAuth = new ApiAuth(BaseURl.ipAuth);
		// app.config.globalProperties.$Api = new Api(BaseURl.ipCommon);

		// app.provide('i18n', options)
		// app.directive('my-directive', {
		//   mounted (el, binding, vnode, oldVnode) {
		//     // some logic ...
		//   }
		//   ...
		// })

		// 全局混入，注入组件选项
		// app.mixin(MixinsGlobal);
	},
};

// NProgress.configure({ showSpinner: false });

const whiteList = ['/login', '/404', '/403', '/500'];

/**
 * @description 加载所有 Plugins
 * @param  {ReturnType<typeof createApp>} app 整个应用的实例
 */
export function useGlobalPlugins(app: ReturnType<typeof createApp>, store: any, router: unknown) {
	// (app: any, store: any, router: any)
	// const files = import.meta.glob('./*.ts'); // 为过动态导入，构建时，会分离为独立的 chunk
	const files = import.meta.glob('./*.ts', { eager: true }); // 直接引入
	console.log('Plugins-files0:', files);

	for (const key in files) {
		// const modules = {};
		// modules[key.replace(/(\.\/module\/|\.js)/g, '')] = files[key].default;
		if (key !== './index.ts' && key !== './eventbus.ts') {
			console.log('Plugins-files:', files[key].default);
			// modules[key.replace(/(\.ts)/g, '')] = files[key].default;
			files[key].default(app);
		}
	}

	// router.beforeEach((to, from, next: NavigationGuardNext) => {
	// 	const title = to.meta && to.meta.title;
	// 	if (title) {
	// 		// document.title = title;
	// 	}

	// 	// 判断该路由是否需要登录权限
	// 	// console.log("router-auth:", store.state.auth, localStorage.getItem('access_token'))
	// 	if (to.matched.some(record => record.meta.auth) && !store.state.auth.authenticated) {
	// 		next({
	// 			name: 'Login',
	// 			query: { redirect: to.fullPath }, // 将跳转的路由path作为参数，登录成功后跳转到该路由
	// 		});
	// 	}
	// 	next();
	// });
	// 全局后置钩子，然而和守卫不同的是，这些钩子不会接受 next 函数也不会改变导航本身
	// router.afterEach((to, from) => {
	//   console.log("afterEach:", to)
	// })

	// VuexRouterSync.sync(store, router);
	console.log('useGlobalPlugins0:', app);
	app
		.use(router)
		.use(store)
		.use(GeneralPlugin)
		.component('svg-icon', SvgIcon)
		.mount('#subvue3-app');

	console.log('useGlobalPlugins1:', app);
}

// 与基座进行数据交互
export function handleMicroData(router: Router) {
	// eventCenterForAppViteVue3（新版中获取不到） 是基座添加到window的数据通信对象
	if (window.__MICRO_APP_ENVIRONMENT__) {
		// 主动获取基座下发的数据
		console.log('child-vite getData:', window.microApp.getData());

		// 监听基座下发的数据变化
		window.microApp.addDataListener((data: Record<string, unknown>) => {
			console.log('child-vite addDataListener:', data);

			if (data.path && typeof data.path === 'string') {
				data.path = data.path.replace(/^#/, '');
				// 当基座下发path时进行跳转
				if (data.path && data.path !== router.currentRoute.value.path) {
					router.push(data.path as string);
				}
			}
		});

		// 向基座发送数据
		setTimeout(() => {
			window.microApp.dispatch({ myname: 'child-vite-vue3' });
		}, 3000);
	}
}

/**
 * 用于解决主应用和子应用都是vue-router4时相互冲突，导致点击浏览器返回按钮，路由错误的问题。
 * 相关issue：https://github.com/micro-zoe/micro-app/issues/155
 * 当前vue-router版本：4.0.12
 */
export function fixBugForVueRouter4(router: Router) {
	// 判断主应用是main-vue3或main-vite-vue3，因为这这两个主应用是 vue-router4
	if (window.location.href.includes('/main-vite-vue3')) {
		/**
		 * 重要说明：
		 * 1、这里主应用下发的基础路由为：`/main-xxx/sub-vue3`，其中 `/main-xxx` 是主应用的基础路由，需要去掉，我们只取`/sub-vue3`，不同项目根据实际情况调整
		 *
		 * 2、因为vite关闭了沙箱，又是hash路由，我们这里写死realBaseRoute为：/sub-vue3#
		 */
		const realBaseRoute = '/sub-vite-vue3#';

		router.beforeEach(() => {
			if (typeof window.history.state?.current === 'string') {
				window.history.state.current = window.history.state.current.replace(
					new RegExp(realBaseRoute, 'g'),
					'',
				);
			}
		});

		router.afterEach(() => {
			if (typeof window.history.state === 'object') {
				window.history.state.current = realBaseRoute + (window.history.state.current || '');
			}
		});
	}
}
