async function asyncPoolFn(requestlis: any[], limits: number, callback: any) {
	// 存储所有的promise异步任务队列
	const promises = [];

	// 当前的并发池,用Set结构方便删除
	const pool = new Set(); // set也是Iterable<any>[]类型，因此可以放入到race里

	// 开始并发执行所有的任务
	for (let request of requestlis) {
		// 创建异步任务
		const promise = (async () => await request)().then(res => [promise, res]);
		// .then(result => [promise, result]);

		/*
        当正在执行的并发任务到达限制数量的时候, 利用 await 等待执行
        Promise.race 的作用: 假如 poolLimit 是 2, pool 的任务有任意一个被解决, 
        Promise.race 就是 fulfilled 状态, 之后再进入 for 循环
    */
		if (pool.size >= limits) {
			// 这里因为没有try catch ，所以要捕获一下错误，不然影响下面微任务的执行
			await Promise.race(pool)
				.then(([promise, res]: any) => {
					// 请求结束后, 从pool里面, 移除率先执行成功的请求
					pool.delete(promise);
					return res;
				})
				.catch((err: any) => {
					// throw err;
					return err;
				});
		}

		// 添加新的异步任务到并发池
		pool.add(promise);
		promises.push(promise);
	}

	// 等最后一个for await 结束，这里是属于最后一个 await 后面的 微任务
	// 注意这里其实是在微任务当中了，当前的promises里面是能确保所有的promise都在其中(前提是await那里命中了if)
	Promise.allSettled(promises).then(callback, callback);
}
