// 与基座的数据交互
function handleMicroData() {
	// 是否是微前端环境, eventCenterForAppViteReact(新版获取不到) 是基座添加到window的数据通信对象
	if (window.__MICRO_APP_ENVIRONMENT__) {
		// 主动获取基座下发的数据
		console.log('child-react getData:', window.microApp.getData());

		// 监听基座下发的数据变化
		window.microApp.addDataListener((data: Record<string, unknown>) => {
			console.log('child-react addDataListener:', data);

			// if (data.path && typeof data.path === 'string') {
			// 	data.path = data.path.replace(/^#/, '');
			// 	当基座下发path时进行跳转
			// 	if (data.path && data.path !== router.currentRoute.value.path) {
			// 		router.push(data.path as string);
			// 	}
			// }
		});

		// 向基座发送数据
		setTimeout(() => {
			window.microApp.dispatch({ myname: 'child-react' });
		}, 3000);
	}
}

export { handleMicroData };
