import React from 'react';
import { Layout, Menu, theme, type MenuProps } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import TopNav from './TopNav';
import viteLogo from '/vite.svg';
// import Logo from '@/assets/images/svg/logo.svg';

const { Header } = Layout;
const AppTitle = import.meta.env.VITE_APP_TITLE;

export default function HeadTop(props: any, context?: any): React.ReactElement<any, any> {
	const { propCollapsed, onToggleMenu } = props;

	return (
		<Header style={{ display: 'flex', alignItems: 'center' }}>
			<div className="head-logo">
				<img src={viteLogo} alt="logo" />
				<div className="title">{AppTitle}</div>
			</div>
			{React.createElement(propCollapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
				className: 'trigger',
				onClick: () => onToggleMenu(!propCollapsed),
			})}
			<TopNav />
		</Header>
	);
}
