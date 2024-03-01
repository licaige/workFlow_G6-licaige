import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import Icons from 'unplugin-icons/vite';
import IconsResolver from 'unplugin-icons/resolver';
import Inspect from 'vite-plugin-inspect';
import legacy from '@vitejs/plugin-legacy';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import { fileURLToPath, URL } from 'node:url';
import path from 'path';

import Unocss from 'unocss/vite';
import {
	presetAttributify,
	presetIcons,
	presetUno,
	transformerDirectives,
	transformerVariantGroup,
} from 'unocss';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
	const viteEnv = loadEnv(mode, path.resolve(__dirname, './env'), ['VITE_', 'APP_']);
	const isProd = ['production', 'staging', 'testing'].includes(viteEnv.VITE_NODE_ENV);
	console.log('sub-vue3-APP_BASE_ROUTER', viteEnv);
	return {
		base: `${viteEnv.APP_BASE_ROUTER}`, // subvue3/
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
				'axios',
				'lodash-es',
				'dayjs',
				'vue',
				'vue-router',
				'vue-i18n',
				// 'async-validator',
			],
			// exclude: ['your-package-name'] //排除在优化之外
		},
		plugins: [
			// vue(),
			vue({
				include: [/\.vue$/, /\.md$/],
				template: {
					compilerOptions: {
						isCustomElement: tag => /^micro-app/.test(tag),
					},
				},
			}),
			// vueJsx({
			//   mergeProps: false,
			//   enableObjectSlots: false,
			// }),
			vueJsx(),
			// vueI18n({
			//   include: resolve('./src/locales/**'),
			//   runtimeOnly: false
			// })
			AutoImport({
				resolvers: [
					ElementPlusResolver({
						// 关键：自动引入修改主题色添加这一行，使用预处理样式，不添加将会导致使用ElMessage，ElNotification等组件时默认的主题色会覆盖自定义的主题色
						importStyle: 'sass',
					}),
					// 自动导入图标组件
					// IconsResolver(),
					IconsResolver({
						prefix: 'I',
					}),
				],
				include: [
					/\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
					/\.vue$/,
					/\.vue\?vue/, // .vue
					// /\.(s?c|le)ss$/,
					/\.md$/, // .md
				],
				// // global imports to register
				imports: [
					// presets
					'vue',
					// 'vue/macros',
					'@vueuse/core',
					'vue-router',
					'pinia',
					'vue-i18n',
					// custom
					// {
					// 	'@vueuse/core': [
					// 		// named imports
					// 		'useMouse', // import { useMouse } from '@vueuse/core',
					// 		// alias
					// 		// ['useFetch', 'useMyFetch'], // import { useFetch as useMyFetch } from '@vueuse/core',
					// 	],
					// 	// axios: [ // 已经封装了库，不使用
					// 	// 	// default imports
					// 	// 	['default', 'axios'], // import { default as axios } from 'axios',
					// 	// ],
					// 	'[package-name]': [
					// 		'[import-names]',
					// 		// alias
					// 		['[from]', '[alias]'],
					// 	],
					// },
					// example type import
					// {
					// 	from: 'vue-router',
					// 	imports: ['RouteLocationRaw'],
					// 	type: true,
					// },
				],
				// // Array of strings of regexes that contains imports meant to be filtered out.
				ignore: ['useFetch'],
				dts: './types/auto-imports.d.ts',
			}),
			Components({
				// allow auto load markdown components under `./src/components/`
				extensions: ['vue', 'md'],
				// allow auto import and register components used in markdown
				include: [/\.vue$/, /\.vue\?vue/, /\.md$/], // /\.(s?c|le)ss$/,
				resolvers: [
					// 自动导入 Element Plus 组件
					ElementPlusResolver({
						// 关键：自动引入修改主题色添加这一行，使用预处理样式
						importStyle: 'sass',
					}),
					// 自动注册图标组件
					// IconsResolver(),
					IconsResolver({
						// prefix: false, 这样设置不行
						// alias: {
						// 	ep: 'icon-ep',
						// },
						enabledCollections: ['ep'],
					}),
				],

				dts: './types/components.d.ts',
			}),
			Icons({
				// compiler: 'vue3',
				autoInstall: true,
			}),

			legacy({
				// 需要兼容的目标列表
				targets: [
					'defaults',
					// 'not IE 11',
					'Chrome >= 52',
					'Safari >= 10.1',
					'Firefox >= 54',
					'Edge >= 15',
					// 'IOS >= 10.3',
					// 'Android > 39',
				],
				// 面向IE11时需要此插件
				additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
			}),
			createSvgIconsPlugin({
				// 指定需要缓存的图标文件夹
				iconDirs: [fileURLToPath(new URL('./src/assets/images/icons', import.meta.url))],
				// 指定symbolId格式
				symbolId: 'icon-[dir]-[name]',
			}),
			// https://github.com/antfu/unocss
			// see unocss.config.ts for config
			Unocss({
				presets: [
					presetUno(),
					presetAttributify(),
					presetIcons({
						scale: 1.2,
						warn: true,
					}),
				],
				transformers: [transformerDirectives(), transformerVariantGroup()],
			}),
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
				scss: {
					// 全局引入
					additionalData: `@use "@/assets/styles/main/normalize.scss" as *;@use "@/assets/styles/main/function.scss" as *;@use "@/assets/styles/theme/index.scss" as *;`,
					// charset: false,
					// outputStyle: 'expanded',
					/** 引入var.scss全局预定义变量 */
					// modifyVars: {
					// 	'primary-color': '#1890ff',
					// 	'font-size-base': '14px',
					// },
				},
				sass: {
					charset: false,
					outputStyle: 'expanded',
				},
				less: {
					// 支持内联 JavaScript
					javascriptEnabled: true, //注意，这一句是在less对象中，写在外边不起作用
					// additionalData: 'import "@/assets/styles/base.less"; import "@/assets/styles/function.less";'
					// modifyVars:{ //在这里进行主题的修改，参考官方配置属性 // modifyVars: themeVariables,
					//   '@primary-color': '#1DA57A',
					// },
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
			// 配置 css modules 的行为
			modules: {
				localsConvention: 'camelCase',
			},
		},
		resolve: {
			// 导入时想要省略的扩展名列表
			extensions: [
				// '.wasm',
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
			],
			// 配置别名
			alias: [
				// {
				// 	find: /^~/,
				// 	replacement: fileURLToPath(new URL('./', import.meta.url)),
				// },
				{
					find: '@/',
					replacement: fileURLToPath(new URL('./src/', import.meta.url)),
				},
				{
					find: /^tests/,
					replacement: fileURLToPath(new URL('./tests', import.meta.url)),
				},
				// { find: /\/#/, replacement: path.resolve(__dirname, './types') }
			],
			// 情景导出 package.json 配置中的exports字段
			// conditions: [],
		},
		server: {
			// base: './',
			fs: {
				strict: true,
			},
			host: '0.0.0.0',
			// host: true, // 监听所有地址，包括局域网和公网地址 "localhost",
			port: viteEnv.VITE_PORT, // 开发服务器端口
			// https: false, //是否启用 http 2
			// force: true, //是否强制依赖预构建
			cors: true, // 为开发服务器配置 CORS , 默认启用并允许任何源
			open: true, //服务启动时自动在浏览器中打开应用
			strictPort: false, //端口严格模式， 为true时，当端口被占用则直接退出，不会尝试下一个可用端口
			//HMR连接配置{}, false-禁用
			hmr: {
				// host: 'localhost'
				// overlay: true, // 设为true会导致热更新速度慢
				port: viteEnv.VITE_PORT,
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
			// proxy: (() => {
			//   const proxyPath = [
			//     '/api',
			//     '/mock'
			//     // '/socket.io'
			//   ]
			//   const proxyConfig = {}
			//   for (const item of proxyPath) {
			//     const regExp = new RegExp(`^\${item}`) // ,'g'
			//     proxyConfig[item] = {
			//       target: env.APP_API_BASE_URL,
			//       // logLevel: 'debug', // 查看代理请求的真实地址
			//       changeOrigin: true,
			//       rewrite: (path) => path.replace(regExp, '/'),
			//       cookieDomainRewrite: '',
			//       secure: false
			//     }
			//   }
			//   // console.log('proxyConfig:', proxyConfig);
			//   return proxyConfig
			// })()

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

		build: {
			// 构建后是否生成 source map 文件
			sourcemap: true,
			//当设置为 true，构建后将会生成 manifest.json 文件
			manifest: false,
			/**
			 * 指定使用混淆器: boolean | 'terser' | 'esbuild'
			 * 设置为 false 可以禁用最小化混淆
			 */
			minify: 'esbuild', // terser 构建后文件体积更小
			//传递给 Terser 的更多 minify 选项。
			terserOptions: {
				compress: {
					drop_console: true,
					drop_debugger: true,
				},
			},
			//浏览器兼容性  "esnext"|"modules"
			target: ['esnext', 'edge88', 'firefox78', 'chrome52', 'safari13.1', 'ie11'],
			cssTarget: ['esnext', 'edge88', 'firefox78', 'chrome52', 'safari13.1', 'ie11'],
			//指定输出路径
			outDir: viteEnv.VITE_OUTPUT_DIR,
			// 指定生成静态资源的存放路径
			assetsDir: 'static',
			//启用/禁用 CSS 代码拆分
			cssCodeSplit: true,
			// 小于此阈值的导入或引用资源将内联为 base64 编码，以避免额外的 http 请求。设置为 0 可以完全禁用此项
			assetsInlineLimit: 4096,
			//自定义底层的 Rollup 打包配置
			rollupOptions: {
				// make sure to externalize deps that shouldn't be bundled
				// into your library
				external: ['vue', 'vue-router', 'pinia'],
				treeshake: true,
				output: {
					// Provide global variables to use in the UMD build
					// for externalized deps
					exports: 'named',
					globals: {
						vue: 'Vue',
					},
					// chunkFileNames: 'static/js1/[name]-[hash].js',
					// entryFileNames: 'static/js2/[name]-[hash].js',
					// assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
				},
				// target: 'esnext',
				// minify: 'esbuild', // 混淆器，terser构建后文件体积更小
			},

			// @rollup/plugin-commonjs 插件的选项
			commonjsOptions: {
				include: [/node_modules/], // /jest_transform/,
			},
			// 启用/禁用 gzip 压缩大小报告。压缩大型输出文件可能会很慢，因此禁用该功能可能会提高大型项目的构建性能
			reportCompressedSize: true,
			//chunk 大小警告的限制
			chunkSizeWarningLimit: 500,
			// 设置为 false 来禁用将构建后的文件写入磁盘
			write: true,
			//默认情况下，若 outDir 在 root 目录下，则 Vite 会在构建时清空该目录。
			emptyOutDir: true,
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
			port: viteEnv.VITE_PORT, // 预览服务器端口
			host: true, // 监听所有地址，包括局域网和公网地址
			strictPort: true, // 端口被占用时，抛出错误
		},
	};
});
