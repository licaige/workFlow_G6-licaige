import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';

import '@/assets/styles/main/base.scss';
import '@/assets/styles/components/general.scss';
import '@/assets/styles/components/app.scss';

import microApp from '@micro-zoe/micro-app';

microApp.start({
	iframe: true, // 全局开启iframe沙箱，默认为false
	// inline: true, // 全局开启内联script模式运行js，默认为false
	// destroy: true, // 全局开启destroy模式，卸载时强制删除缓存资源，默认为false
	// ssr: true, // 全局开启ssr模式，默认为false
	// 'disable-scopecss': true, // 全局禁用样式隔离，默认为false
	// 'disable-sandbox': true, // 全局禁用沙箱，默认为false
	'keep-alive': true, // 全局开启保活模式，默认为false
	// 'disable-memory-router': true, // 全局关闭虚拟路由系统，默认值false
	// 'keep-router-state': true, // 子应用在卸载时保留路由状态，默认值false
	// 'disable-patch-request': true, // 关闭子应用请求的自动补全功能，默认值false
	// iframeSrc: location.origin, // 设置iframe沙箱中iframe的src地址，默认为子应用所在页面地址
});

createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
);
