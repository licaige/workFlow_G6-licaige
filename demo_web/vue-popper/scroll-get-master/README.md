# @livelybone/scroll-get
[![NPM Version](http://img.shields.io/npm/v/@livelybone/scroll-get.svg?style=flat-square)](https://www.npmjs.com/package/@livelybone/scroll-get)
[![Download Month](http://img.shields.io/npm/dm/@livelybone/scroll-get.svg?style=flat-square)](https://www.npmjs.com/package/@livelybone/scroll-get)
![gzip with dependencies: kb](https://img.shields.io/badge/gzip--with--dependencies-kb-brightgreen.svg "gzip with dependencies: kb")
![typescript](https://img.shields.io/badge/typescript-supported-blue.svg "typescript")
![pkg.module](https://img.shields.io/badge/pkg.module-supported-blue.svg "pkg.module")

> `pkg.module supported`, which means that you can apply tree-shaking in you project

[中文文档](./README-CN.md)

Some useful tool of browser scroll, such as tool for calculating position relative to page/client, tool for getting the native scrollbar width...

## repository
https://github.com/livelybone/scroll-get.git

## Demo
https://github.com/livelybone/scroll-get#readme

## Run Example
Your can see the usage by run the example of the module, here is the step:

1. Clone the library `git clone https://github.com/livelybone/scroll-get.git`
2. Go to the directory `cd your-module-directory`
3. Install npm dependencies `npm i`(use taobao registry: `npm i --registry=http://registry.npm.taobao.org`)
4. Open service `npm run dev`
5. See the example(usually is `http://127.0.0.1/examples/test.html`) in your browser

## Installation
```bash
npm i -S @livelybone/scroll-get
```

## Global name - The variable the module exported in `umd` bundle
`ScrollGet`

## Interface
See what method or params you can use in [index.d.ts](./index.d.ts)

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

Use in html, see what your can use in [CDN: unpkg](https://unpkg.com/@livelybone/scroll-get/lib/umd/)
```html
<-- use what you want -->
<script src="https://unpkg.com/@livelybone/scroll-get/lib/umd/<--module-->.js"></script>
```
