/** @jsxRuntime classic */
/** @jsx jsxCustomEvent */
import jsxCustomEvent from '@micro-zoe/micro-app/polyfill/jsx-custom-event';
import { EventCenterForMicroApp } from '@micro-zoe/micro-app';
import React, { Suspense, useState } from 'react';
import config from '@/config';

// @ts-ignore 因为vite子应用关闭了沙箱，我们需要为子应用appname-vite创建EventCenterForMicroApp对象来实现数据通信
// window.eventCenterForAppViteVue3 = new EventCenterForMicroApp('app-subvue3');

const SubVue3 = () => {
	const [microAppData, changeMicroAppData] = useState({ msg: '来自基座的数据' });

	function handleCreate() {
		console.log('micro-app subvue3 被创建了');
	}

	function handleBeforeMount() {
		console.log('micro-app subvue3 即将被渲染');
	}

	function handleMount() {
		console.log('micro-app subvue3 已经渲染完成');

		setTimeout(() => {
			changeMicroAppData({ msg: '来自基座的新数据' });
		}, 2000);
	}

	function handleUnmount() {
		console.log('micro-app subvue3 卸载了');
	}

	function handleError() {
		console.log('micro-app subvue3 加载渲染出错了');
	}

	function handleDataChange(e: CustomEvent) {
		console.log('来自子应用 micro-app subvue3 的数据:', e.detail.data);
	}

	return (
		<Suspense>
			<micro-app
				name="app-subvue3"
				url={`${config.subvue3}/sub-vite-vue3/`}
				baseroute="/sub-vite-vue3/"
				inline
				data={microAppData}
				onCreated={handleCreate}
				onBeforemount={handleBeforeMount}
				onMounted={handleMount}
				onUnmount={handleUnmount}
				onError={handleError}
				onDataChange={handleDataChange}
			></micro-app>
		</Suspense>
	);
};

export default SubVue3;
