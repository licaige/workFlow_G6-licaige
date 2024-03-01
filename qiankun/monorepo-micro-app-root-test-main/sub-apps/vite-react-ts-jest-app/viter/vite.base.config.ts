// @ts-ignore
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'; // 和plugin-react-refresh冲突
// import reactJsx from 'vite-react-jsx';

// 适配 antd style 版本
import vitePluginImp from 'vite-plugin-imp';
// 使svg作为react component在vite中使用
import svgrPlugin from 'vite-plugin-svgr';
// 用来检查 Vite 插件的中间状态，访问 localhost:5173/__inspect/ 来检查你项目的模块和栈信息
import Inspect from 'vite-plugin-inspect';
// 为打包后的文件提供传统浏览器兼容性支持
import legacy from '@vitejs/plugin-legacy';
// * No declaration file for less-vars-to-js
import lessToJS from 'less-vars-to-js';
import fs from 'fs';
import { fileURLToPath, URL } from 'node:url';
import path from 'path';
import { resolve } from './utils/index';
// import ViteRestart from 'vite-plugin-restart'
// import svGod from './src/utils/svgod';

// const themeVariables = lessToJS(
// 	fs.readFileSync(path.resolve(__dirname, './assets/styles/antd-custom.less'), 'utf8'),
// );

export default env => {
	console.log('sub-react-base:', env.APP_BASE_ROUTER);

	return defineConfig({
		// root: path.resolve(__dirname, '../'),
		base: `${env.APP_BASE_ROUTER}`,
		//静态资源服务的文件夹
		publicDir: 'public',
		// 环境变量设置所在文件夹路径
		envDir: './env',
		envPrefix: ['VITE_', 'APP_'],
		// 静态资源处理
		// assetsInclude: '',
		//控制台输出的级别 info 、warn、error、silent
		logLevel: 'info',
		// 设为false 可以避免 vite 清屏而错过在终端中打印某些关键信息
		clearScreen: false,
		// 强制预构建插件包
		optimizeDeps: {
			//检测需要预构建的依赖项
			// entries: [],
			//默认情况下，不在 node_modules 中的，链接的包不会预构建
			// include: ['axios'],
			include: [
				'esm-dep > cjs-dep',
				'linked-dep',
				'react',
				'react-dom',
				// 'react-router-dom',
				'axios',
				'lodash-es',
				'dayjs',
				// 'async-validator',
			],
			// exclude: [], //排除在优化之外
		},

		plugins: [
			react(), // 避免配置 Babel 选项，这样它就会在构建期间跳过转换（只使用 esbuild）
			// reactJsx(),
			// reactRefresh(), 不要使用 @vitejs/plugin-react-refresh，  建议使用 React Fast Refresh 的原生支持
			svgrPlugin(), // 使svg作为react component在vite中使用
			legacy({
				targets: [
					'defaults',
					'not IE 11',
					// 'Android > 39',
					// 'Chrome >= 60',
					// 'Safari >= 10.1',
					// 'IOS >= 10.3',
					// 'Firefox >= 54',
					// 'Edge >= 15',
				],
			}),
			vitePluginImp({
				optimize: true,
				libList: [
					{
						libName: 'antd',
						libDirectory: 'es',
						style: name => `antd/es/${name}/style`,
						// style: (name) => {
						//   if (name === "col" || name === "row") {
						//     return "antd/lib/style/index.less";
						//   }
						//   return `antd/es/${name}/style/index.less`;
						// },
					},
				],
			}),
			// 检查你项目的模块和栈信息
			Inspect(),
		],
		json: {
			//是否支持从 .json 文件中进行按名导入
			namedExports: true,
			//若设置为 true 导入的json会被转为 export default JSON.parse("..") 会比转译成对象字面量性能更好
			stringify: true,
		},
		css: {
			// 指定传递给 css 预处理器的选项
			preprocessorOptions: {
				less: {
					// 支持内联 JavaScript
					javascriptEnabled: true, //注意，这一句是在less对象中，写在外边不起作用
					// modifyVars: {
					// 	//在这里进行主题的修改，参考官方配置属性
					// 	modifyVars: themeVariables,
					//   // '@primary-color': '#1DA57A',
					// },
				},
				sass: { charset: false },
				scss: {
					charset: false,
					/** 引入var.scss全局预定义变量 */
					additionalData:
						'@import "@/assets/styles/main/normalize.scss"; @import "@/assets/styles/main/function.scss";',
				},
			},
			// postCss 配置
			postcss: {
				plugins: [
					{
						postcssPlugin: 'internal:charset-removal',
						AtRule: {
							charset: atRule => {
								if (atRule.name === 'charset') {
									atRule.remove();
								}
							},
						},
					},
				],
			},
			// // 配置 css modules 的行为
			// modules: {
			// 	localsConvention: 'camelCase',
			// },
		},
		resolve: {
			// 导入时想要省略的扩展名列表
			extensions: [
				'.mjs',
				'.js',
				'.ts',
				'.jsx',
				'.tsx',
				'.json',
				'.css',
				'.scss',
				'.less',
				'.png',
				'.jpg',
				'.jpeg',
				'.gif',
				'.svg',
			], // '.wasm',

			// 配置别名
			alias: [
				{ find: /^~/, replacement: resolve('./') },
				{ find: '@', replacement: resolve('./src') },
				// { find: /\/#/, replacement: path.resolve(__dirname, './types') }
			],
			// 情景导出 package.json 配置中的exports字段
			// conditions: [],
		},
		// ssr: {
		//   // 列出的是要为 SSR 强制外部化的依赖
		//   external: [],
		//   //列出的是防止被 SSR 外部化依赖项
		//   noExternal: []
		// }
	});
};
