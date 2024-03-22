# @livelybone/vue-popper
[![NPM Version](http://img.shields.io/npm/v/@livelybone/vue-popper.svg?style=flat-square)](https://www.npmjs.com/package/@livelybone/vue-popper)
[![Download Month](http://img.shields.io/npm/dm/@livelybone/vue-popper.svg?style=flat-square)](https://www.npmjs.com/package/@livelybone/vue-popper)
![gzip with dependencies: 8.8kb](https://img.shields.io/badge/gzip--with--dependencies-8.8kb-brightgreen.svg "gzip with dependencies: 8.8kb")
![typescript](https://img.shields.io/badge/typescript-supported-blue.svg "typescript")
![pkg.module](https://img.shields.io/badge/pkg.module-supported-blue.svg "pkg.module")

> `pkg.module supported`, which means that you can apply tree-shaking in you project

[中文文档](./README-CN.md)

A vue component of popper.js, and the arrow position control is implemented

## repository
https://github.com/livelybone/vue-popper.git

## Demo
https://livelybone.github.io/vue/vue-popper/

## Run Example
Your can see the usage by run the example of the module, here is the step:

1. Clone the library `git clone https://github.com/livelybone/vue-popper.git`
2. Go to the directory `cd your-module-directory`
3. Install npm dependencies `npm i`(use taobao registry: `npm i --registry=http://registry.npm.taobao.org`)
4. Open service `npm run dev`
5. See the example(usually is `http://127.0.0.1:3000/examples/test.html`) in your browser

## Installation
```bash
npm i -S @livelybone/vue-popper
```

## Global name - The variable the module exported in `umd` bundle
`VuePopper`

## Interface
See what method or params you can use in [index.d.ts](./index.d.ts)

## Usage
```js
import VuePopper from '@livelybone/vue-popper'
import '@livelybone/vue-popper/lib/css/index.css';

// Global register
Vue.component('VuePopper', VuePopper)

// Local register
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

> You may need install node-sass globally, `npm i -g node-sass`
