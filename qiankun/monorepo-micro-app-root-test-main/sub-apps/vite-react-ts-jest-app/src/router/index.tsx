import React, { lazy, ReactNode, Suspense } from 'react';
// Switch, Route, Redirect;
import { type RouteObject, Navigate, useRoutes } from 'react-router-dom';

// 用懒加载实现优化
const RootLayout = lazy(() => import('@/layouts/LayoutMainTpl.tsx'));
// const OverView = lazy(() => import("@/views/Overview/index"));
const Home = lazy(() => import('@/views/home/index'));
const NotFound = lazy(() => import('@/views/error/404'));
const NoAccess = lazy(() => import('@/views/error/403'));

import Loading from '@/components/Loading';
// import SideBar from '@/components/sidebar';

// 实现懒加载的用Suspense包裹 定义函数
const lazyLoad = (children: ReactNode): ReactNode => {
	return <Suspense fallback={<Loading isLoad={true} text={'加载...'} />}>{children}</Suspense>;
};

const routes: RouteObject[] = [
	{
		path: '/', // || '/views'
		element: <Navigate to={'/home'} replace />,
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
				path: 'home',
				element: lazyLoad(<Home />),
			},
			// {
			//   path: "tables",
			//   element: <Tables/>,
			//   children: [
			//     { index: true, element: <TableList /> },
			//     { path: ":id", element: <TableDetail /> }
			//   ]
			// },
			// {
			//     path: '/signin',
			//     element: <Signin/>,
			//     requiresAuth: false,
			// },
			// {
			//     path: "/users",
			//     element: <Users/>,
			// },
			{
				path: '404',
				element: lazyLoad(<NotFound />),
			},
			{
				path: '403',
				element: lazyLoad(<NoAccess />),
			},
		],
	},
	{
		path: '/*',
		element: <Navigate to={'/404'} replace />,
	},
];

function WrapRoutes() {
	const routerComponents = useRoutes(routes);
	return routerComponents;
}

export { routes, WrapRoutes };
