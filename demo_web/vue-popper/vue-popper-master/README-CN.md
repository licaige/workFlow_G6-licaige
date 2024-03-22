# @livelybone/vue-popper
[![NPM Version](http://img.shields.io/npm/v/@livelybone/vue-popper.svg?style=flat-square)](https://www.npmjs.com/package/@livelybone/vue-popper)
[![Download Month](http://img.shields.io/npm/dm/@livelybone/vue-popper.svg?style=flat-square)](https://www.npmjs.com/package/@livelybone/vue-popper)
![gzip with dependencies: 8.8kb](https://img.shields.io/badge/gzip--with--dependencies-8.8kb-brightgreen.svg "gzip with dependencies: 8.8kb")
![typescript](https://img.shields.io/badge/typescript-supported-blue.svg "typescript")
![pkg.module](https://img.shields.io/badge/pkg.module-supported-blue.svg "pkg.module")

> `pkg.module supported`, 天然支持 tree-shaking, 使用 es module 引用即可

[English Document](./README.md)

A vue component of popper.js, and the arrow position control is implemented

## repository
https://github.com/livelybone/vue-popper.git

## Demo
https://livelybone.github.io/vue/vue-popper/

## Run Example
你可以通过运行项目的 example 来了解这个组件的使用，以下是启动步骤：

1. 克隆项目到本地 `git clone https://github.com/livelybone/vue-popper.git`
2. 进入本地克隆目录 `cd your-module-directory`
3. 安装项目依赖 `npm i`(使用 taobao 源: `npm i --registry=http://registry.npm.taobao.org`)
4. 启动服务 `npm run dev`
5. 在你的浏览器看 example (地址通常是 `http://127.0.0.1:3000/examples/test.html`)

## Installation
```bash
npm i -S @livelybone/vue-popper
```

## Global name - The variable the module exported in `umd` bundle
`VuePopper`

## Interface
去 [index.d.ts](./index.d.ts) 查看可用方法和参数

## Usage
```js
import VuePopper from '@livelybone/vue-popper'
import '@livelybone/vue-popper/lib/css/index.css';

// 全局注册
Vue.component('VuePopper', VuePopper)

// 局部注册
new Vue({
  components:{VuePopper}
})
```

## Props
| Name                    | Type                                      | DefaultValue              | Description  |
| ----------------------- | ----------------------------------------- | ------------------------- | ------------ |
| `arrowPosition`         | `String`                                  | `middle`                  | Set the position of arrow, options: `middle start end`  |
| `arrowOffsetScaling`    | `Number`                                  | `window.devicePixelRatio` or `1`                       | Set the left offset scaling of arrow  |
| `referenceElm`          | `HTMLElement`                             | the parentNode of the component instance              | Prop `reference` of popper.js  |
| `popperOptions`         | `Object`                                  | Defaults of popper.js     | Prop `options` of popper.js |

## style
Since 2.3.0， you don't need to import the css file in your project, because the style will be injected inline

For rewrite style, you can copy the `index.scss` or `index.css` file, rewrite it, and the import the file in your project

## QA

1. Error `Error: spawn node-sass ENOENT`

> 你可能需要全局安装 node-sass，`npm i -g node-sass`
