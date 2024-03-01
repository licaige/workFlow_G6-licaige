/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');
const isProd = ['production', 'testing', 'staging'].includes(process.env.VITE_NODE_ENV);
const prettierRc = require('./.prettierrc');
const path = require('path');

module.exports = {
	root: true,
	env: {
		node: true,
		esnext: true,
		browser: true,
		jest: true,
	},

	// 解析器
	parser: '@typescript-eslint/parser',
	// 配置解析选项
	parserOptions: {
		parser: '@typescript-eslint/parser',
		ecmaVersion: 'latest', // | 2021  Allows for the parsing of modern ECMAScript features
		sourceType: 'module', // Allows for the use of imports
		jsxPragma: 'React',
		ecmaFeatures: {
			jsx: true, // Allows for the parsing of JSX
			tsx: true,
			modules: true,
		},
		project: './tsconfig.json', // path.resolve(__dirname, './tsconfig.json'),
		tsconfigRootDir: __dirname,
		// createDefaultProgram: true,
	},
	// 继承的规则 [扩展]
	extends: [
		// "eslint:recommended",
		// Uses the recommended rules from the @typescript-eslint/eslint-plugin
		// "plugin:@typescript-eslint/eslint-recommended",
		'plugin:@typescript-eslint/recommended',
		'plugin:prettier/recommended',
		'prettier', // === 'prettier/@typescript-eslint' + 'prettier/react'
		'plugin:react/recommended',
		'plugin:react-hooks/recommended',
		// "plugin:react/jsx-runtime",
		'plugin:jsx-control-statements/recommended',
	],

	// 拓展和支持相关能力的插件库
	plugins: [
		'@typescript-eslint',
		'prettier',
		// 'react',
		'react-refresh',
		'react-hooks',
		'jsx-a11y',
		'jsx-control-statements',
	],
	// .eslintignore
	// ignorePatterns: ['dist', '.eslintrc.cjs'],
	rules: {
		'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
		'@typescript-eslint/explicit-function-return-type': 'off',
		'@typescript-eslint/no-unused-vars': 'off',
		// [
		//   "error",
		//   {
		//     "argsIgnorePattern": "^_",
		//     "varsIgnorePattern": "^_"
		//   }
		// ],
		'@typescript-eslint/ban-ts-comment': 'off',
		'@typescript-eslint/ban-types': 'off',
		'@typescript-eslint/no-var-requires': 'off',
		// "@typescript-eslint/interface-name-prefix": "off",
		// "@typescript-eslint/explicit-member-accessibility": "off",
		// "@typescript-eslint/no-triple-slash-reference": "off",
		'@typescript-eslint/ban-ts-ignore': 'off',
		'@typescript-eslint/no-this-alias': 'off',
		'@typescript-eslint/no-empty-function': 'off',
		'@typescript-eslint/no-use-before-define': 'off',
		'@typescript-eslint/no-non-null-assertion': 'off',
		// "@typescript-eslint/triple-slash-reference": [
		//   "error",
		//   { path: "always", types: "never", lib: "never" }
		// ],

		// 优先使用 interface 而不是 type
		'@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
		'@typescript-eslint/no-explicit-any': 'off',
		'@typescript-eslint/explicit-module-boundary-types': 'off',

		'import/no-dynamic-require': 'off',
		'import/order': 0,
		'import/imports-first': 0,
		'import/newline-after-import': 0,
		'import/no-extraneous-dependencies': 0,
		'import/no-named-as-default': 0,
		// "import/no-unresolved": [2, { caseSensitive: false }], // ts already checks case sensitive imports
		// "import/no-webpack-loader-syntax": 0,
		'import/prefer-default-export': 0,
		// "import/no-cycle": 1,
		// These rules don't add much value, are better covered by TypeScript and good definition files

		// React相关校验规则
		'react/no-unknown-property': ['error', { ignore: ['css'] }],
		'react/no-unescaped-entities': 'off',
		'react/no-direct-mutation-state': 'off',
		'react/no-deprecated': 'off',
		'react/no-string-refs': 'off',
		'react/require-render-return': 'off',
		'react/jsx-filename-extension': [
			'warn',
			{
				extensions: ['.js', '.jsx', '.ts', '.tsx'],
			},
		], // also want to use with ".tsx"
		'react/prop-types': 'off', // "warn", // Is this incompatible with TS props type?
		'react/display-name': 'off',
		// "react/jsx-no-undef": "error", // [2, { allowGlobals: true }],
		'react/jsx-uses-react': 'error',
		// "react/jsx-uses-vars": "error",
		// "react/jsx-key": "warn",
		'react/react-in-jsx-scope': 'warn', // 'off',
		// 检查 Hooks 的使用规则
		'react-hooks/rules-of-hooks': 'error',
		// 检查依赖项的声明
		'react-hooks/exhaustive-deps': 'warn',

		'jsx-control-statements/jsx-use-if-tag': 'off',
		'prettier/prettier': ['error', prettierRc],
		// "global-require": 0,
		'no-debugger': isProd ? 'warn' : 'off',
		'no-console': 'off', // ["warn", { allow: ["warn", "error"] }],
		eqeqeq: ['warn', 'always'], // 对于”==“和”===“的校验
		'prefer-const': ['error', { destructuring: 'all', ignoreReadBeforeAssign: true }],
		semi: ['error', 'always'],
		'comma-dangle': ['error', 'always-multiline'],
	},
	settings: {
		'import/parsers': {
			'@typescript-eslint/parser': ['.ts', '.tsx'],
		},
		'import/resolver': {
			typescript: {
				alwaysTryTypes: true, // always try to resolve types under `<root>@types` directory even it doesn't contain any source code, like `@types/unist`
				directory: './tsconfig.json',
			},
			node: {
				extensions: ['.ts', '.tsx', '.js', '.json'],
			},
			alias: [['@', './src']],
		},
		react: {
			version: 'detect',
		},
		// "import/ignore": ["@types"], // Weirdly eslint cannot resolve exports in types folder (try removing this later)
	},
};
