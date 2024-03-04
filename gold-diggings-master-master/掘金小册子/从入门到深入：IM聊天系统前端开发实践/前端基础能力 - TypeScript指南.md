# TypeScript 指南

![](https://user-gold-cdn.xitu.io/2019/2/13/168e2d04831a0cc0?w=950&h=300&f=png&s=12733)

## 前言

TypeScript 是 Javascript 的超集，可以编译成各个标准的 JS。这一章一起来学习重温下 Typescript 项目开发中常用的核心概念，最后和大家一起实践一个基于 Promise 实现的中间件函数。

### Typescript特点及优势

1.  **静态输入：** 静态类型检查，可以在开发人员编写脚本时检测错误。
2.  **可读性和易维护性：** 从JS动态弱类型检查到TS强类型检查，增加了静态类型、类、模块、接口和类型注解。 接口和类型提示使代码更具可读性。同时编译检查让项目更具易维护性。
3.  **更好的协作：** 类型安全是一种在编码期间检测错误的功能，而不是在编译项目时检测错误。这为开发团队创建了一个更高效的编码和调试过程。

**关键字：类型检查，确定性输入出书，JS超集，可读性，易维护性。**

### 通过本章读者可以学习了解到什么？

1.  TS 的项目开发中有哪些核心语法，语法规范是如何的。
2.  TS 的适用场景分析，如何将 TS 编译成指定 JS 标准版本。
3.  TS 如何使用第三方模块，同时如何发布 TS 模块。
4.  越来越多的项目在往 TS 迁移，如何把老的项目往 TS 迁移。
5.  用 TS 封装 Promise 实现一个中间件函数。

### Typescript 开发环境源码

> [https://github.com/dkypooh/front-end-develop-demo/tree/master/base/typescript](https://github.com/dkypooh/front-end-develop-demo/tree/master/base/typescript)

### Typescript 使用场景

由于 TS 的类型检查，确定性输入输出。在编写一些不涉及UI， 例如工具类函数，基础 SDK 和数据接口 等方面有很强的优势，同时配合单元测试来保证系统开发的健壮性。

推荐：可以参考本小册 《通用SDK设计》章节

> 源码地址：[https://github.com/dkypooh/front-end-develop-demo/tree/master/senior/sdk](https://github.com/dkypooh/front-end-develop-demo/tree/master/senior/sdk)

## Typescript环境配置

搭建 Typescript 开发环境，环境配置，命令行使用以及编译成不同 JS 标准。

### Typescript 安装

```
npm install typescript -g       // 安装ts编译器
tsc helloworld.ts               // 编译ts文件，默认ES3标准

```

### 命令行说明

![image.png](https://user-gold-cdn.xitu.io/2019/1/23/168766da1d794eed?w=1314&h=738&f=png&s=143842)

```
### 初始化tsconfig配置
tsc --init

### 基础命令
tsc index.ts

### 编译JS标准版本
tsc index.ts -t es6

### 编译适配库
tsc index.ts --lib es6

### 编译生成声明文件
tsc index.ts -d -t es6


```

### tsconfig 配置

如果一个目录下存在一个 `tsconfig.json` 文件，那么它意味着这个目录是 TypeScript 项目的根目录。`tsconfig.json` 文件中指定了用来编译这个项目的根文件和编译选项。

#### 开箱即用的 tsconfig 配置

```
{
  "compilerOptions": {
    "target": "esnext",     /* 指定编译JS标准 'ES3' (default), 'ES5', 'ES2015', 'ES2016', 'ES2017','ES2018' or 'ESNEXT'. */
    "module": "commonjs",   /* 编译模式,  'none', 'commonjs', 'amd', 'system', 'commonjs', 'es2015', or 'ESNext'. */
    "outDir": "build",      /* 编译输出目录 */
    "declaration": true,    /* 创建声明文件 `.d.ts` */
  },
  "include": [
    "src/**/*"
  ],
  "exclude": [
    "node_modules",
    "**/*.spec.ts",
    "**/*.spec.ts"
  ]
}

```

## Typescript 基础核心知识

### 变量语法

变量声明语法有四部分组成：变量，分隔符( `:` ), 类型 (`number`, `string`) 和 值（ `value` ）。

![image.png](https://user-gold-cdn.xitu.io/2019/1/23/168766da1d0ee64a?w=1132&h=374&f=png&s=42095)

### 变量语法实例

```
let isDone: boolean = false;                            // 布尔类型
let decLiteral: number = 6;                             // 数字类型
let sentence: string = 'Hello, my name is ${ name }.';  // 字符类型
let list: number[] = [1, 2, 3];                         // 数组类型
let list: Array<number> = [1, 2, 3];                    // 数组泛型
let x: [string, number] = ['1', 2];                     // 元组Tuple

```

### 函数声明语法

标准函数声明需要定义参数类型和返回类型，参数和返回类型可以是 基础数据类型 和 自定义数据类型。

函数声明语法也有四部分组成：函数名，变量，变量类型 (`基础类型(String)` 和 `自定义类型(UserInfoObject)` ) 和 返回类型 (`void`)

![image.png](https://user-gold-cdn.xitu.io/2019/1/23/168766da1d190ab3?w=1154&h=334&f=png&s=49141)

### 函数声明实例

```
interface GreetingSettings {
  greeting: string;
  duration?: number;
  color?: string;
}

declare function greet(setting: GreetingSettings): void;
// 双箭头函数说明
const testAbc = (abc: funAbcSign):string =>  {
  return funcAbcSign.abc;
}

```

### 基础数据类型

数据类型主要有：string、boolean、number、Array、void、null、undefined、Tuple、enum、object、never、any。

**Tuple元组类型：** 元组类型允许表示一个已知元素数量和类型的数组，各元素的类型不必相同。

**any类型：** 不清楚类型的变量指定一个类型，指定任意类型。

```
// 枚举类型
enum Color {Red = 1, Green = 2, Blue = 4}	
let c: Color = Color.Green;			

// tuple类型
let x: [string, number];    // Declare a tuple type
x = ['hello', 10];          // OK Initialize it
x = [10, 'hello'];          // Error Initialize it incorrectly

// 空类型
let unusable: void = undefined;
// any类型
let list: any[] = [1, true, "free"];
list[1] = 100;

```

### 接口

TypeScript 的核心原则之一是，对值所具有的结构进行类型检查, 它有时被称做 “鸭式辨型法” 或 “结构性子类型化” 。

在 TypeScript 里，接口的作用就是为这些类型命名和为你的代码或第三方代码定义契约，类可以定义为接口。

```
// 内联接口
function printUserInfo(user: {age: number, name: string, sex?: string}): void {
	console.log('user', user);
}

// 外联接口
interface UserInfoObject {
  age: number,
  name: string,
  sex?: string
}

function printUserInfo(user: UserInfoObject): void {
	console.log('user', user);
}


```

### 泛型的使用

软件工程中，我们不仅要创建一致的定义良好的 API，同时也要考虑可重用性。 组件不仅能够支持当前的数据类型，同时也能支持未来的数据类型，这在创建大型系统时为你提供了十分灵活的功能。

```
// 参数和返回值类型一样，但不确定
function getUser<T>(user: T):T {
	return user;
}

// 泛型接口
interface getUserFn {
	<T>(arg: T): T;
}

const getMyUser:getUserFn = getUser
// const getMyUser:<T>(arg: T) => T = getUser

```

## Typescript 高级核心知识

### 声明文件

TypeScript 的声明文件是一个以 `.d.ts` 为后缀的 TypeScript 代码文件，但它的作用是描述一个 JavaScript 模块（广义上的）内所有导出接口的类型信息。

TypeScript 的声明文件有两种写法：一种叫做 全局类型声明(Global Type Definition)，另一个则是叫做 模块导出声明(External Module Definition)。

```
// 模块导出声明 global.ts
export declare interface funcAbcSign {
    (abc: string): string
}

export declare let abc: funcAbcSign;

// index.ts 使用 global.ts外部申明
import { funAbcSign } from './global.ts';
const testAbc = (abc: funAbcSign):string =>  {
  return funcAbcSign.abc;
}


```

### 设置全局变量及函数

TS 是强类型检查，对于第三方全局变量（`jquery`）或者函数需要声明。

```
// 声明变量
declare var jquery: any
declare const age: number

// 声明函数
declare function greet(greeting: string): void;

// 对象组合声明
declare namespace myLib {
    function makeGreeting(s: string): string;
    let numberOfGreetings: number;
}

```

#### TS模块搜索 [http://microsoft.github.io/TypeSearch/](http://microsoft.github.io/TypeSearch/)

#### NPM的TS组织 [https://www.npmjs.com/~types](https://www.npmjs.com/~types)

### 第三方模块使用

如果使用第三方模块，首先需要声明第三方模块。 编译器会去查找相应路径下的 `.ts` ，`.tsx` 再或者`.d.ts`

```
// module.ts
declare module 'md5'

// index.ts
import md5 from 'md5';

```

### 发布TS模块

发布TS模块需要配置 `tsconfig.json` 的 `declaration` 为 `true`

```
## 使用第三方包，创建 module.d.ts
declare module 'md5'

## 分享TS包
tsc --build tsconfig.json       // tsconfig.json 配置 "declaration": true,

```

### 使用Mixins继承多个类的方法 \[不常用\]

除了传统的面向对象继承方式，还流行一种通过可重用组件创建类的方式，就是联合另一个简单类的代码, 在某些场景下我们需要继承多个类的方法（能力）。

实例说明： 作为一个全栈开发工程师，我们既需要前端的能力，有需要服务端的能力。

```
function applyMixins(derivedCtor: any, baseCtors: any[]) {
  baseCtors.forEach(baseCtor => {
      Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
          derivedCtor.prototype[name] = baseCtor.prototype[name];
      });
  });
}

class FrontEndEngineer {
	html: boolean
  css: boolean
  isKnowWeex (level:number):boolean {
    return level > 8
  }
}

class ServerEngineer {
	sql: boolean
  isKnowEggjs (level:number):boolean {
    return level > 8
  }
}

class Engineer implements FrontEndEngineer, ServerEngineer {
  html: boolean = true
  sql: boolean = true
  css: boolean = true
  isKnowWeex: (level: number) => boolean
  isKnowEggjs: (level: number) => boolean
}


applyMixins(Engineer, [FrontEndEngineer, ServerEngineer]);
const my = new Engineer();

console.log('my kills:', my.css, my.html, my.sql);
console.log('weex level:', my.isKnowWeex(9));
console.log('eggjs level:', my.isKnowEggjs(6));

```

## 实践Promise 中间件函数

**面试专用：** 一起通过 Typescript 封装 Promise 来实现一个中间件函数。

中间件函数模块使用场景非常广泛，后面项目最佳实践的组件中间件就会用到，理解设计的巧妙，会使代码的能力也会有很大提升。

> 源码地址：[https://github.com/dkypooh/front-end-develop-demo/blob/master/senior/sdk/src/util.ts](https://github.com/dkypooh/front-end-develop-demo/blob/master/senior/sdk/src/util.ts)

### middleware代码

通过 Promise 队列执行每个回调函数。 Typescript 语法定义了函数声明，变量类型和返回值类型。

```
// 1. 形成Promise队列返回
export const promiseMiddleware = (list: ((...args: any[]) => any)[]):Promise<any> => {
  // 2. 返回resolve对象,初始化上下文
  let resolved = Promise.resolve({});   
  // 3. 遍历队列，返回promise
  list.forEach((fn: any, index: number) => {
    if (typeof fn !== 'function') throw new TypeError('Promise cell must be function');
    resolved = resolved.then((context: object) => fn(context)) // 复制新的promise结果
  })
  return resolved; 
}

```

### Jest测试代码

```
test('promise middleware test', (done) => {
  const result = promiseMiddlware([(context) => {
    context.name = 'rose'
    return context
  }, (context) => {
    context.age = '12';
    return context;
  }])

  result.then((context) => {
    expect(context).toEqual({name: 'rose', age: '12'})
    done();
  })
})

```

### 测试结果

```
 PASS  test/promise.test.ts
  SDK Test
    ✓ promise middleware test(8ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        1.1s

```

## 结语

通过本章学习我们知道 Typescript 在项目开发中的核心语法 和 Typescript 的适用场景。

最后用 Promise 封装了中间件函数，后面关于数据层SDK的项目都会采用 Typescript，同时使用 Jest 做单元测试。

如果需要深入了解还是要 翻阅官方文档 [Typescript官方文档](https://www.typescriptlang.org/)。

## 思考题

Q: 如何使用第三方模块？

Q: 如何让原先的NPM包可以被TS识别？

## 参考资料

*   [Typescript 中文指南](https://www.tslang.cn/docs/home.html)
*   [TypeScript 实践](https://juejin.im/post/5a9c004a6fb9a028b92c9e91)
*   [你不知道的前端SDK开发技巧](https://juejin.im/post/5a278d2a6fb9a044fd11a245)