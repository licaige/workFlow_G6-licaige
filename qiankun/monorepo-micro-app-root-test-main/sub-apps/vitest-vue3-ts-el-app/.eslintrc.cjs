/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');
const isProd = ['production', 'testing', 'staging', 'prod'].includes(process.env.VITE_NODE_ENV);
const prettierRc = require('./.prettierrc');

module.exports = {
	root: true,
	globals: {
		h: true,
		// Vue3.0提示报错未结构以下模块问题; Vue3.2以上版本不在需要结构
		defineProps: 'readonly',
		defineEmits: 'readonly',
		defineExpose: 'readonly',
		withDefaults: 'readonly',
	},
	env: {
		browser: true,
		node: true,
		esnext: true,
	},
	// 解析器
	parser: 'vue-eslint-parser',
	// 配置解析选项
	parserOptions: {
		parser: '@typescript-eslint/parser',
		ecmaVersion: 'latest', // | 2021  Allows for the parsing of modern ECMAScript features
		sourceType: 'module', // Allows for the use of imports
		ecmaFeatures: {
			jsx: true, // Allows for the parsing of JSX
			tsx: true,
			modules: true,
		},
		// project: './tsconfig.app.json',
		tsconfigRootDir: __dirname,
	},
	// 继承的规则 [扩展]
	extends: [
		'plugin:vue/vue3-essential',
		'eslint:recommended',
		'@vue/eslint-config-typescript',
		'@vue/eslint-config-prettier/skip-formatting',
		'plugin:@typescript-eslint/recommended',
		'plugin:prettier/recommended',
		// eslint-config-prettier 的缩写
		'prettier',
	],

	// 拓展和支持相关能力的插件库
	plugins: ['vue', '@typescript-eslint', 'prettier', 'eslint-plugin-html'],
	overrides: [
		{
			files: ['cypress/e2e/**/*.{cy,spec}.{js,ts,jsx,tsx}'],
			extends: ['plugin:cypress/recommended'],
		},
		{
			env: {
				node: true,
			},
			files: ['.eslintrc.{js,cjs}'],
			parserOptions: {
				sourceType: 'module',
			},
		},
	],
	rules: {
		'no-debugger': isProd ? 'warn' : 'off',
		'no-console': isProd ? 'warn' : 'off',
		'no-bitwise': 'off',
		'no-tabs': 'off',
		'array-element-newline': ['error', 'consistent'],
		'no-return-await': 'off',
		'vue/no-v-html': 'off',
		'vue/html-closing-bracket-newline': 'off',
		'vue/multiline-html-element-content-newline': 'off',
		'vue/singleline-html-element-content-newline': 'off',
		'@typescript-eslint/no-var-requires': 'off',
		'@typescript-eslint/no-empty-function': 'off',
		'@typescript-eslint/no-explicit-any': 'off',
		'@typescript-eslint/ban-types': 'off',
		'eslint-disable-next-line': 'off',
		'prettier/prettier': ['error', prettierRc],
		// 'vue/setup-compiler-macros': true,
		'vue/multi-word-component-names': 'off',
	},
	settings: {
		'import/parsers': {
			'@typescript-eslint/parser': ['.ts', '.tsx'],
		},
		'import/resolver': {
			typescript: {
				alwaysTryTypes: true, // always try to resolve types under `<root>@types` directory even it doesn't contain any source code, like `@types/unist`
				directory: './tsconfig.app.json',
				// project: './tsconfig.json',
			},
			node: {
				extensions: ['.ts', '.tsx', '.js', '.json'],
			},
			// alias: [['@', './packages']],
		},
		// "import/ignore": ["@types"], // Weirdly eslint cannot resolve exports in types folder (try removing this later)
	},
};
