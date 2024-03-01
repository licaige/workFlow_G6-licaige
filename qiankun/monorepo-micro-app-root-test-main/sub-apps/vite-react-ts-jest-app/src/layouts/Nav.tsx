import React, { useState, useEffect } from 'react';
import { Link, matchRoutes, useParams } from 'react-router-dom';
import HistoryRule from '@/router/history';
import { routes } from '@/router/index';

import _ from 'lodash';
import { Menu } from 'antd';

import {
	AppstoreOutlined,
	LineChartOutlined,
	FormOutlined,
	TableOutlined,
	PictureOutlined,
	DragOutlined,
	InteractionOutlined,
	// BarChartOutlined,
	// ShopOutlined,
	// TeamOutlined,
	// UserOutlined,
	// UploadOutlined,
	// VideoCameraOutlined,
} from '@ant-design/icons';
import Logo from '@/assets/images/logo.svg';

import type { MenuProps } from 'antd';
type MenuItem = Required<MenuProps>['items'][number];

function getItem(
	label: React.ReactNode,
	key: React.Key,
	icon?: React.ReactNode,
	children?: MenuItem[],
	type?: 'group',
): MenuItem {
	// link: string,
	return {
		key,
		icon,
		children,
		label,
		type,
	} as MenuItem;
}

function mapPathFn(menus: Array<any>, paths: Array<any> = []) {
	for (let menu of menus) {
		if (menu.children && menu.children.length) {
			mapPathFn(menu.children, paths);
		} else {
			paths.push(menu.key);
		}
	}
	return paths;
}

const MenusList: MenuItem[] = [
	getItem('首页概览', '/views/home', <AppstoreOutlined />),
	getItem('Echart图表', '/views/charts', <LineChartOutlined />, [
		getItem('通用图表', '/views/charts/index'),
		getItem('D3图表', '/views/charts/d3charts'),
	]),
	getItem('表单展示', '/views/forms', <FormOutlined />),
	getItem('表格展示', '/views/tables', <TableOutlined />),
	getItem('拖拽组件', '/views/dndpage', <DragOutlined />),
	getItem('设计模式', '/views/designmodes', <InteractionOutlined />, [
		getItem('单例模式', '/views/designmodes/index'),
		getItem('策略模式', '/views/designmodes/strategy'),
		getItem('代理模式', '/views/designmodes/proxymode'),
		getItem('发布订阅模式', '/views/designmodes/pubsubscribe'),
		getItem('适配器模式', '/views/designmodes/adaptermode'),
		// getItem('Submenu', 'sub3', null, [getItem('Option 11', '11'), getItem('Option 12', '12')]),
	]),
	getItem('图片展示', '/views/pictures', <PictureOutlined />),
];

// // 创建类型接口
// export interface MenuProps {
//   menuLinks: Array<any>, // Array<{ type: any; title: string, path: string, children: any[] }>,
//   menuPath: Array<any>,
//   // onIncrement: () => void,
// }

// 使用接口代替 PropTypes 进行类型校验
const NavMenu: React.FC<any> = (props: any, context?: any) => {
	console.log('NavMenu-props:', props);
	const { HistoryNav, Location, HrefTo } = HistoryRule();
	// const location = useLocation();
	const [selKeys, setSelKeys] = useState<string[]>([]);
	// const [defaultOpenKeys, setDefaultOpenKeys] = useState<string[]>([]);
	const [isInit, setIsInit] = useState<Boolean>(false);

	// const menuLinks: any[] = mapPathFn(MenusList);

	const linkToNav = link => {
		console.log('linkTo:', link);
		// history.replace(link.key);
		// HistoryNav(link.key, { replace: true });
		// LinkTo(link.key);
		HrefTo(link.key);
	};

	useEffect(() => {
		const routeArrs = matchRoutes(routes, Location.pathname); // 返回匹配到的路由数组对象，每一个对象都是一个路由对象
		const pathArr: string[] = [];
		if (routeArrs && routeArrs.length) {
			for (let item of routeArrs) {
				const path = item.route.path;
				if (path) {
					pathArr.push(path);
				}
			}
		}
		setSelKeys(pathArr);
		// setDefaultOpenKeys(pathArr);
		setIsInit(true);
	}, [Location.pathname]);

	if (!isInit) {
		return null;
	}

	return (
		<>
			<div className="head-logo">
				<img src={Logo} alt="logo" />
				<div className="title">React App PC</div>
			</div>
			{/* defaultOpenKeys={['sub1']} */}
			{/* inlineCollapsed={collapsed} */}
			<Menu
				mode="inline"
				theme="dark"
				defaultSelectedKeys={['/views/home']}
				selectedKeys={selKeys}
				items={MenusList}
				onClick={linkToNav}
			/>
			{/*  defaultOpenKeys={defaultOpenKeys}
      </Menu> */}
		</>
	);
};

export default NavMenu;
