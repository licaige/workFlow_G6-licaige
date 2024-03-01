// @ts-ignore
import { defineConfig, loadEnv, type ConfigEnv, type UserConfig } from 'vite';
import react from '@vitejs/plugin-react'; // 和plugin-react-refresh冲突
// import reactJsx from 'vite-react-jsx';

import { fileURLToPath, URL } from 'node:url';

import viteBaseConfig from './vite.base.config';
import viteDevConfig from './vite.dev.config';
import viteProdConfig from './vite.prod.config';
import { resolve } from './utils/index';

const resolveEnvFn = {
	serve: env => ({ ...viteBaseConfig(env), ...viteDevConfig(env) }),
	build: env => ({ ...viteBaseConfig(env), ...viteProdConfig(env) }),
};

/**
 * @command: 'build' | 'serve'
 * @mode: 'production' | 'development'
 * @isSsrBuild: boolean
 */
export default defineConfig(({ command, mode }: ConfigEnv): UserConfig => {
	// 根据当前工作目录中的 `mode` 加载 .env 文件
	// 设置第三个参数为 '' 来加载所有环境变量，而不管是否有 `VITE_` 前缀。
	const viteEnv = loadEnv(mode, resolve('./env'), ['VITE_', 'APP_']); // prefix ['VITE_', 'APP_']
	const isAnalyze = mode === 'analyze';

	const processEnvPrefix = Object.entries(viteEnv).reduce((prev, [key, val]) => {
		return {
			...prev,
			['process.env.' + key]: `"${val}"`,
			// "process.env": `${JSON.stringify(viteEnv)}`,
		};
	}, {});

	console.log('process.cwd:', viteEnv, processEnvPrefix);

	return {
		...resolveEnvFn[command](viteEnv),
		base: viteEnv.APP_BASE_ROUTER, //  './',
		define: {
			...processEnvPrefix,
		},
	};
});
