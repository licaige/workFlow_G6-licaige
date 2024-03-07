# 微应用（qiankun）之 vite 构建

## 前言

微前端的概念 `2016` 年就已经提出，但是直到 `2019` 年 `11` 月，[qiankun](https://github.com/umijs/qiankun) 发布 `1.0` 版本，微前端才真正开始流行起来。而我也因公司项目开始接触到微前端，于是便开始了解一些微前端知识。对于网上的相关文章有很多，但大多数都是基于 `webpack` 构建的，所以就想着自己写一个基于 `vite` 构建的微前端示例，方便自己学习和记录。

> 代码仓库：[micro-frontends-qiankun](https://github.com/niezicheng/micro-frontends-qiankun)

## 什么是微前端

微前端（Micro-Frontends）是一种多个团队通过独立发布功能的方式来共同构建现代化 `web` 应用的技术手段及方法策略。它旨在解决单体应用在一个相对长的时间跨度下，由于参与的人员、团队的增多、变迁，从一个普通应用演变成一个巨石应用（Frontend Monolith）后，随之而来的应用不可维护的问题。这类问题在企业级 `Web` 应用中尤其常见。而微前端系统可以将巨石应用拆成多个可以独立开发、独立运行、独立部署的小应用，从而达到多个小应用共同构建一个大型应用的目的。

## 为什么要使用微前端

- **技术栈无关**：每个应用仅需关注自身的技术栈，不需要因为技术选型不同而影响其他应用
- **独立开发、独立部署**：每个微应用仓库独立，可以独立开发、独立部署
- **增量升级**：可以在不影响旧系统的情况下，逐步迁移旧系统，是一种非常好的实施渐进式重构的手段和策略
- **独立运行时**：每个微应用之间状态隔离，运行时状态不共享

## 微前端解决方案之 qiankun

[qiankun](https://qiankun.umijs.org/zh) 是一个基于 [single-spa](https://github.com/single-spa/single-spa) 的[微前端](https://micro-frontends.org/)实现库，旨在帮助大家能更简单、无痛的构建一个生产可用系统。

目前 `qiankun` 官方文档并未支持基于 `vite` 来构建应用, 也就自然没有提供对于 `vite` 构建的示例说明，不过在未来 [qiankun3 将会添加对于 vite 的支持](https://github.com/umijs/qiankun/discussions/1378)，让我们拭目以待。

### qiankun 基本原理

简述一下 `qiankun` 的基本原理：

主应用通过 `qiankun` 提供的方法以路由路径的形式匹配子应用并引入，而后将子应用 `html` 作为入口，并通过 [import-html-entry](https://github.com/kuitos/import-html-entry) 来加载子应用所需要的 `js`、`css` 资源列表，再依次用 `eval` 去执行，从而完成子应用的加载。更多细节可以参考 [微前端原理分析](https://juejin.cn/column/7070032389811994631)

## 涉及技术

- 主应用(micro-main)：react18 + react-router6 + redux8 + qiankun2 + vite2
- 子应用(react-app)：react18 + react-router6 + qiankun2 + vite2
- 子应用(vue-app)：vue3 + vue-router4 + qiankun2 + vite2

## qiankun 之 vite 构建

[为什么选择 vite](https://cn.vitejs.dev/guide/why.html)

### 存在问题

Q1： `vite` 的模块加载方式是 `esm`, 而 `qiankun` 并[不支持](https://github.com/umijs/qiankun/issues/1257)在非 `module script` 标签内解析 `esm` 格式的代码，导致子应用无法正确加载

Q2： 对于 `react-refresh` 需要全局变量 `__vite_plugin_react_preamble_installed`, 由于 `qiankun` 使用 `window+proxy` 实现了 `js` 沙箱，所以这里的全局变量实际上会被挂载到 `window.proxy` 上，导致后续访问全局变量会报错

Q3： `vite` 不支持运行时 `publicPath` 的配置，而 `qiankun` 需要在运行时动态修改 `publicPath` 来加载子应用的资源

### 解决方案

#### 开发环境下

我们可以借助 `vite-plugin-qiankun` 插件来得到解决。它通过 `dynamic import()` 的形式来加载子应用程序，从而使得可以在模块系统【 `ESM` 和 `CommonJS` 】下均可正确加载子应用程序；同时它还会在 `window` 上挂载 `__INJECTED_PUBLIC_PATH_BY_QIANKUN__` 全局变量，用于在运行时动态修改 `publicPath` 来加载子应用的资源。详情可参考 [vite-plugin-qiankun](https://github.com/tengmaoqing/vite-plugin-qiankun)

#### 生产环境下

生产模式下依旧不支持 `publicPath` , 需要将 `vite.config.ts` 中 `base` 配置写死。而如果是写死的话可能导致多环境部署不便捷并且它无法像在 `webpack` 中结合 `window.INJECTED_PUBLIC_PATH_BY_QIANKUN + publicpath` 来解决

`Vite` 对 `runtime publicpath` 的支持，可以尝试下面这个插件：

[vite-plugin-dynamic-base](https://github.com/chenxch/vite-plugin-dynamic-base)，它可以解析所有资源文件动态 `publicPath`，如 `Webpack` 的`__webpack_public_path__` 类似。

### 说明

1. 以下所有应用项目均以 `vite` 构建，详情可参考 [vite templates](https://cn.vitejs.dev/guide/#scaffolding-your-first-vite-project)
2. 示例代码只展示部分关键代码，目前只在开发环境下验证过，并未在生产环境下进行验证。完整代码可参考 [micro-frontends-qiankun](https://github.com/niezicheng/micro-frontends-qiankun)

### 主应用(micro-main)

#### 初始化项目

```zsh
pnpm create vite micro-main --template react-ts
```

#### 注册子应用

```ts
import { registerMicroApps, setDefaultMountApp, start, runAfterFirstMounted } from 'qiankun';

// 注册子应用
registerMicroApps([
  {
    label: 'React 应用', // 子应用名称
    name: 'reactApp', // 子应用名称
    entry: '//localhost:8888', // 子应用入口
    container: '#subapp-viewport', // 子应用挂载的容器
    activeRule: '/micro/reactApp', // 子应用的激活规则【匹配路由】
    props: { // 传递给子应用的数据
      basename: '/micro/reactApp',
    },
  },
  {
    label: 'Vue 应用',
    name: 'vueApp',
    entry: '//localhost:9999',
    container: '#subapp-viewport',
    activeRule: '/micro/vueApp',
     props: {
      basename: '/micro/vueApp',
    },
  },
], {
  // qiankun 生命周期钩子 - 加载前
  beforeLoad: (app) => {
    console.log('before load', app);
  },
  // qiankun 生命周期钩子 - 挂载后
  afterMount: (app) => {
    console.log('before mount', app);
  },
  // qiankun 生命周期钩子 - 卸载后
  afterUnmount: (app) => {
    console.log('after unload', app);
  },
});

// 设置默认进入的子应用
setDefaultMountApp("/micro/reactApp");

// 启动 qiankun
start()

// 第一个子应用加载完毕回调
runAfterFirstMounted(() => {
  console.log("[MainApp] first app mounted");
});
```

### 子应用(react-app)

相对于 `react` 子应用而言，简单使用的 `vite-plugin-qiankun` 插件可以正确使用，但是 `react-refresh` (热更新)无法生效，这里参考 `vite-plugin-qiankun` 插件并结合 `vite` 相关配置来进行处理。详情可参考 [micro-frontends-qiankun/react-app](https://github.com/niezicheng/micro-frontends-qiankun/tree/main/react-app)。

#### 初始化项目

```zsh
pnpm create vite react-app --template react-ts
```

#### 生命周期钩子

main.tsx

```tsx
import React from 'react'
import { createRoot } from 'react-dom/client'
import { renderWithQiankun, qiankunWindow } from 'plugins/qiankun/helper';
import App from 'App'

let root: any = null

// 渲染函数
const render = (props: { [x: string]: any; container?: any; }) => {
  const { container } = props;
  root = createRoot(container ?
    container.querySelector("#root") :
    document.getElementById('root') as HTMLElement
  )
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  )
}

// 导出 qiankun 的生命周期钩子函数
renderWithQiankun({
  mount(props) {
    console.log("[react18] props from main framework", props);
    // 挂在后渲染
    render(props);
  },
  bootstrap() {
    console.log("[react18] react app bootstraped");
  },
  unmount(props) {
    const { container } = props;
    // 卸载后清理
    root.unmount(container ?
      container.querySelector("#root") :
      document.getElementById('root') as HTMLElement);
  },
  update(props: any) {
    console.log("[react18] react app update", props);
  },
});

// 判断是否在 qiankun 环境下而后渲染
if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
  render({});
}
```

vite.config.ts

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import qiankunPlugin from './src/plugins/qiankun/vite-plugin-qiankun';
import { name } from './package.json';

const port = 8888; // dev port
const useDevMode = true; // 是否使用开发模式

export default defineConfig(({ mode }) => ({
  plugins: [
    react({
      babel: {
        babelrc: false,
        // 支持解析装饰器【结合 qiankunPlugin 处理开发环境热更新问题】
        plugins: [["@babel/plugin-proposal-decorators", { legacy: true }]],
      },
    }),
    qiankunPlugin(name, { useDevMode }),
  ],
}))
```

### 子应用(vue-app)

相对于 `vue` 子应用而言，简单使用的 `vite-plugin-qiankun` 插件即可，无需额外配置。不过开发环境下需添加 `server.origin` 配置，否则在主应用中无法获取到子应用的静态资源。详情可参考 [micro-frontends-qiankun/vue-app](https://github.com/niezicheng/micro-frontends-qiankun/tree/main/vue-app)，以下是关键代码：

#### 初始化项目

```zsh
pnpm create vite react-app --template vue-ts
```

#### 生命周期钩子

main.ts

```ts
import { App as TApp, createApp } from 'vue'
import { renderWithQiankun, qiankunWindow } from 'vite-plugin-qiankun/es/helper';
import App from 'App.vue'

let app: TApp;

// 渲染函数
function render(props: any) {
  const { container } = props;
  app = createApp(App)
  const c = container
    ? container.querySelector("#app")
    : document.getElementById("app")
  app.mount(c)
}

// 导出 qiankun 的生命周期钩子函数
renderWithQiankun({
  mount(props) {
    console.log("vue3sub mount", props);
    // 挂在后渲染
    render(props);
  },
  bootstrap() {
    console.log("bootstrap");
  },
  unmount(props: any) {
    console.log("vue3sub unmount", props);
    app.unmount();
  },
  update(props: any) {
    console.log("vue3sub update", props);
  },
});

// 判断是否在 qiankun 环境下而后渲染
if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
  render({});
}
```

vite.config.ts

```ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import qiankunPlugin from 'vite-plugin-qiankun';
import tsconfigPaths from 'vite-tsconfig-paths'
import { name } from './package.json';

const port = 9999; // dev port
const useDevMode = true; // 是否使用开发模式

export default defineConfig(({ mode }) => ({
  plugins: [
    vue(),
    qiankunPlugin(name, { useDevMode }),
  ],
  server: {
    port,
    cors: true,
    // 需要设置为 true, 否则开发环境下子应用资源无法在主应用展示
    origin: `http://localhost:${port}`,
  },
  // 生产模式下依旧不支持 publicPath, 需要将 vite.config.js 中 base 配置写死【致使多环境部署不便捷】
  base: mode === 'development' ? '/' : `http://127.0.0.1:${port}/`,
  resolve: {
    // 忽略后缀名的配置选项, 添加 .vue 选项时要记得原本默认忽略的选项也要手动写入
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
  },
}))
```

## 回顾总结

- 首先，我们明确了微前端的概念、适用场景，并介绍来微前端架构系统 `qiankun` 的概念以及基本原理。
- 其次，我们描述了在基于 `vite` 构建 `qiankun` 微前端项目可能遇到的问题，以及如何去解决它们。
- 然后，我们通过 `vite-plugin-qiankun` 以动态导入的形式来加载子应用程序，并且结合 `vite` 配置对 `react` 热更新以及 `vue` 子应用资源获取等问题进行了处理。
- 最后，我们以各应用关键代码为例，对 `qiankun` 的一些方法和生命周期钩子函数进行了介绍。

## 拓展

[弃用qiankun！看古茗中后台架构如何破局](https://juejin.cn/post/7269352663258284069)

[hel-micro](https://tnfe.github.io/hel/)

## 参考资料

[qiankun 官方文档](https://qiankun.umijs.org/zh)

[Vite 官方文档](https://cn.vitejs.dev/)

[在微前端 qiankun 中使用 Vite 你踩坑了吗？](https://juejin.cn/post/7054009091961651237)

[vite 子应用接入微前端框架 qiankun](https://juejin.cn/post/7078958486041657374)
