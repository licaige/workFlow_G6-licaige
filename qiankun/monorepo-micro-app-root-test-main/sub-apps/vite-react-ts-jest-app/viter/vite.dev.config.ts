// @ts-ignore
import { defineConfig } from 'vite';
// 本地 Dev Server 上开启 HTTP2
// import mkcert from 'vite-plugin-mkcert';
// import basicSsl from '@vitejs/plugin-basic-ssl';

/** @type {import('vite').UserConfig} */

export default env => {
	// const viteEnv = loadEnv(mode, process.cwd(), '');
	// console.log('config.dev:', env.APP_API_BASE_URL);

	return defineConfig({
		// plugins: [
		// 	mkcert(),
		// 	http2 开启
		// 	basicSsl(),
		// 	{
		// 		/** 命名证书 */
		// 		name: 'test',
		// 		/** 自定义真实域名 domains */
		// 		domains: ['*.custom.com'],
		// 		/** 自定义证书存放目录 */
		// 		certDir: '/Users/.../.devServer/cert',
		// 	}
		// ],
		server: {
			// base: './',
			fs: {
				strict: true,
			},
			// host: '0.0.0.0',
			host: true, // 监听所有地址，包括局域网和公网地址 "localhost",
			port: env.VITE_PORT, // 开发服务器端口
			// https: true, // 是否启用 https, 该配置已经废弃
			cors: true, // 为开发服务器配置 CORS , 默认启用并允许任何源
			open: true, //服务启动时自动在浏览器中打开应用
			strictPort: false, //设为true时端口被占用则直接退出，不会尝试下一个可用端口
			// force: true, //是否强制依赖预构建
			//HMR连接配置{}, false-禁用
			hmr: {
				host: 'localhost',
				// overlay: true, // 设为true会导致热更新速度慢
				port: env.VITE_PORT,
			},
			// 传递给 chockidar 的文件系统监视器选项
			watch: {
				// ignored:["!**/node_modules/your-package-name/**"],
				usePolling: true, // 修复HMR热更新失效
			},
			// 被监听的包必须被排除在优化之外，
			// 以便它能出现在依赖关系图中并触发热更新。
			// optimizeDeps: {
			//   exclude: ['your-package-name'],
			// },
			// 反向代理配置
			proxy: (() => {
				const proxyPath = [
					'/api',
					'/mock',
					'/auth',
					// '/socket.io'
				];
				let proxyConfig = {};
				for (let item of proxyPath) {
					let regExp = new RegExp(`^\${item}`); // ,'g'
					proxyConfig[item] = {
						target: env.APP_API_BASE_URL,
						// logLevel: 'debug', // 查看代理请求的真实地址
						changeOrigin: true,
						rewrite: path => path.replace(regExp, '/'),
						cookieDomainRewrite: '',
						secure: false,
					};
				}
				// console.log('proxyConfig:', proxyConfig);
				return proxyConfig;
			})(),

			// proxy: {
			// Using the proxy instance
			// '/api': {
			//   target: 'http://jsonplaceholder.typicode.com',
			//   changeOrigin: true,
			//   configure: (proxy, options) => {
			//     // proxy will be an instance of 'http-proxy'
			//   }
			// },
			// // Proxying websockets or socket.io
			// '/socket.io': {
			//   target: 'ws://localhost:3000',
			//   ws: true
			// }
			// },
		},
	});
};
