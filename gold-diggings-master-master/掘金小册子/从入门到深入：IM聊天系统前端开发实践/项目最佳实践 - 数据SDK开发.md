# 数据SDK开发

![](https://user-gold-cdn.xitu.io/2019/2/13/168e51ed154677ce?w=955&h=465&f=jpeg&s=59244)

## 前言

本章主要和大家一起实现一个具有中间件，事件等功能的可扩展的SDK，基于此基础SDK， 从而实现云信聊天SDK模块。

![](https://user-gold-cdn.xitu.io/2019/3/17/1698b3051a06ebc5?w=1359&h=179&f=png&s=15074)

上图是这样和大家讲解的核心模块，具体源码可以参考如下仓库地址，对应的NPM安装包如下：`tbms-middleware`、 `tbms-sdk`、`tbms-brandsdk-yunxin` 和 `generator-typescript-jest-sdk`。

> 1.  中间件源码(tbms-middleware): [https://github.com/ge-tbms/tbms-packages/tree/master/packages/tbms-middleware](https://github.com/ge-tbms/tbms-packages/tree/master/packages/tbms-middleware)
> 2.  基础SDK源码：[https://github.com/ge-tbms/tbms-packages/tree/master/packages/tbms-sdk](https://github.com/ge-tbms/tbms-packages/tree/master/packages/tbms-sdk)
> 3.  云信SDK源码：[https://github.com/ge-tbms/tbms-brandsdk-yunxin](https://github.com/ge-tbms/tbms-brandsdk-yunxin)
> 4.  SDK生成脚手架源码：[https://github.com/ge-tbms/generator-typescript-jest-sdk](https://github.com/ge-tbms/generator-typescript-jest-sdk)

## tbms-midddleware 设计思想

`tbms-middleware` 的设计参考了Koajs的设计原理。Koajs的中间件思路： 中间件对于一次请求来处理，context分别集成了request和response对象。

**同理可以映射成对一条收发消息的处理，通过dispatch，经过中间件流转，转化成系统期望的数据结构**。

在context中会集成 `message(消息)` , `session(会话)` , `app(如用户，初始化sdk信息等其他信息)` 。

![](https://user-gold-cdn.xitu.io/2019/3/17/1698b430578950b7?w=1519&h=926&f=png&s=47048)

解释说明：websocket 接受一条数据流，通过 `action` 触发 `dispatch` 方法， `dispatch` 会触发各个 `middleware` 模块，同时一直保存着 `context`执行上下文。在视图层同样通过 `action` 触发 `dispatch`, 回流到 `view` 层。

### tbms-middleware 核心实现

tbms-middleware 模块继承于 tbms-util 的 EventEmitter 事件类（此实现源码在通用SDK设计中实现过），因此 tbms-middleware 模块具有事件发布-订阅模式。

### tbms-middleware-compose 核心代码

```
export default function compose(middleware: ICallback[]) {
 /**
   * 中间件返回函数
   * @param {Array} middleware
   * @return {Function}
   *
   */
  return function(context: object, next?: Promise<any> | ICallback) {
    let index: number = -1;
    // 0. 执行 dispatch 递归模块
    return dispatch(0);
    // 1. 实现 dispatch 函数，返回Promise链
    function dispatch(i: number): Promise<any> {
      if (i <= index)
        return Promise.reject(new Error("next() called multiple times"));
      index = i;
      let fn: any = middleware[i];
      // 2.1 如果递归索引值为模块长度，赋值next，
      // 2.2 同时next为空的时候，返回 promise resolve，跳出递归。
      if (i === middleware.length) fn = next;
      if (!fn) return Promise.resolve(context);
      try {
        // 3. i+1 递归执行下一个Middleware模块
        return Promise.resolve(fn(context, dispatch.bind(null, i + 1)));
      } catch (err) {
        // 4. 异常情况跳出递归，返回 Promise reject 
        return Promise.reject(err);
      }
    }
  };
}

```

代码详细解析:

1.  内部实现 `dispatch` 函数, 返回一个 `Promise` 链
2.  通过高阶函数，内部闭包维护了 `middleware` 数组。同时以 0 为索引执行 `dispatch` 模块。每个middleware函数模块输入参数为两个 context 和 next。 1. context执行上下文对象，存储各个middleware修改的状态。 2. next 为 `dispatch.bind(null, i + 1))` 通过 bind 函数，递归执行 `Promise` 链。同时此中间件方法适用于异步方法。
3.  如果递归索引值为模块长度，赋值next，同时next为空的时候，返回 promise resolve，跳出递归。

### tbms-middleware 核心代码

```
/**
* 触发函数
* @param {Object} message  消息体
*/
dispatch(val: ContextObject) {
    // 1. 创建一个上下文，通过Object.create创建一个新的对象
    let context = this.createContext(val);
    // 2. 原型SDK返回一个上下文(ctx), 用于yunxin-sdk等基础的SDK扩展。
    context = this.handleContextExternal(context, val);
    // 3. 执行👆的compose函数，实现promise中间件
    const fnMiddleware = compose(this.middleware);
    // 4. 返回promise实例，以及结果
    return fnMiddleware(context).catch(this.onerror.bind(this))
}
/**
* 处理上下文，给上下文添加额外参数
* 子类继承扩展
* @param {Object} context 上下文
*/
handleContextExternal(ctx: ContextObject, val: ContextObject) {
    return ctx
}

/**
* 创建新的上下文
* @param {Object} message 创建'`新上下文`'
*/
createContext(val: ContextObject) {
    const ctx = Object.create(this.context);
    // 对原有ctx扩展
    return Object.assign(ctx, val);
}


```

代码详细解析：

1.  每次 dispatch 通过Object.create创建一个新的上下文对象。
2.  handleContextExternal 用于继承原型 Middleware 进行扩展，子类实现。
3.  执行上文的compose函数，实现promise中间件。此中间件支持异步请求
4.  返回一个 promise 实例，以及最终处理结果。

### tbms-middleware 单元测试

```
import Middleware from '../src/index';

test('basic', (done) => {
  const middle = new Middleware({})
  // 1. 添加中间件1，同时支持异步返回
  middle.use((ctx, next) => {
    ctx.test = 1;
    console.log('use1 >>>')
    next().then(() => {
      ctx.userDeffer1 = '1'
      console.log('use1 <<< promise')
    });
    console.log('use1 <<<')
  });
  // 1. 添加中间件2，同时支持异步返回
  middle.use((ctx, next) => {
    ctx.testTwo = 2;
    console.log('use2 >>>')
    next().then(() => {
      ctx.userDeffer2 = '2'
      console.log('use2 <<< promise')
    });
    console.log('use2 <<< ')
  })
  middle.dispatch({message:{message: 1, id: '12'}}).then((result: any) => {
    expect(result.userDeffer1).toBe('1');
    expect(result.userDeffer2).toBe('2');
    done();
  })
});

// 测试 async await 写法
test('await async function ', (done) => {
  const middle = new Middleware({})
  async function asyncTest() {
    const result = await middle.dispatch({message:{message: 2, id: '12'}});
    expect(result.message.message).toBe(2);
    done();
  }

  asyncTest()
})


```

我们可以在源码 tbms-middleware 目录下运行 `npm run test` 查看结果。结果如下：

![](https://user-gold-cdn.xitu.io/2019/3/17/1698b8cf8f8fb05f?w=1334&h=872&f=png&s=255157)

测试结果解析：同步的方法先执行（从外到内），异步的方法（从内到外），洋葱圈模型。

## tbms-sdk 核心实现

tbms-sdk 是一个标准的IM-SDK模块，tbms-sdk 继承与 tbms-middlware 模块，因此它同时具有 中间件 和 事件监听发布 能力。在此模块主要实现统一的API接口以及标准事件回调，初始化聊天的参数配置以及一些通用的业务逻辑处理。 如图是标准API接口 和 tbms-sdk测试用例（测试用例）

![](https://user-gold-cdn.xitu.io/2019/2/7/168c75a72834b0f9?w=1920&h=1080&f=png&s=194331)

### 初始化参数配置

初始化参数配置依赖于IM的基本概念和基本流程。我们需要传入 `appkey`, `touid`, `uid`必填参数。同时需要有些通用事件回调, `onlogin`, `onmsg`, `onofflinemsg` 等等。

Name

Type

Description

`appkey`

String

应用APPKEY

`touid`

String

目标用户Id, 可以是群ID或者用户Nick

`uid`

String

账号Id或者Nick

`onlogin`

function

登入回调，可以拿到用户信息

`onconnect`

function

连接建立后的回调, 会传入一个对象, 包含登录的信息

`onerror`

function

发生错误回调

`onmsg`

function

实时消息回调

`onsystemmsg`

function

系统消息回调

`onofflinemsg`

function

离线消息，漫游消息，历史消息回调

`onconversation`

function

同步最近会话列表回调, 会传入会话列表。

#### SDK实例

```
const imsdk = new IMSDK({
     appkey: 'b652154953697d814225f7aa707491b1',
     touid: 'alice',
     uid: 'bob',
     onlogin: onLogin,
     onclose: onClose,
     onerror: onError,
     onmsg: onMsg,
     onsystemmsg: onSystemMsg,
     onofflinemsg: onOfflineMsg,
     onconversation: onConversation
})

const onLogin = (user: IMUser) => {
 // user 用户信息
}

const onError = (error: IMError) => {
  // 错误对象处理
}

const onMsg = (msgs: IMMessage[]) => {
 // 实时消息同步
}

const onSystemMsg = (msgs: IMSystemMessage[]) => {
 // 系统通知消息
 // 通知消息属于`会话内`的一种消息，用于会话内通知和提示场景。例如：群名称更新、某某某退出了群聊等
}

const onOfflineMsg = (msgs: IMMessage[]) => {
 // 离线消息，漫游消息，历史消息回调
}

const onConversation = (conversation: Conversation[]) => {
 // 最近会话
}

```

### tbms-sdk 核心代码

代码详细见 `tbms-sdk/src/index.ts`, tbms-sdk 继承与 tbms-middlware 模块，因此它同时具有 中间件 和 事件监听发布 能力。

tbms-sdk 对标准接口进行了封装，同时对消息流 `action` 统一通过 `dispatch` 方法走中间件模块。

```
 /**
   * 触发实时消息
   * @param {object | MessageObject} message 消息体
   * @api dispatchMsg
   */
  dispatchMsg(message: MessageObject) {
    this.dispatch({ message: message }).then((result: any) => {
      this.options.onmsg(result.message, result)
    })
  }

```

代码详解：对新消息，调用 `dispatchMsg` 的 `action`, 通过 `dispatch` 流转中间件。 得到最终标准化消息数据。

## tbms-yunxin-sdk 核心实现

代码详细见 `tbms-sdk/src/core.ts`，主要实现的功能是把云信的SDK通过事件的方式转化到标准SDK中

```

// 底层调用云信SDK
this.sdk = NIM.getInstance({
  appKey: APP_CONFIG.appkey,
  token: options.token,
  account: options.accid,
  onconnect: (event: any) => {
    // 接受登录成功回调，同时分发这个事件。
    this.emit(MSG_EVENT_CONSTANT.LOGIN_SUCCESS, event);
  },
  onerror: (event: any) => {
    // 接受错误回调，同时分发这个事件。
    this.emit(MSG_EVENT_CONSTANT.LOGIN_ERROR, event);
  },
  onroamingmsgs: (obj: any) => {
    const msgs = obj.msgs;
    // 接受漫游消息回调，同时分发这个事情
    this.emit(MSG_EVENT_CONSTANT.GET_OFFLINE_MSG, msgs);
  },
  onofflinemsgs: (obj: any) => {
    const msgs = obj.msgs;
    // 接受离线消息回调，同时分发这个事情
    this.emit(MSG_EVENT_CONSTANT.GET_OFFLINE_MSG, msgs);
  },
  onsessions: (sessions: any[]) => {
    // 单聊有且只有一个会话对象
    this.conversation = sessions[0] || {};  
    // 由于会话属于中间件字段，需要通过 middleware 流转
    this.dispatchConversation(this.conversation);
  },
  onmsg: (msg: any) => {
    // 取唯一标识
    msg.id = msg.idClient; 
    // 接受实时消息回调，同时分发这个事情
    this.emit(MSG_EVENT_CONSTANT.RECEIVE_MSG, msg);
  }
})

```

### tbms-yunxin-sdk 的 middleware 代码实现

代码详细见 `tbms-sdk/src/middleware.ts`, 主要是编码和解码中间件模块，插入到 tbms-yunxin-sdk 中。

```
/**
 * 解码中间件流
 * @param ctx
 * @param next
 */
export const messageDecodeFlow = function(ctx:any, next:any) {
  let message = ctx.message;

  if (message.from && message.to && message.from !== message.to) {
    message.conversationId = message.sessionId;
    message.scene = 'single';
    message.status = 'success';
    switch(message.type) {
      case 'text': // 文本消息
        merge(message, {
          type: 'text',
          content: message.text
        });
        break;
      default:
        merge(message, {
          type: 'text',
          content: '目前版本暂不支持该功能'
        })
        break;
    }
  }

  next();
}

/**
 * 编码中间件流
 * @param ctx
 * @param next
 */
export const messageEncodeFlow = function(ctx: any, next: any) {
  let message = ctx.message;
  if (message.from && message.to && message.from === message.to) {
    message.conversationId = ctx.conversation.conversationId;
    message.scene = 'single';
    message.status = 'success';
    message.idClient = message.id;
  }
  next();
}

```

代码详解，传入两个参数 `context` 和 `next`

*   编码模块：把非标准的数据流解析成标准化消息格式。
*   解码模块：把标准化消息格式解析成服务器请求的参数消息格式。

### tbms-yunxin-sdk 的 主模块实现

代码详见 `tbms-yunxin-sdk/src/index.ts`

```
constructor(options: any) {
    this.options = options;
    // 实例化Core模块
    this.core = new Core(options);
    // 添加中间件实现，主要是编码模块，解码模块
    this.core.useBatch([messageEncodeFlow, messageDecodeFlow])
    this.init();
}
/**
* 初始化，事件监听
*/
init() {
    this.core.on(MSG_EVENT_CONSTANT.RECEIVE_MSG, (msg: any) => {
      this.core.dispatchMsg(msg);
    });
    
    this.core.on(MSG_EVENT_CONSTANT.LOGIN_SUCCESS, (event: any) => {
      this.core.dispatchLogin(event);
    });
    
    this.core.on(MSG_EVENT_CONSTANT.LOGIN_ERROR, (event: any) => {
      this.options.onerror(event);
    });
    
    this.core.on(MSG_EVENT_CONSTANT.GET_OFFLINE_MSG, (msgs: any) => {
      msgs.forEach((msg: any) => {
        this.core.dispatchOfflineMsg(msg);
      });
    });
}

```

**代码解析：** 在主函数模块中，主要是实例化 `Core` 模块，同时添加中间件模块。 另一方面通过监听标准化事件，统一处理消息（dispatch 到中间件模块）。

## 结语

看完 tbms-yunxin-sdk 代码实现， 读者可能会想，作者为什么要这么来实现，直接通过云信的SDK来实现不是很方便直接，为什么要去对接标准SDK。这是一个非常好的问题，这样做的目的，今天我们架构的是一个通用解决方案，不仅仅为了云信来实现，这套实现方案以后可以对接微信IM云，淘宝IM服务等。 使用这套框架，之后对接IM服务厂商的时候，我们只需要扩展实现 `Middleware` 模块，其他能力都是可以共用。

## 参考文档

*   [redux middleware 详解](https://zhuanlan.zhihu.com/p/20597452)
*   [Koa 源码实现](https://github.com/koajs/koa/tree/master/lib)