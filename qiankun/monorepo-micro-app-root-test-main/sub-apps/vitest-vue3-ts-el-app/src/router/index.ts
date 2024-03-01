import {
	createRouter,
	createWebHistory,
	createWebHashHistory,
	type RouteRecordRaw,
} from 'vue-router';
import MainLayout from '@/layouts/LayoutTemp.vue';
import HomeView from '@/views/home/index.vue';
import About from '@/views/about/index.vue';
// import routes from 'virtual:generated-pages'
const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		component: MainLayout,
		redirect: '/home',
		meta: { guest: true },
		children: [
			{
				path: '/home',
				name: 'home',
				component: HomeView,
				// meta: {
				// 	auth: true,  // 添加该字段，表示进入这个路由是需要登录的
				// },
				// props: true,
			},
			// {
			// 	path: '/about',
			// 	name: 'about',
			// 	component: About,
			// },
			{
				path: '/403',
				name: '403',
				hidden: true,
				component: () => import('@/views/error/403.vue'),
				meta: { title: '403', index: 2, icon: '' },
			},
			{
				path: '/404',
				name: '404',
				hidden: true,
				component: () => import('@/views/error/404.vue'),
				meta: { title: '404', index: 3, icon: '' },
			},
		],
	},
	{
		path: '/:path(.*)+',
		// path: '/:pathMatch(.*)*',
		redirect: '/404',
	},
];

export default function generateRouter() {
	console.log('router-BASE_URL:', import.meta.env);
	const ghistory = createWebHashHistory(import.meta.env.BASE_URL);
	return {
		ghistory,
		grouter: createRouter({
			history: ghistory,
			routes,
		}),
	};
}
