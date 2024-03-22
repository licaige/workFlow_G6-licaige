# @livelybone/copy
[![NPM Version](http://img.shields.io/npm/v/@livelybone/copy.svg?style=flat-square)](https://www.npmjs.com/package/@livelybone/copy)
[![Download Month](http://img.shields.io/npm/dm/@livelybone/copy.svg?style=flat-square)](https://www.npmjs.com/package/@livelybone/copy)
![gzip with dependencies: 1.9kb](https://img.shields.io/badge/gzip--with--dependencies-1.9kb-brightgreen.svg "gzip with dependencies: 1.9kb")
![typescript](https://img.shields.io/badge/typescript-supported-blue.svg "typescript")
![pkg.module](https://img.shields.io/badge/pkg.module-supported-blue.svg "pkg.module")

> `pkg.module supported`, which means that you can apply tree-shaking in you project

About clipboard copy, Object simple&deep copy

## repository
https://github.com/livelybone/copy.git

## Demo
https://livelybone.github.io/tool/copy/

## Run Example
Your can see the usage by run the example of the module, here is the step:

1. Clone the library `git clone https://github.com/livelybone/copy.git`
2. Go to the directory `cd your-module-directory`
3. Install npm dependencies `npm i`(use taobao registry: `npm i --registry=http://registry.npm.taobao.org`)
4. Open service `npm run dev`
5. See the example(usually is `http://127.0.0.1/examples/test.html`) in your browser

## Installation
```bash
npm i -S @livelybone/copy
```

## Global name
`Copy`

## Interface
See in [index.d.ts](./index.d.ts)

## Import
```js
import {
  copyDom,
  copyText,
  objectSimpleCopy,
  objectDeepCopy,
  objectDeepMerge,
  isCircularStructure,
} from '@livelybone/copy';
```

Use in html, see what your can use in [CDN: unpkg](https://unpkg.com/@livelybone/copy/lib/umd/)
```html
<-- use what you want -->
<script src="https://unpkg.com/@livelybone/copy/lib/umd/<--module-->.js"></script>
```
