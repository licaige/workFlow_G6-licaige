# @livelybone/scroll-get
[![NPM Version](http://img.shields.io/npm/v/@livelybone/scroll-get.svg?style=flat-square)](https://www.npmjs.com/package/@livelybone/scroll-get)
[![Download Month](http://img.shields.io/npm/dm/@livelybone/scroll-get.svg?style=flat-square)](https://www.npmjs.com/package/@livelybone/scroll-get)
![gzip with dependencies: kb](https://img.shields.io/badge/gzip--with--dependencies-kb-brightgreen.svg "gzip with dependencies: kb")
![typescript](https://img.shields.io/badge/typescript-supported-blue.svg "typescript")
![pkg.module](https://img.shields.io/badge/pkg.module-supported-blue.svg "pkg.module")

> `pkg.module supported`, 天然支持 tree-shaking, 使用 es module 引用即可

[English Document](./README.md)

Some useful tool of browser scroll, such as tool for calculating position relative to page/client, tool for getting the native scrollbar width...

## repository
https://github.com/livelybone/scroll-get.git

## Demo
https://github.com/livelybone/scroll-get#readme

## Run Example
你可以通过运行项目的 example 来了解这个组件的使用，以下是启动步骤：

1. 克隆项目到本地 `git clone https://github.com/livelybone/scroll-get.git`
2. 进入本地克隆目录 `cd your-module-directory`
3. 安装项目依赖 `npm i`(使用 taobao 源: `npm i --registry=http://registry.npm.taobao.org`)
4. 启动服务 `npm run dev`
5. 在你的浏览器看 example (地址通常是 `http://127.0.0.1:3000/examples/test.html`)

## Installation
```bash
npm i -S @livelybone/scroll-get
```

## Global name - The variable the module exported in `umd` bundle
`ScrollGet`

## Interface
去 [index.d.ts](./index.d.ts) 查看可用方法和参数

## Usage
```js
import {
  getRect, 
  posRelativeToPage, 
  posRelativeToClient, 
  getNativeScrollbarWidth,
  animation,
  scrollToElement,
} from '@livleybone/scroll-get'

/**
 * @result DOMRect | ClientRect | TextRectangle
 * */
var rect = getRect(document.getElementById('id'))
/**
 * @result { pageLeft: Number, pageTop: Number }
 * */
var pos = posRelativeToPage(document.getElementById('id'))
/**
 * @result { clientLeft: Number, clientTop: Number }
 * */
var pos1 = posRelativeToClient(document.getElementById('id'))
/**
 * @param { undefined | Window | Element } el
 * @result { x: Number, y: Number }
 * */
var el = window
var scrollbarInfo = getNativeScrollbarWidth(el)
``` 

在 HTML 文件中直接引用，你可以在 [CDN: unpkg](https://unpkg.com/@livelybone/scroll-get/lib/umd/) 看到你能用到的所有 js 脚本
```html
<-- 然后使用你需要的 -->
<script src="https://unpkg.com/@livelybone/scroll-get/lib/umd/<--module-->.js"></script>
```
