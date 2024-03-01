import React, { Suspense, useState, type CSSProperties } from 'react';
import { ConfigProvider, Layout, theme, type ThemeConfig } from 'antd';
import { Outlet, Link } from 'react-router-dom';

// 由于 antd 组件的默认文案是英文，所以需要修改为中文
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import zhCN from 'antd/locale/zh_CN';

// 布局组件
import Header from './Header';
import Footer from './Footer';

dayjs.locale('zh-cn');

const { Content, Sider } = Layout;
const { useToken } = theme;

const themeConfig: ThemeConfig = {
	token: {
		colorPrimary: '#00b96b', // #0099ff; #52c41a
		borderRadius: 2,
	},
	components: {
		Layout: {
			headerHeight: 50,
			headerPadding: '0 10px',
			// colorBgHeader: '#FF0000',
		},
		// Menu: {
		// 	colorItemBg: '#00FF00',
		// },
	},
};

// const {
// 	token: { colorBgContainer, borderRadiusLG },
// } = useToken();

const headerStyle: CSSProperties = {
	background: '#0099ff',
	// height: 64,
	// lineHeight: '64px',
	padding: '0 16px',
	paddingInline: 48,
	color: '#fff',
};

const contentStyle: CSSProperties = {
	// background: colorBgContainer,
	// borderRadius: borderRadiusLG,
	height: 'calc(100vh - 50px)',
	overflow: 'auto',
	// padding: '0',
};

export default function MainLayout(props: any, context?: any): React.ReactElement<any, any> {
	// const { match } = props;
	const [collapsed, setCollapsed] = useState(false);
	const toggleMenu = (bool: boolean) => {
		setCollapsed(bool);
	};
	console.log('lay-router:', props);

	return (
		<ConfigProvider
			locale={zhCN}
			theme={themeConfig}
		>
			<Layout>
				<Header
					style={headerStyle}
					propCollapsed={collapsed}
					onToggleMenu={toggleMenu}
				/>
				<Content style={contentStyle}>
					<Outlet />
				</Content>
				<Footer />
			</Layout>
		</ConfigProvider>
	);
}
