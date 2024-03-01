# React + TypeScript + Vite + Antd + Micro-app Sub App

> vite 构建 react+ts+antd pc 端Micro-app子应用

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
	// other rules...
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
		project: ['./tsconfig.json', './tsconfig.node.json'],
		tsconfigRootDir: __dirname,
	},
};
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

### 开发坏境

- 安装

```sh
    pnpm install / yarn install
```

- 开发环境服务启动

```sh
    pnpm run start / yarn start
```

tsc 的全称是 TypeScript Compiler，也就是将 TypeScript 转码为 JavaScript 代码的编译器

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br>

### 生产坏境打包压缩

```sh
    pnpm run build / yarn build
```

### 部署

拷贝 dist 文件夹至启动服务即可

### 开发依赖 package

- eslint 相关插件
  eslint
  eslint-config-prettier // 关闭所有不必要或可能与[Prettier]冲突的规则
  ?"eslint-plugin-jsx-a11y": JSX 元素的可访问性规则的静态 AST 检查器
  "eslint-plugin-prettier": // 以 eslint 的规则运行 prettier 格式化
  ?"eslint-plugin-react": // react 相关规则
  ?"eslint-plugin-react-hooks": // react-hooks 相关规则
  ?"eslint-plugin-import" // ES6+ import/export 语法支持
  ?"eslint-import-resolver-typescript": // 添加 ts 语法支持 eslint-plugin-import
  "@typescript-eslint/eslint-plugin" // 使 eslint 支持 typescript，.eslintrc.js 的 plugins 参数
  "@typescript-eslint/parser" // 使 eslint 支持 typescript ，.eslintrc.js 的 parser 参数

  - vite plugin 插件
    "vite"
    "vite-plugin-babel-import":
    "vite-plugin-imp":
    "vite-plugin-inspect": 检查 Vite 插件的中间状态，用于调试和编写插件
    "vite-plugin-svgr":

  - 其他
    "typescript": "^4.3.5",
    "less": "^4.1.1", // less 的解析库
    "postcss": "^8.3.6", // 专门处理样式的工具
    "autoprefixer": "^10.3.1", // 自动生成各浏览器前缀 postcss 的一个插件
    "postcss-cssnext": "^3.1.1",
    "postcss-flexbugs-fixes":
    "postcss-import":
    "postcss-normalize":
    <!-- "postcss-preset-env":  -->
    "postcss-url":
    <!-- "serve": "^12.0.0", // 本地启动一个服务，可以查看静态文件 -->

- prettier 代码格式化
  "prettier": // 代码格式化工具
  "pretty-quick": // 在更改的文件上运行 prettier

- Hook 的规则
  1. 只能在当 React 渲染函数组件时调用 Hook：
     ✅ 在函数组件的顶层调用它们。
     ✅ 在自定义 Hook 的顶层调用它们。
  2. 不要在普通的 JavaScript 函数中调用 Hook。因为在普通函数中使用的 hooks 函数实际上都是名为 throwInvalidHookError 的函数。
  3. 不要在循环，条件或嵌套函数中调用 Hook。 因为如果 hooks 的执行顺序发生变化会导致 hooks 中使用错误的 hook 对象。
