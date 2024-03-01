import { fileURLToPath } from 'node:url';
import { mergeConfig, defineConfig, type UserConfig } from 'vite';
import type { InlineConfig } from 'vitest';
import { configDefaults } from 'vitest/config';
import viteConfig from './vite.config';

interface VitestConfigExport extends UserConfig {
	test: InlineConfig;
}

// export default mergeConfig(
// 	viteConfig,
// 	defineConfig({}),
// );
/**
 * mergeConfig 只接受对象形式的配置。
 * 如果有一个回调形式的配置，应该在将其传递给 mergeConfig 之前先调用该回调函数，将其转换成对象形式
 */
export default defineConfig(configEnv =>
	mergeConfig(viteConfig(configEnv), {
		test: {
			// 默认情况下，vitest 不显式提供全局 API。如果你更倾向于使用类似 jest 中的全局 API，可以将 --globals 选项传递给 CLI 或在配置中添加 globals: true。
			globals: true,
			environment: 'jsdom',
			// 匹配包含测试文件的 glob 规则
			include: ['**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
			// 匹配排除测试文件的 glob 规则
			exclude: [
				...configDefaults.exclude,
				'e2e/*',
				'../dist/**',
				'../cypress/**',
				'**/.{idea,git,cache,output,temp}/**',
				'**/{karma,rollup,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build}.config.*',
			],
			// includeSource: ["tests/*.{js,jsx,ts,tsx}", "tests/**/*.{js,jsx,ts,tsx}"],
			// coverage: {
			//   reporter: ["text", "html"],
			// },
			// setupFiles: ['../tests/setup.ts'],
			root: fileURLToPath(new URL('./', import.meta.url)),
			transformMode: {
				web: [/\.[jt]sx$/],
			},
			// you might want to disable it, if you don't have tests that rely on CSS
			// since parsing CSS is slow
			css: true,
		},
	} as VitestConfigExport),
);
