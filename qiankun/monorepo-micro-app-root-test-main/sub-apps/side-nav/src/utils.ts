// 与基座进行数据交互
export function handleMicroData(router?: Router) {
	// eventCenterForAppNameVite 是基座添加到window的数据通信对象
	if (window.eventCenterForAppNameVite) {
		// 主动获取基座下发的数据
		console.log('side-nav getData:', window.eventCenterForAppNameVite.getData());

		// 监听基座下发的数据变化
		window.eventCenterForAppNameVite.addDataListener((data: Record<string, unknown>) => {
			console.log('side-nav addDataListener:', data);

			// if (data.path && typeof data.path === 'string') {
			// 	data.path = data.path.replace(/^#/, '');
			// 	// 当基座下发path时进行跳转
			// 	if (data.path && data.path !== router.currentRoute.value.path) {
			// 		router.push(data.path as string);
			// 	}
			// }
		});

		// 向基座发送数据
		setTimeout(() => {
			window.eventCenterForAppNameVite.dispatch({ myname: 'side-nav-vue3' });
		}, 3000);
	}
}
