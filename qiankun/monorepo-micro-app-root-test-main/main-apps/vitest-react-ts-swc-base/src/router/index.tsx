import React, { lazy, ReactNode, Suspense } from 'react';
// Switch, Route, Redirect;
import { type RouteObject, Navigate, useRoutes } from 'react-router-dom';
import Loading from '@/components/Loading';
// import SideBar from '@/components/sidebar';

// 用懒加载实现优化
const RootLayout = lazy(() => import('@/layouts/LayoutMainTpl.tsx'));
// const OverView = lazy(() => import("@/views/Overview/index"));
const Home = lazy(() => import('@/views/home/index'));
const NotFound = lazy(() => import('@/views/error/404'));
const NoAccess = lazy(() => import('@/views/error/403'));
const SubReact = lazy(() => import('@/views/subapps/subreact'));
const SubVue3 = lazy(() => import('@/views/subapps/subvue3'));

// 实现懒加载的用Suspense包裹 定义函数
const lazyLoad = (children: ReactNode): ReactNode => {
	return (
		<Suspense
			fallback={
				<Loading
					isLoad={true}
					text={'加载...'}
				/>
			}
		>
			{children}
		</Suspense>
	);
};

const routes: RouteObject[] = [
	{
		path: '/', // || '/views'
		element: (
			<Navigate
				to={'/home'}
				replace
			/>
		),
	},
	// {
	// 	path: '/views',
	// 	element: <Navigate to={'/views/home'} replace />,
	// },
	{
		path: '/',
		element: <RootLayout />,
		children: [
			{
				path: '/home',
				element: lazyLoad(<Home />),
			},
			// {
			//     path: '/signin',
			//     element: <Signin/>,
			//     requiresAuth: false,
			// },
			{
				path: '/sub-react',
				element: lazyLoad(<SubReact />),
			},
			{
				path: '/sub-vue3',
				element: lazyLoad(<SubVue3 />),
			},
			{
				path: '/404',
				element: lazyLoad(<NotFound />),
			},
			{
				path: '/403',
				element: lazyLoad(<NoAccess />),
			},
		],
	},
	{
		path: '/*',
		element: (
			<Navigate
				to={'/404'}
				replace
			/>
		),
	},
];

function WrapRoutes() {
	const routerComponents = useRoutes(routes);
	return routerComponents;
}

export { routes, WrapRoutes };
