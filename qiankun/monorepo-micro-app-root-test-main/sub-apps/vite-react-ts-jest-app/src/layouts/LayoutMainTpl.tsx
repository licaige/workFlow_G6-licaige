import React, { Suspense, useState } from 'react';
import { ConfigProvider, Layout } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import { Outlet, Link } from 'react-router-dom';

import HeadTop from './Header';
import Footer from './Footer';
import MenuNav from './SideNav';
import Loading from '@/components/Loading';

const { Header, Content, Sider } = Layout;

export default function MainLayout(props: any, context?: any): React.ReactElement<any, any> {
	// const { match } = props;
	const [collapsed, setCollapsed] = useState(false);
	const toggleMenu = bool => {
		setCollapsed(bool);
	};
	console.log('lay-router:', props);

	return (
		<ConfigProvider
			locale={zhCN}
			theme={{
				token: {
					colorPrimary: '#00b96b',
				},
			}}
		>
			<Layout>
				<Sider trigger={null} collapsible collapsed={collapsed}>
					<MenuNav />
				</Sider>
				<Layout className="site-layout">
					<Header style={{ background: '#0099ff', color: '#fff', padding: '0 16px' }}>
						<HeadTop propCollapsed={collapsed} onToggleMenu={toggleMenu} />
					</Header>
					<Content
						style={{
							height: 'calc(100vh - 50px)',
							overflow: 'auto',
							padding: 16,
						}}
					>
						<Outlet />
					</Content>
					<Footer />
				</Layout>
			</Layout>
		</ConfigProvider>
	);
}
