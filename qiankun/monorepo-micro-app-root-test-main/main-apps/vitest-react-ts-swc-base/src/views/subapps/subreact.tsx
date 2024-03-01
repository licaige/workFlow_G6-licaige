/** @jsxRuntime classic */
/** @jsx jsxCustomEvent */
import jsxCustomEvent from '@micro-zoe/micro-app/polyfill/jsx-custom-event';
import { EventCenterForMicroApp } from '@micro-zoe/micro-app';
import React, { Suspense, useState } from 'react';
import config from '@/config';

// @ts-ignore 因为vite子应用关闭了沙箱，我们需要为子应用app-subreact创建EventCenterForMicroApp对象来实现数据通信
window.eventCenterForAppViteReact = new EventCenterForMicroApp('app-subreact');

const SubReact: React.FC<any> = (): JSX.Element => {
	const [microAppData, changeMicroAppData] = useState({ msg: '来自基座的数据' });

	function handleCreate() {
		console.log('micro-app subreact 被创建了');
	}

	function handleBeforeMount() {
		console.log('micro-app subreact即将被渲染');
	}

	function handleMount() {
		console.log('micro-app subreact 已经渲染完成');

		setTimeout(() => {
			changeMicroAppData({ msg: '来自基座的新数据' });
		}, 2000);
	}

	function handleUnmount() {
		console.log('micro-app subreact 卸载了');
	}

	function handleError() {
		console.log('micro-app subreact 加载渲染出错了');
	}

	function handleDataChange(e: CustomEvent) {
		console.log('来自子应用 micro-app subreact 的数据:', e.detail.data);
	}

	// inline;
	// disablesandbox;
	return (
		<Suspense>
			<micro-app
				name="app-subreact"
				url={`${config.subreact}/sub-vite-react/`}
				baseroute="/sub-vite-react/"
				data={microAppData}
				onCreated={handleCreate}
				onBeforemount={handleBeforeMount}
				onMounted={handleMount}
				onUnmount={handleUnmount}
				onError={handleError}
				onDataChange={handleDataChange}
			/>
		</Suspense>
	);
};

export default SubReact;
