# UI组件化

![](https://user-gold-cdn.xitu.io/2019/2/13/168e555f76f329fa?w=1200&h=500&f=jpeg&s=154607)

## 前言

上一章我们实战了数据层的开发，这样我们来实现UI组件化, 技术方案选用 `Alibaba/rax`, 类 React 语法，适用于移动端开发。这章重点会介绍 组件化的设计分层， HOC组件设计，解析器模块设计。

### 源码地址（组件化代码合集）

> [https://github.com/ge-tbms/tbms-components](https://github.com/ge-tbms/tbms-components)

## 需求交互

![](https://user-gold-cdn.xitu.io/2019/3/17/16989d719106ad72?w=1016&h=1053&f=png&s=201992)

针对交互稿我们有如下业务诉求分析：

1.  对于一个聊天的UI可以拆分为 普通消息， 自定义（卡片）和系统消息组件。
2.  对上面提到的消息展示， 抽象成一个HOC组件，封装不可变的UI，包裹可变组件。
3.  封装输入框组件，表情组件。

## 组件化架构框图

![](https://user-gold-cdn.xitu.io/2019/3/27/169bf236cee621e4?w=3000&h=1080&f=png&s=171043)

对聊天消息组件化能力划分三个层级：基础消息组件，自定义消息组件和业务组件。

*   基础组件(rax-tbms-basemsg)：包括 文本消息、图片消息、系统消息等
*   自定义消息（rax-tbms-custommsg）: 卡片消息， 抽屉消息等。
*   业务组件(rax-tbms-chat-plugin): 表情，输入框，加载组件等

## 消息HOC组件

高阶组件（HOC）是组件开发中的高级技术，用来重用组件逻辑。

具体而言，高阶组件就是一个函数，且该函数接受一个组件作为参数，并返回一个新的组件。表达式如下：

> const EnhancedComponent = higherOrderComponent(WrappedComponent);

我们观察交互可以发现，聊天项可以抽象分离出一个HOC高阶组件。

*   不可变区域为：头像和头像标题。
*   可变区域：中间的消息流，根据不同消息展示不同消息UI。

```

const leftChatItemHOC = (WrappedComponent) => (conversation) => {
    const avator = conversation.targetAvator;
    // 1. 返回一个装饰过的组件
    return class extends PureComponent {
        render() {
          return (
            <View style={style.container}>
              <View style={style.containerAvator}>
                <Image source={{uri: avator}} resizeMode="cover" style={style.containerAvator} />
              </View>
              <View style={[style.containerCnt, style.containerLeft]} >
                <Text style={style.containerNick}>{conversation.targetNick}</Text>
                <View style={style.containerWrappedCard}>
                  // 2. 返回传入的可变组件, 同时注入组件
                  <WrappedComponent {...this.props} />
                </View>
              </View>
            </View>
          );
        }
    }
}



```

代码解释：封装了一个左侧消息展示的高阶函数，用来重用组件逻辑，返回一个传入的可变组件，同时注入属性。

### 使用事例

高阶组件`rax-tbms-chat-item` 封装了 `leftChatItemHOC` 和 `rightChatItemHOC`，分别是左侧对方发送消息高阶组件和右侧自己发送消息高阶组件。

`WrappedComponent` 为传入的组件， 通过高阶组件返回一个新的组件。 源码地址：

> [https://github.com/ge-tbms/tbms-components/blob/master/packages/rax-tbms-chat-item/src/index.js](https://github.com/ge-tbms/tbms-components/blob/master/packages/rax-tbms-chat-item/src/index.js)

使用事例参考如下:

```
import { leftChatItemHOC } from 'tbms-ui-chat-item';
import { TextMsg } from 'tbms-ui-chat-basemsg';

// 1. 设置会话基础信息
const conversation = {
  avator: 'https://gw.alicdn.com/tfs/TB1aRryvSzqK1RjSZFpXXakSXXa-640-640.png',
  targetNick: '伊芙丽旗舰店小徐',
  fromNick: 'moliy'
};

// 2. 设置消息格式
const message = {
  type: 'text',
  content: '其他的小伙伴有需要一起来看看吗？'
};

// 3. 返回HOC包裹的高阶组件
const ItemComponent = leftChatItemHOC(TextMsg)(conversation);

// 文本消息的消息流组件
<ItemComponent {...message} />

```

代码解释说明如下：

1.  设置会话基础信息
2.  设置消息格式
3.  返回HOC包裹的高阶组件

## 基础组件

聊天基础消息组件可以分为 文本消息、图片消息、系统消息 和 富文本消息 ，下面举一个简单的文本消息组件。

```
/**
 * @class
 * @name tbms-text 基础组件
 * @property {Object} props           属性
 * @property {String} props.text      文字
 */
export default class extends BaseComponent {
  render() {
    const styles = this.styles;
    // 1. 解析富文本，表情消息
    const richText = wwParser(this.props.content, styles);
    return <View style={styles.container}>{richText}</View>
  }
}


```

rax-tbms-basemsg 基础消息组件

```
import { TextMsg } from 'rax-tbms-basemsg';


```

## 组件解析器模块

### 设计框图

![](https://user-gold-cdn.xitu.io/2019/3/26/169b96eab2c375e3?w=1920&h=1080&f=png&s=289370)

上一章我们通过中间件的方式，整合输出了标准 IM 数据结构：消息和会话。 这章我们要介绍下一条消息如何通过 pipline 表现出标准化UI，原理图如上所示。

### 设计思想

组件中间件的设计思路来源于数据驱动，如何根据不同的消息格式展示不同的UI组件。作者设计了一种管道模型（ `消息 ---> UI解析器 --> 组件` ），每条消息都通过解析器管道，最终得到上下文对象，包含高阶组件和消息数据两个属性对象。

设计的好处：入口和出口统一，对于数据和UI组件的映射关系放在 UI解析器模块。同时管道模型设计成插件可扩展方式，可以插拔不同UI解析器模块。

### 解析器参考代码

> [https://github.com/ge-tbms/tbms-components/blob/master/packages/rax-tbms-chat-parser/src/parse.js](https://github.com/ge-tbms/tbms-components/blob/master/packages/rax-tbms-chat-parser/src/parse.js)

### 中间件模型

promiseMiddleware 模块参考 **前端进阶能力 - 通用SDK设计** 的中间件函数。

#### 解析器中间件模块 **middleware**

```
export default class {
  public middlewares:any[] = [];
  public ctx = {
    ItemComponent: null,
    message: {},
    conversation: {}
  }
  constructor(middlewares: any[]) {
    this.middlewares = middlewares;
  }
  // 1. 批量添加中间件
  useBatch(steps: any[]) {
    if (_.isArray(steps)) {
      this.middlewares = this.middlewares.concat(steps);
    } else {
      throw TypeError('useBatch must be arrary!!!')
    }
  }
  // 2. 触发消息数据，每条消息都经过中间件流转
  dispatch(msg: any, conversation: any) {
    let steps = Object.create(this.middlewares);
    let ctx = Object.create(this.ctx);
    ctx.conversation = conversation;
    ctx.message = msg;
    // 3. 绑定执行上下文，批量处理解析器模块
    return _.promiseMiddleware(steps, ctx);
  }
}


```

代码解释说明：

`ctx`保持了这次调用的引用。所有对象都挂载到`ctx`上，统一接口通过 `dispatch` 函数进行流转。 通过解析器 (parser) 会多挂载一个 高阶组件包装后的 `ItemComponent` 组件对象。

#### 解析器模块 parser

解析模块的作用是根据不同的消息 映射成 不同的消息UI组件，具体参考代码如下：

```
import { TextMsg } from 'rax-tbms-basemsg';
import { leftChatItemHOC, rightChatItemHOC } from 'rax-tbms-chat-item';

export default function (ctx) {
  const msg = ctx.message;
  let message = merge({ type: msg.type }, msg);
 
  switch(msg.type) {
    // 1. 区分消息类型
    case 'text':
      // 2. 合并消息数据
      ctx.message = merge(message, {
        content: msg.content
      })
      // 根据数据流向，通过HOC组件包装消息
      ctx.ItemComponent = msg.flow === 'in' ? leftChatItemHOC(TextMsg)(ctx.conversation) : rightChatItemHOC(TextMsg)(ctx.conversation);
      break;
    default:
      break;
  }
}


```

#### 实例调用

```
import baseParser from './parser.js'

// 0. 实例化中间件模块
const componentParser = new Middleware([baseParser]);

// 1. 自定义解析器，现为空
const cosutomParser = (ctx) => ({});

// 2. 批量添加额外的UI解析器
componentParser.useBatch([customParser])

// 3. 注入 msg 和 conversation 两个对象
componentParser.dispatch(msg, conversation).then(ctx => {   
    // 3.1 返回由解析器流转后的消息实体
    const message = ctx.message; 
    // 3.2 返回由解析器流转后的高阶组件
    const ItemComponent = ctx.ItemComponent; 
    
    // 4. render 实体组件
    render(<ItemComponent {...ctx.message} />)
})

```

代码解释说明：通过 `middleware` 和 `parser` 两个模块就实现了 `pipeline` 功能。 实例化 中间件模块，所有数据通过 `dispatch` 分发。

## 结语

本章提供了一种通用的数据驱动UI的设计模式，称作 pipeline 设计模式，同时介绍了组件化开发的通用思路： HOC组件开发，组件化分层的思想。这章介绍的实践能力和思想同样可以适用于其他业务，有助于提升大家的前端设计架构能力。