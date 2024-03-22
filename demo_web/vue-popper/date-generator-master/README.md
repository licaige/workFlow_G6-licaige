# @livelybone/date-generator
[![NPM Version](http://img.shields.io/npm/v/@livelybone/date-generator.svg?style=flat-square)](https://www.npmjs.com/package/@livelybone/date-generator)
[![Download Month](http://img.shields.io/npm/dm/@livelybone/date-generator.svg?style=flat-square)](https://www.npmjs.com/package/@livelybone/date-generator)
![gzip with dependencies: kb](https://img.shields.io/badge/gzip--with--dependencies-kb-brightgreen.svg "gzip with dependencies: kb")
![typescript](https://img.shields.io/badge/typescript-supported-blue.svg "typescript")
![pkg.module](https://img.shields.io/badge/pkg.module-supported-blue.svg "pkg.module")

> `pkg.module supported`, which means that you can apply tree-shaking in you project

[中文文档](./README-CN.md)

A module that generates calendar, which includes years, months, dates, hours, minutes, seconds

## repository
https://github.com/livelybone/date-generator.git

## Demo
https://livelybone.github.io/tool/date-generator/

## Run Example
Your can see the usage by run the example of the module, here is the step:

1. Clone the library `git clone https://github.com/livelybone/date-generator.git`
2. Go to the directory `cd your-module-directory`
3. Install npm dependencies `npm i`(use taobao registry: `npm i --registry=http://registry.npm.taobao.org`)
4. Open service `npm run dev`
5. See the example(usually is `http://127.0.0.1:3000/examples/test.html`) in your browser

## Installation
```bash
npm i -S @livelybone/date-generator
```

## Global name - The variable the module exported in `umd` bundle
`DateGenerator`

## Interface
See what method or params you can use in [index.d.ts](./index.d.ts)

## Usage
```js
import * as DateGenerator from '@livelybone/date-generator'
```

Use in html, see what your can use in [CDN: unpkg](https://unpkg.com/@livelybone/date-generator/lib/umd/)
```html
<-- use what you want -->
<script src="https://unpkg.com/@livelybone/date-generator/lib/umd/<--module-->.js"></script>
```
