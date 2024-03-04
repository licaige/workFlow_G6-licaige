# 通用SDK设计

![](https://user-gold-cdn.xitu.io/2019/2/13/168e516d0b241ba6?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

## 前言

上一章节我们学习设计模式，了解前端应用最广泛的几个设计模式，订阅发布模式、单例模式、工厂模式等。 本章节我们会通过设计一个通用 SDK 模型来学习应用这些设计模式，和读者一起搭建 SDK 的 TypeScript 开发环境，一起探讨如何设计一个通用的 SDK 原型。

### 通用SDK原型代码

> 源码地址：[https://github.com/dkypooh/front-end-develop-demo/tree/master/senior/sdk](https://github.com/dkypooh/front-end-develop-demo/tree/master/senior/sdk)

## SDK设计指南

软件开发工具包（缩写：SDK、外语全称：Software Development Kit）一般都是一些软件工程师为特定的软件包、软件框架、硬件平台、操作系统等建立应用软件时的开发工具的集合。

SDK 是根据业务需求来设计的，一方面提供各种业务需要的 API 接口，另一方面 SDK 的设计需要具备扩展性和兼容性。

作者的理解一个好的 SDK 应该具备小而美且五脏俱全的特性

### API设计准则

API 是模块或者子系统之间交互的接口定义。好的系统架构离不开好的 API 设计。好的 API 设计有如下准则：

*   **提供清晰的思维模型：** API 是用于程序之间的交互，但是一个 API 如何被使用，以及 API 本身如何被维护，是依赖于维护者和使用者能够对该API有清晰的、一致的认识。
*   **少即是多：** 系统随着需求的增加不断的演化，SDK 承载的逻辑会越来越多，为了减少使用者的使用成本，SDK 提供的 API 应该是必须且少的。
*   **单一职责：** 接口设计尽量要做到 单一职责,最细粒度化，每个接口职责是明确的。
*   **插件化：** 随着系统业务需求增加，带来了越来越多的不确定性，基于最核心的 SDK 模块去扩展，不同业务可以去扩展不同需求。

## Typescript 通用 SDK 开发环境搭建

npm 包环境安装如下：typescript，jest 和 eslint。

```
## 安装typescript支持
$npm i typescript -D

## 安装jest 支持
$ npm i jest @types/jest ts-jest -D

## 安装tslint支持
$ npm i tslint tslint-config-standard -D


```

### 配置 package 文件

配置 package 文件的 scripts 脚本如下：

1.  build: 通过 tsc 编译 ts 成 js 文件。
2.  test: 运行 jest 测试环境。具体 TS 的 Jest 测试环境说明参考 \[前端基础能力 - Jest前端测试框架\]。
3.  fix: 运行 tsconfig 语法检查，同时修复语法问题。

```
{
  "name": "tbms-sdk",
  "version": "1.0.0",
  "description": "sdk, middleware",
  "main": "build/index.js",
  "scripts": {
    "build": "npx tsc --build tsconfig.json -w",
    "test": "npx jest -c jest.config.js --colors",
    "fix": "tslint --fix src/*.ts -t verbose",
    "tslint": "tslint -c tslint.json src/*.ts"
  },
  "keywords": [
    "sdk",
    "middleware"
  ],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "typescript": "^3.3.1",
    "@types/jest": "^24.0.0",
    "jest": "^24.1.0",
    "ts-jest": "^23.10.5",
    "tslint": "^5.12.1",
    "tslint-config-standard": "^8.0.1"
  }
}


```

### Yoeman SDK 脚手架环境

> Typescript + Jest SDK 脚手架: [https://github.com/ge-tbms/generator-typescript-jest-sdk](https://github.com/ge-tbms/generator-typescript-jest-sdk)

使用 `generator-typescript-jest-sdk`脚手架工具，可以如下操作：

```
## 安装yo 以及 generator
npm install -g yo
npm install -g generator-typescript-jest-sdk

## 运行 generator-typescript-jest-sdk 生成目录
yo typescript-jest-sdk


```

## Typescript 通用SDK目录结构

```
├── build
├── jest.config.js
├── package.json
├── src
│   ├── event.ts
│   ├── global.ts
│   ├── index.ts
│   ├── middleware.ts
│   └── util.ts
├── test
│   └── sdk.test.ts
├── tsconfig.json
└── tslint.json


```

文件结构解释如下，详情可见：

*   **event模块:** EventEmitter类，用于实现sub/pub模式， 代码可以参考上一章节 \[设计模式 - EventEmitter实现\]
*   **middleware模块:** 通过 Promise 队列实现一个中间件模块，同时维护一个 middleware 数组。
*   **util.ts:** 集成了一些通用函数，例如判断数据类型、获取 URL 参数、甚至动态增加 CSS 样式

## 通用 SDK 能力

一个具备可扩展以及兼容性的SDK，最基本应该两个基础能力：事件订阅发布 和 中间件模块 能力。在此基础上再根据业务需求扩展合理的API接口。

*   **事件发布监听能力：** 继承上一章实现的 `EventEmitter` 基类，实现子类实例的 `emit` 和 `on` 方法。
*   **中间件模块：** 下面重点分析中间件模块的实现，和 项目最佳实践- 数据SDK开发实现 中间件模块有所差别。 这次实现是通过 `Promise Queue`链表，实现顺序执行中间件。项目最佳实践- 数据SDK开发实现的中间件模块可以处理异步请求，洋葱圈模型。

### promiseMiddleware 代码实现

> 源码参考文件地址: [https://github.com/dkypooh/front-end-develop-demo/blob/master/senior/sdk/src/util.ts#L40](https://github.com/dkypooh/front-end-develop-demo/blob/master/senior/sdk/src/util.ts#L40)

`promiseMiddleware` 作为 `src/util.ts` 模块的一个函数方法提供，下文会使用到。

```
const promiseMiddleware = (middlewares: any[], ctx: any) => {
  let promise = Promise.resolve(null);
  let next;

  // 1. 通过bind把执行上下文对象，绑定到中间件第一个参数
  middlewares.forEach((fn, i) => {
    middlewares[i] = fn.bind(null, ctx);
  });

  // 2. 通过while循环执行promise实例
  while ((next = middlewares.shift())) {
    promise = promise.then(next);
  }

  // 3. 最终返回一个promise实例结果
  return promise.then(() => {
    return ctx;
  });
}


```

代码详解：此段代码执行思想比较简单，但是开发者很难想到通过 promise 链表来实现中间件模块，提供一种可借鉴比较好的思路。

### middleware 中间件类代码实现

此源代码文件 `src/middleware`， 通过 `util` 实现的 `promiseMiddleware` 方法，同时继承 `EventEmitter` 事件类。

> 源码参考地址: [https://github.com/dkypooh/front-end-develop-demo/blob/master/senior/sdk/src/middleware.ts](https://github.com/dkypooh/front-end-develop-demo/blob/master/senior/sdk/src/middleware.ts)

```
import _ from './util';
import EventEmitter from './event';

export default class extends EventEmitter{
  public middlewares:any[] = [];
  public ctx = {
    message: {},
    conversation: {}
  }
  // 1. 构造器函数，初始化添加 middlewares
  constructor(middlewares: any[]) {
    super();
    this.middlewares = middlewares;
  }

  // 2. 通过批量添加中间件接口 
  useBatch(steps: any[]) {
    if (_.isArray(steps)) {
      this.middlewares = this.middlewares.concat(steps);
    } else {
      throw TypeError('useBatch must be arrary!!!')
    }
  }

  // 3. 核心实现，每个Action都需要进过Dispatch进行触发
  dispatch(msg: any, conversation: any) {
    // 3.1 使用Object.create 创建新的 middlewares 和 ctx对象，防止对象引用
    let steps = Object.create(this.middlewares);
    let ctx = Object.create(this.ctx);
    // 3.2 赋值 会话和消息 对象
    ctx.conversation = conversation;
    ctx.message = msg;
    // 3.3 执行中间件模块，同时返回一个 promise 实例
    return _.promiseMiddleware(steps, ctx);
  }
}


```

代码详解：

1.  构造器函数，初始化添加 `middlewares` 模块
2.  使用 `useBatch` 接口，批量添加中间件接口
3.  核心实现 `dispatch` 函数，每个 `Action` 都需要进过 `dispatch`进行触发, 主要如下三件事情：
    *   使用 `Object.create` 创建新的 `middlewares` 和 `ctx` 对象，防止对象引用
    *   给执行上下文赋值 会话和消息 对象
    *   最终 执行中间件模块，同时返回一个 `promise` 实例

## 通用SDK实现

通用SDK的实现相对比较简单，只需要集成 `Middlware` 类，它就具备两个通用能力：**事件订阅发布** 和 **中间件** 能力。SDK的职责是根据业务需求扩展标准API接口。

```
import MiddleWare from './middleware';

export default class extends MiddleWare {
  constructor(middlewares: any[]) {
    super(middlewares);
  }
}


```

## 通用SDK的单元测试

通用SDK就具备两个通用能力：**事件订阅发布** 和 **中间件** 能力。为了确保通用SDK可用，我们在项目中运行 `npm run test` 对代码进行单元测试。

> 单元测试源码：[https://github.com/dkypooh/front-end-develop-demo/blob/master/senior/sdk/test/sdk.test.ts](https://github.com/dkypooh/front-end-develop-demo/blob/master/senior/sdk/test/sdk.test.ts)

```
import SDK from '../src/index'

describe('SDK Test', () => {
  const sdk = new SDK([]);
  it('subscribe and publish', (done) => {
    sdk.on('publish', (obj) => {
      expect(obj).toEqual({cmd: 'publish'});
      done();
    })
    sdk.emit('publish', {cmd: 'publish'});
  });

  it('add middleware modules', (done) => {
    sdk.useBatch([(ctx: any) => {
      ctx.message.content = 'test';
    }, (ctx: any) => {
      ctx.conversation.lastMsg = 'test';
    }])
    sdk.dispatch({type: 'text'}, {id: 'yyy'}).then((ctx) => {
      expect(ctx.message).toEqual({ type: 'text', content: 'test' })
      expect(ctx.conversation).toEqual({ id: 'yyy', lastMsg: 'test' })
      done();
    })
  })
})


```

代码详解：两段测试代码，分别测试 事件订阅发布 和 中间件 能力。

*   事件订阅发布：`emit` 发布一个 `publish` 事件，同时 `on` 一个 `publish` 事件，同时传递数据 `{cmd: 'publish'}`
*   中间件： 使用 `useBatch` 添加中间件两个中间件模块，分别修改 `message` 和 `conversation` 的内容。检查通过 `dispatch` 是否达到预期。

### 测试结果

```
 PASS  test/sdk.test.ts
  SDK Test
    ✓ subscribe and publish (8ms)
    ✓ add middleware module (3ms)

Test Suites: 1 passed, 1 total
Tests:       2 passed, 2 total
Snapshots:   0 total
Time:        1.421s


```

## 结语

本章最后通过Jest的单元测试，测试了本章实现的通用SDK的两个能力：**事件订阅发布** 和 **中间件**，单元测试通过保证了SDK的可靠性和稳定性。

最后，作者一直认为SDK是根据业务需求来设计的，SDK的设计一方面提供各种业务需要的API接口，另一方面SDK的设计需要具备扩展性和兼容性。 一个好的SDK它应该是 **麻雀虽小，但五脏俱全**。

## 参考文献

*   [Promise Deffered](https://link.juejin.im/?target=https%3A%2F%2Fwww.kancloud.cn%2Fkancloud%2Fpromises-book%2F44233)
*   [SDK的开发与设计](https://link.juejin.im/?target=https%3A%2F%2Fwww.jianshu.com%2Fp%2F5cf360fc9957)
*   [redux middleware 详解](https://link.juejin.im/?target=https%3A%2F%2Fzhuanlan.zhihu.com%2Fp%2F20597452)