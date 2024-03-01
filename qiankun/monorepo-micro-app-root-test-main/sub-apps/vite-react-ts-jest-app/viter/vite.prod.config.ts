// @ts-ignore
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'; // 和plugin-react-refresh冲突
// html插入CDN加速
// import { importToCDN, autoComplete } from 'vite-plugin-cdn-import';
import { cdn as importToCDN } from 'vite-plugin-cdn2';
import { cdnjs } from 'vite-plugin-cdn2/resolver/cdnjs';
// GZIP 压缩插件
import viteCompression from 'vite-plugin-compression';
// 打包后生成bundle分析报告文件
import { visualizer } from 'rollup-plugin-visualizer';

// import fs from 'fs';
import path from 'path';
import { resolve, pathRelative } from './utils/index';

// const themeVariables = lessToJS(
//   fs.readFileSync(path.resolve(__dirname, './variables.less'), 'utf8')
// );

/** @type {import('vite').UserConfig} */

export default env => {
	return defineConfig({
		// base: 'http://192.168.0.108:8081', // https://xxx.com/
		plugins: [
			importToCDN({
				modules: [
					{ name: 'react', relativeModule: './umd/react.production.min.js' },
					{
						name: 'react-dom',
						relativeModule: './umd/react-dom.production.min.js',
						aliases: ['client'],
					},
					// {
					// 	name: 'react-router-dom',
					// 	relativeModule: './umd/react-router-dom.production.min.js',
					// },
					'react-router-dom',
				],
				resolve: cdnjs(),
				// apply: 'build',
			}),
			importToCDN({
				modules: [
					{
						name: 'lodash-es',
						// spare: 'https://cdn.jsdelivr.net/npm/lodash-es@4.17.21/lodash.min.js',
						relativeModule: './lodash.min.js',
						global: '_',
					},
				],
			}),
			// importToCDN({
			// 	// 需要 CDN 加速的模块
			// 	// prodUrl: 'https://cdn.jsdelivr.net/npm/react@18.2.0/umd',
			// 	modules: [
			// 		autoComplete('react'), // vue2 use autoComplete('vue2')
			// 		autoComplete('react-dom'),
			// 		{
			// 			name: 'react',
			// 			var: 'React',
			// 			path: `https://cdn.jsdelivr.net/npm/react@18.2.0/umd/react.production.min.js`,
			// 		},
			// 		// autoComplete('lodash-es'), 报不存在
			// 	],
			// }),
			viteCompression(), // gzip压缩
			visualizer({
				// 打包完成后自动打开浏览器，显示产物体积报告
				open: true,
			}),
		],
		build: {
			// 构建后是否生成 source map 文件
			sourcemap: true,
			//当设置为 true，构建后将会生成 manifest.json 文件
			manifest: true,
			/**
			 * 指定使用混淆器: boolean | 'terser' | 'esbuild'
			 * 设置为 false 可以禁用最小化混淆
			 * 注意，在 lib 模式下使用 'es' 时，build.minify 选项不会缩减空格，因为会移除掉 pure 标注，导致破坏 tree-shaking
			 */
			minify: 'terser', //terser 构建后文件体积更小
			//传递给 Terser 的更多 minify 选项。
			terserOptions: {
				compress: {
					drop_debugger: true,
					drop_console: true,
					pure_funcs: ['console.error', 'console.warn'],
				},
			},
			//浏览器兼容性  "esnext"|"modules", 'edge88', 'firefox78', 'chrome52', 'safari13.1', 'ie11'
			target: 'modules',
			// 需要兼容安卓端微信的WebView时，我们需要将 build.cssTarget 设置为 chrome61，以防止 vite 将 rgba() 颜色转化为 #RGBA 十六进制符号的形式，出现样式问题
			cssTarget: ['esnext', 'edge88', 'firefox78', 'chrome61', 'safari13.1', 'ie11'],
			//指定输出路径
			outDir: pathRelative('../../', env.VITE_OUTPUT_DIR),
			// 指定生成静态资源的存放路径
			assetsDir: 'static/',
			//启用/禁用 CSS 代码拆分
			cssCodeSplit: true,
			// 小于此阈值的导入或引用资源将内联为 base64 编码，以避免额外的 http 请求。设置为 0 可以完全禁用此项
			assetsInlineLimit: 4096,

			/** 构建为库
			 * 如果你指定了 build.lib，那么 build.assetsInlineLimit 将被忽略
			 * 无论文件大小或是否为 Git LFS 占位符，资源都会被内联。
			 * */
			// lib: {
			// },
			// @rollup/plugin-commonjs 插件的选项
			commonjsOptions: {
				sourceMap: false,
				include: [/node_modules/, /linked-dep/], // /jest_transform/,
				// exclude: ['react', 'react-dom'],
				extensions: ['.js', '.cjs'],
			},
			//自定义底层的 Rollup 打包配置
			rollupOptions: {
				// 用于库模式， 确保外部化处理那些不想打包进库的依赖
				external: ['react', 'react-dom', 'react-router-dom'],
				treeshake: true,
				output: {
					// 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
					// exports: 'named',
					// globals: {
					// 	react: 'React',
					// },
					/** 分包策略 **/
					// 1. 对象配置
					manualChunks: {
						// 将 React 相关库打包成单独的 chunk 中
						// 'react-vendor': ['react', 'react-dom', 'react-router-dom'],
						// // 将 Lodash 库的代码单独打包
						// lodash: ['lodash-es'],
						// 将组件库的代码打包
						library: ['antd'], // '@arco-design/web-react'
						// Echarts 单独拆分
						echarts: ['echarts', 'echarts-for-react'],
					},
					// 2. 函数配置 有循环引用的坑点
					// manualChunks: (id) => {
					// 	// id，就是所有文件的绝对路径
					// 	// if(id.includes("node_modules")) {
					// 	// 因为 node_modules 中的依赖通常是不会改变的
					// 	if (id.includes('antd') || id.includes('@arco-design/web-react')) {
					// 		return 'library';
					// 	}
					// 	if (id.includes('lodash-es')) {
					// 		return 'lodash';
					// 	}
					// 	if (id.includes('react')) {
					// 		// 直接单独打包出去，return 的值就是打包的名称
					// 		return 'react';
					// 	}
					// }
				},
				// brotliSize: false, // 不统计
				// target: 'esnext',
				// minify: 'esbuild', // 混淆器，terser构建后文件体积更小
			},

			// 设置为 false 来禁用将构建后的文件写入磁盘
			write: true,
			//默认情况下，若 outDir 在 root 目录下，则 Vite 会在构建时清空该目录。
			emptyOutDir: true,
			// 启用/禁用 gzip 压缩大小报告。压缩大型输出文件可能会很慢，因此禁用该功能可能会提高大型项目的构建性能
			reportCompressedSize: true,
			//chunk 大小警告的限制
			chunkSizeWarningLimit: 500,
			/** 构建为库
			 * 如果你指定了 build.lib，那么 build.assetsInlineLimit 将被忽略
			 * 无论文件大小或是否为 Git LFS 占位符，资源都会被内联。
			 * */
			lib: false,
			ssr: false,
			ssrManifest: false,
			watch: null,
			dynamicImportVarsOptions: { warnOnError: true, exclude: [] },
		},
		preview: {
			port: env.VITE_PORT, // 预览服务器端口
			host: true, // 监听所有地址，包括局域网和公网地址
			strictPort: true, // 端口被占用时，抛出错误
		},
	});
};
