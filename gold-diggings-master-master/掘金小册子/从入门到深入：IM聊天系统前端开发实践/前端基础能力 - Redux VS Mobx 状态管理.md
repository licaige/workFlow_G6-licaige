# Redux VS Mobx 状态管理

![](https://user-gold-cdn.xitu.io/2019/2/13/168e502325ccf242?w=640&h=264&f=png&s=20723)

## 前言

近几年前端技术发展如火如荼，前端的两大UI框架已经定型 React 和 Vue，很多系统都是由单页系统搭建，随着业务迭代开发，系统也越来越复杂，同时状态管理也变得越来越不可控，越来越复杂，这时我们需要引入状态管理工具来更好的管理系统状态，让状态从不可控变得可控。

切记不要一概而论，不是所有的系统都需要引入类似于 redux 和 mobx 的状态管理工具，这既增加了系统复杂度， 又增加的开发工作量，杀鸡用牛刀，得不偿失。 例如：一些简单的H5页面，作者认为完全没有必要，内部状态足以管理。

## Redux VS Mobx 状态管理

Mobx 和 Redux 都是 JavaScript 应用状态管理库，都适用于React，Angular，VueJs 等框架或库，而不是局限于某一特定UI库。不管是 Mobx 和 Redux 状态管理工具，都是帮助项目解决如下几个问题：

1.  `components share state` (组件之间共享状态)
2.  `state should be accessible from everywhere` (所有状态可以方便获取)
3.  `components need to mutate the state` (组件可以修改状态)
4.  `components need to mutate the state of another component` (组件可以修改其他组件的状态)

无论 Redux 还是 Mobx 状态管理库，本质还是为了解决状态管理混乱，无法有效同步的问题，状态管理是软件开发的最困难方面之一。

### Redux 优缺点

Redux 所有状态变更都需要 dispath，变得完全可控 不仅有助于状态管理，还使得实现一些高级特性变得很简单，比如无限撤销/重做和实时编辑时间旅行 (live-editing time travel)。

Redux 缺点是开发者学习成本上升，开发流程重复和复杂，往往需要些很多冗余的代码。

### Mobx 优缺点

Mobx 小巧轻便，内部实现属性 Diff 的性能优化，用户开发起来更加方便，类似于 Vue 中的响应式的原理，设置属性是可观察的，赋值属性就可以修改状态。

Mobx 缺点是状态不能回溯，Mobx 相对比较自由，是优点也是缺点，导致复杂系统应用的时候，状态还是不可控。

本章节也实现用 Redux 和 Mobx 两个状态管理实现了计数器代码，方便读者通过源码对比差异。

> redux-counter 源码：[https://github.com/dkypooh/front-end-develop-demo/tree/master/base/Redux-Counter](https://github.com/dkypooh/front-end-develop-demo/tree/master/base/Redux-Counter)

> mobx-counter 源码：[https://github.com/dkypooh/front-end-develop-demo/tree/master/base/mobx-counter](https://github.com/dkypooh/front-end-develop-demo/tree/master/base/mobx-counter)

## Redux状态管理

![](https://user-gold-cdn.xitu.io/2019/3/15/169807b65b0b902d?w=1440&h=1080&f=gif&s=2683439)

Redux 是一种 数据的管理 方式， 所有的状态都要遵循统一的流程才能更改状态。 界面操作 Action ，然后 Dispatcher 到 Store 更新状态 State，推送新状态到视图 View（重点）

> action --> dispatch --> reducer --> state

下面带着 redux-counter 源码例子讲解Redux的3个核心概念：

### 单一数据源（Store）

Redux 通过一个 JavaScript 对象管理状态，该对象称为数据存储（Store），包含应用程序的所有状态。

整个应用的 state 被储存在一棵 object-tree 中，并且这个 object-tree 只存在于唯一一个 store 中

```
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import Counter from './components/Counter';
import counter from './reducers';

// 创建一个全局store
const store = createStore(counter);

// react-redux连接器，存入store
ReactDOM.render(
  <Provider store={store}>
    <Counter />
  </Provider>,
  document.getElementById('root')
);

```

代码详解：

1.  使用 redux 的 createStore 创建一个全局 store，保存全局状态树。
2.  使组件层级中的 connect() 方法都能够获得 Redux store。正常情况下，你的根组件应该嵌套在 中才能使用 connect() 方法。

### 应用程序状态（State）不可变

确保了视图和网络请求都不能直接修改 state，相反它们只能表达想要修改的意图。因为所有的修改都被集中化处理，且严格按照一个接一个的顺序执行，因此不用担心竞态条件（race condition）的出现。

Action 就是普通对象而已，因此它们可以被日志打印、序列化、储存、后期调试或测试时回放出来。

如果想修改 State 的状态，Redux 规定了需要走统一的 Action 的 Dispatch 流程。

#### 计数器 Action 实现

```
export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';

// 返回 增加行为 类型
export const increment = (param) => {
  return {
    type: INCREMENT
  }
};

// 返回 减少行为 类型
export const decrement = (param) => {
  return {
    type: DECREMENT
  }
};


```

代码详解：Action 的职能，描述了增加/减少的行为，不改变 State 的状态。

### 使用纯函数来执行修改（Reducer）

Reducer 只是一些纯函数，它接收先前的 state 和 action，并返回新的 state。公式：

> F(State) = newState

#### 计数器 Reducer 实现

```
import { INCREMENT, DECREMENT } from '../actions';

// 初始化代码
const initialState = {
  count: 0
}

export default (state = initialState, action) => {
  // 返回纯函数
  switch (action.type) {
    case INCREMENT:
      return {
        count: state.count + 1
      }
    case DECREMENT:
      return {
        count: state.count - 1
      }
    default:
      return state;
  }
};

```

代码描述：Action 只是描述了行为，真正修改状态的是 Reducer。

### React-Redux库

React-Redux 提供 Connect 方法用于连接 React 组件与 Redux Store，Connect 是一个高阶组件， 声明如下：

> connect(\[mapStateToProps\], \[mapDispatchToProps\], \[mergeProps\],\[options\])

#### mapStateToProps

这个函数允许我们将 store 中的数据作为 props 绑定到组件上, 输入 state，并把 state 绑定到 props

> mapStateToProps(state, ownProps) : stateProps

### mapDispatchToProps

connect 的第二个参数是 mapDispatchToProps，它的功能是，将 action 作为 props 绑定到组件上，也会成为组件的 props。

```
import React, { Component } from "react";
import { connect } from 'react-redux';
import { increment, decrement } from '../actions';

class Counter extends Component {
    render() {
        return (
            <p>
                Clicked: {this.props.count} times
                <button onClick={() => { this.props.increment() }}>
                    +
                </button>
                <button onClick={() => { this.props.decrement() }}>
                    -
                </button>
            </p>
        );
    }
}

// 1. 构造 state = {count: 0} 数据模型，映射state到props
const mapStateToProps = (state) => {
    return {
        count: state.count
    };
};

// 2. 映射action到props，同时执行dispatch
const mapDispatchToProps = {increment, decrement};

// 3. connect作为高阶函数组件，内部连接redux的状态流转流程
export default connect(mapStateToProps, mapDispatchToProps)(Counter);

```

代码解析，翻阅 connect 实现源码，实现为一个高阶组件：

1.  mapStateToProps 作为 connect 的第一个参数， 构造 state = {count: 0} 数据模型，映射 state 到 props，此组件就可以直接通过属性调用。
2.  mapDispatchToProps 作为 connect 的第二个参数， 映射 action 到 props，同时执行 dispatch。
3.  connect 作为高阶函数组件，内部连接 redux 的状态流转流程

## Mobx状态管理

![](https://user-gold-cdn.xitu.io/2019/3/16/169848d298bc5d09?w=1407&h=483&f=png&s=79147)

Mobx 通过透明的函数响应式编程(transparently applying functional reactive programming - TFRP)使得状态管理变得简单和可扩展。

背后的哲学：任何源自应用状态的东西都应该自动地获得。

MobX 的实现思路非常简单直接，类似于 Vue 中的响应式的原理，其实质可以简单理解为观察者模式，数据是被观察的对象，「响应」是观察者，响应可以是计算值或者函数，当数据发生变化时，就会通知「响应」执行。

Mobx 我理解的最大的好处是简单、直接，数据发生变化，那么界面就重新渲染，在 React 中使用时，我们甚至不需要关注 React 中的 state，我们看下用 MobX 怎么实现我们上面 Redux 的状态变更。

```
import React from "react";
import ReactDOM from "react-dom";
import { observable, action } from "mobx";
import { Provider, observer, inject } from "mobx-react";

import "./styles.css";

class Store {
  // 1. count 设置为可观察属性，可以动态改变
  @observable count = 0;
  // 2. action 是唯一可以修改状态，在此副作用下状态可以直接修改并且相应
  @action inc = (n = 1) => (this.count += n);
}

// 3. 注入 Store 属性到组件
@inject("store")
// 4. 设置无状态组件为响应式组件，相应action产生的副作用，更新UI
@observer
class App extends React.Component {
  render() {
    const { store } = this.props;

    return (
      <div className="App">
        <h1>Hello CodeSandbox</h1>
        <h2>Start editing to see some magic happen!</h2>
        <p onClick={() => store.inc()}>{store.count}</p>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(
  <Provider store={new Store()}>
    <div>
      <App />
    </div>
  </Provider>,
  rootElement
);

```

对于 Mobx 的可以分为几个重要概念来执行：

1.  设置 `observer` 可观察的状态, 哪些状态可以改变的
2.  `@action` 描述这是一个修改数据的动作，这样代码逻辑更清晰、底层也会做一些性能优化、并且在调试的时候结合调试工具能够提供有用的信息。
3.  `@reactions` 和计算值很像，但它不是产生一个新的值，而是会产生一些副作用，比如打印到控制台、网络请求、递增地更新 React 组件树以修补DOM、等等。
4.  在组件上添加 `observer` 函数/ 装饰器. ，把无状态组件变成响应式组件，相应 action 产生的副作用，更新UI

## Redux VS Mobx 结语

Mobx 的数据修改说的好听点是「灵活」，不好听点是「随意」。

不过相对于 Redux 而言，Mobx 还是灵活很多，它没有太多的约束和规则，在少量开发人员或者小型项目中，会非常地自由和高效，但是随着项目的复杂度和开发人员的增加，这种「无约束」反而可能会带来后续高昂的维护成本，反之 Redux 的「约束」会确保不同的人写出来的代码几乎是一致的，因为你必须按照它约定的规则来开发，代码的一致性和可维护性也会更好。

## 思考题

Q: Mobx的数据拦截原理，简单实现一个对象getter 和 setter ？

## 参考文档

*   [中文Mobx指南](https://cn.mobx.js.org/)
*   [结合具体场景，聊聊 React 的状态管理方案](https://juejin.im/post/5c47e3246fb9a049ad776355)
*   [Redux 中文文档](https://www.redux.org.cn/)