# Jest前端测试框架

![](https://user-gold-cdn.xitu.io/2018/6/19/16415de723a8d411?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

## 前言

测试是整个项目保障最重要的一环，关系到最终软件的产出质量， 测试对后端来说相对比较熟悉，包括 接口测试，单元测试，性能测试，流量压测 等。但对于前端来说相对比较陌生，由于前端偏向于 GUI 软件性质，同时国内快速的业务迭代节奏，前端做自动化测试的投入产出比不高。

### Jest测试环境源码地址

> 源码地址：[https://github.com/dkypooh/front-end-develop-demo/tree/master/base/jest](https://github.com/dkypooh/front-end-develop-demo/tree/master/base/jest)

[知乎讨论 - TDD（测试驱动开发）是否已死？](https://www.zhihu.com/question/37623307)

```
自动化的收益 = 迭代次数 * 全手动执行成本 - 首次自动化成本 - 维护次数 * 维护成本

```

**解释：** 计算公式可以看出来首次投入的成本远远小于首次收益，但是随着项目迭代，收益会越来越明显。

**作者认为：** 对于前端是否适合做自动化测试，不能一棒子肯定或者否定，需要辩证根据不同的应用场景，项目重要程度（资金相关应用）来判断。下面列举了一些场景

*   **数据层SDK：** 不涉及UI表现，需要做单元测试，接口覆盖率测试等，它是提供服务给UI层，还需要考虑业务接入版本管理问题。 它的投入产出比远远超出预期。
*   **资损类型项目：** 对于资金相关的项目，需要重点保障，接口或者UI的改变都可能导致项目严重故障。它的投入产出比也远远超出预期。
*   **其他非核心保障项目：** 量力而行，不要为了 `TDD` 而 `TDD`

## Jest前端测试框架

Jest 是 Facebook 出品的一个测试框架，相对其他测试框架，最大的特点就是内置了常用的测试工具，比如 `自带断言`、`测试覆盖率工具`，`UI测试工具`，`Mock能力` 等，同时可以集成很多插件，与主流的软件库配合测试，比如：`Typescript`, `React`, `Vue`等， 真正实现了开箱即用。

### 基本配置

```
$ npm install --save-dev jest

```

创建一个 **sum.js** 文件

```
function sum(a, b) {
  return a + b;
}
module.exports = sum;

```

创建一个 **sum.jest.js** 文件

```
const sum = require('./sum');

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});

```

在`package.json`创建 `NPM Scripts`

```
{
  "scripts": {
    "test": "jest"
  }
}

```

运行 `npm run test` 查看结果

```
PASS  ./sum.test.js
✓ adds 1 + 2 to equal 3 (5ms)

```

### 配置文件

初始化生成 `jest.config.js` 文件，可以选择 `node` 和 `jsdom` 两种环境，暂时选择 `node` 环境，之后根据项目需求配置 `jest.config.js` 文件

```
$ npx jest --init
## 执行jest测试
$ npx jest -c jest.config.js --colors

```

### Jest全局变量及生命周期

在您的测试文件，Jest 将这些方法和对象放入全局环境。你不必导入即可使用它们。

![](https://user-gold-cdn.xitu.io/2019/2/13/168e27212a1b4b07?w=1767&h=303&f=png&s=43900)

#### afterAll 测试用例

以 `afterAll` 测试用例为例，其他生命周期也是一样。 解释下面用例：创建全局数据库，查询事物，等所有调用结束后关闭数据库。

```
const globalDatabase = makeGlobalDatabase();

function cleanUpDatabase(db) {
  db.cleanUp();
}

afterAll(() => {
  cleanUpDatabase(globalDatabase);
});

test('can find things', () => {
  return globalDatabase.find('thing', {}, results => {
    expect(results.length).toBeGreaterThan(0);
  });
});

```

### Typescript 单元接口测试

Typescript 由于强类型检查，代码提示等优秀的特性，越来越成为主流开发语言。Jest 也很好的支持了 Typescript 语法。Typescript 在数据 SDK 接口模块开发中发挥了重要角色，考虑到之后的维护性和扩展性，对于 SDK 提供基础能力模块必须要用 Typescript 开发，同时配合 Jest 做单元测试和覆盖率测试，到达事半功倍的效果。

参考 [前端高阶能力 - 通用SDK设计 案例](https://github.com/dkypooh/front-end-develop-demo/tree/master/senior/sdk)

#### 搭建Typescript测试环境

安装 `typescript`, `@types/jest`, `jest`, `ts-jest` 依赖。

详细配置参考 [Using Jest with TypeScript](https://basarat.gitbooks.io/typescript/docs/testing/jest.html)

```
{
    "devDependencies": {
        "typescript": "^3.3.1",
        "@types/jest": "^24.0.0",
        "jest": "^24.1.0",
        "ts-jest": "^23.10.5"
    }  
}

```

#### 配置 jest.config.js

使用 `ts-jest` 插件进行 `.ts` 的语法转化。

```
module.exports = {
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(js?|ts?)$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
}

```

#### SDK 测试用例

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

  it('add middleware module', (done) => {
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

### React 测试

对于核心资损业务，不管是 接口层 SDK 还是 UI层 改动都会存在风险。Jest 也提供了 React UI 测试能力。同时配合 enzyme 断言和控制 UI 组件渲染。

[enzyme](https://airbnb.io/enzyme/docs/guides/jest.html) 是 Airbnb开源的 React 测试类库， 提供了一套简洁强大的 API，并通过 jQuery 风格的方式进行DOM 处理。

> 源码参考地址： https://github.com/dkypooh/front-end-develop-demo/tree/master/base/jest

#### 测试实例

`CheckboxWithLabel-test.js` 测试例子， `enzyme shallow` 方法渲染 `DOM` 元素，

```
import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({adapter: new Adapter()}); // 设置适配器

import CheckboxWithLabel from '../src/components/CheckboxWithLabel';

it('CheckboxWithLabel changes the text after click', () => {
  // Render a checkbox with label in the document
  const checkbox = shallow(<CheckboxWithLabel labelOn="On" labelOff="Off" />);

  expect(checkbox.text()).toEqual('Off');

  checkbox.find('input').simulate('change');

  expect(checkbox.text()).toEqual('On');
});

```

### 快照

每当你想要确保你的UI不会有意外的改变，快照测试是非常有用的工具。

一个典型的移动app快照测试案例过程是，先渲染UI组件，然后截图，最后和独立于测试存储的参考图像进行比较。

上文提到的 **重点资损项目** 可以监测UI改动差异，是否符合预期

> 源码参考地址： https://github.com/dkypooh/front-end-develop-demo/blob/master/base/jest/\_\_test\_\_/link.test.js

#### 测试用例

```
it('renders correctly', () => {
  const tree = renderer
    .create(<Link page="http://www.facebook.com">Facebook</Link>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

```

修改链接 `facebook` 为 `taobao`, 运行 `npm run test`。运行结果如下：

```
- Snapshot
+ Received

  <a
    className="normal"
-   href="http://www.facebook.com"
+   href="http://www.taobao.com"
    onMouseEnter={[Function]}
    onMouseLeave={[Function]}
  >
    Facebook
  </a>

```

## Code Review

![](https://user-gold-cdn.xitu.io/2019/2/13/168e2ab316ec54c3?w=800&h=349&f=png&s=88242)

`Code Review` 是阿里巴巴最为看重保证质量的环节。 尤其在双十一期间上线需求都需要多人多次 `Code Review` 保证上线质量。

`Code Review` 的好处显然易见，一方面，方面能够在及早发现代码中潜在的bug，统一团队的代码规范。 另一方面, `Review` 过程也是相互学习的过程, 同时可以对项目做好 `Backup` 需求。

`Code Review` 形式可以灵活多变，前期需要有人审核你的代码，同时优化你代码。 本章提出来 **希望大家重视 `Code Review` 过程， 对保证项目质量非常重要**

## 结语

作者认为测试是保证项目质量的最重要的环节。由于前端的特性，我们需要根据当时的场景和项目情况来合理安排测试，力争投入产出比最高。

通过本章的学习，我们了解 `Jest` 前端测试框架的能力，以及 `Jest` 全局变量和生命周期，`Snapshot` 快照的能力引入有效的减少UI改变带来的风险，最后，`Code Review` 是代码质量最重要的保障措施。

## 思考题

Q: 使用上文Jest项目，实现一个UI快照用例？ 参考地址：[https://jestjs.io/docs/zh-Hans/snapshot-testing](https://jestjs.io/docs/zh-Hans/snapshot-testing)

## 参考文档

*   [知乎讨论-如何进行前端自动化测试](https://www.zhihu.com/question/29922082)
*   [Using Jest with TypeScript](https://basarat.gitbooks.io/typescript/docs/testing/jest.html)
*   [Jest 测试中文文档](https://deltice.github.io/jest/docs/zh-Hans/getting-started.html)
*   [如何有效地做 Code Review](https://zhuanlan.zhihu.com/p/19967954)