import { defineStore, acceptHMRUpdate } from 'pinia';

interface cacheState {
	cachedRoutes: any[];
}

const keepAliveRoutes = [];
const generateCache = (routes: any[]) => {
	routes.forEach(route => {
		if (route.meta.keepAlive) {
			route.component().then(val => keepAliveRoutes.push(val.default.name));
		}
		if (route.children && route.children.length) {
			generateCache(route.children);
		}
	});
};

export const useRouteCacheStore = defineStore('routeCacheStore', {
	// 转换为函数
	state: (): cacheState => ({
		cachedRoutes: [],
	}),
	getters: {
		getCachedRoutes: state => state.cachedRoutes,
	},
	actions: {
		setCachedRouter(caches) {
			generateCache(caches);
			this.cachedRoutes = keepAliveRoutes;
		},
	},
});

if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(useRouteCacheStore, import.meta.hot));
}
