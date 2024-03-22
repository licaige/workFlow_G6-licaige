# @livelybone/mouse-events
[![NPM Version](http://img.shields.io/npm/v/@livelybone/mouse-events.svg?style=flat-square)](https://www.npmjs.com/package/@livelybone/mouse-events)
[![Download Month](http://img.shields.io/npm/dm/@livelybone/mouse-events.svg?style=flat-square)](https://www.npmjs.com/package/@livelybone/mouse-events)
![gzip with dependencies: kb](https://img.shields.io/badge/gzip--with--dependencies-kb-brightgreen.svg "gzip with dependencies: kb")
![typescript](https://img.shields.io/badge/typescript-supported-blue.svg "typescript")
![pkg.module](https://img.shields.io/badge/pkg.module-supported-blue.svg "pkg.module")

> `pkg.module supported`, which means that you can apply tree-shaking in you project

[中文文档](./README-CN.md)

Some complex mouse events, such as dragMove event with deltaX/deltaY relative to mousedown/touchstart, mouse wheel with good compatibility ...

## repository
https://github.com/livelybone/mouse-events.git

## Demo
https://github.com/livelybone/mouse-events#readme

## Run Example
you can see the usage by run the example of the module, here is the step:

1. Clone the library `git clone https://github.com/livelybone/mouse-events.git`
2. Go to the directory `cd your-module-directory`
3. Install npm dependencies `npm i`(use taobao registry: `npm i --registry=http://registry.npm.taobao.org`)
4. Open service `npm run dev`
5. See the example(usually is `http://127.0.0.1:3000/examples/test.html`) in your browser

## Installation
```bash
npm i -S @livelybone/mouse-events
```

## Global name - The variable the module exported in `umd` bundle
`MouseEvents`

## Interface
See what method or params you can use in [index.d.ts](./index.d.ts)

## Usage
```typescript
import { DragMove, Utils, MouseWheel, DragMoveEvent } from '@livelybone/mouse-events'

const el = document.getElementById('el')
let removeListener

removeListener = MouseWheel.bind(el, (ev: MouseWheel.CustomWheelEvent) => {
  // ...
})
removeListener()

removeListener = DragMove.bind(el, (ev: DragMoveEvent) => {
  // ...
})
removeListener()

console.log(Utils.$isMobile)
removeListener = Utils.$addListener(el, 'scroll', ev => {
  // ...
})
removeListener()
```

## CDN
Use in html, see what you can use in [CDN: unpkg](https://unpkg.com/@livelybone/mouse-events/lib/umd/)
```html
<-- use what you want -->
<script src="https://unpkg.com/@livelybone/mouse-events/lib/umd/<--module-->.js"></script>
```

Or，see what you can use in [CDN: jsdelivr](https://cdn.jsdelivr.net/npm/@livelybone/mouse-events/lib/umd/)
```html
<script src="https://cdn.jsdelivr.net/npm/@livelybone/mouse-events/lib/umd/<--module-->.js"></script>
```
