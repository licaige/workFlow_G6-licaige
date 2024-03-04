# JSDOC文档管理

![](https://user-gold-cdn.xitu.io/2019/2/12/168e0dc60dc2b0a1?w=1912&h=589&f=png&s=242277)

## 前言

[JSDoc](http://usejsdoc.org/) 是一个根据 Javascript 文件中注释信息，生成 JavaScript 应用程序或库、模块的 API 文档 的工具。你可以使用他记录如：命名空间，类，方法，方法参数等。

JSDoc 可以帮助开发者将标准化的注释转化为文档，协同开发其他开发者可以快速了解整个类和其中的属性和方法，并且快速知道如何使用，从而提高开发效率，降低维护成本。

### Jsdoc开发环境地址

> 源码地址：[https://github.com/dkypooh/front-end-develop-demo/tree/master/base/jsdoc](https://github.com/dkypooh/front-end-develop-demo/tree/master/base/jsdoc)

> Jsdoc脚手架地址：[https://github.com/ge-tbms/generator-lerna-jsdoc-packages](https://github.com/ge-tbms/generator-lerna-jsdoc-packages)

## 安装

```
$ npm i jsdoc -g

```

## 主题及配置

JSDOC 提供很多丰富的主题 ([主题资源列表](https://cancerberosgx.github.io/jsdoc-templates-demo/demo/)), 本章以 DocStrap 主题为例，它是以 [Bootstrap](https://getbootstrap.com/2.3.2/) 样式为原型。

```
$ npm i ink-docstrap -D // 主题安装

```

### 配置信息

参考 [JSDOC文档](http://usejsdoc.org/about-configuring-jsdoc.html) 默认配置项。如下解释说明

*   **plugins：** 添加 `markdown` 插件
*   **includePattern：** 正则匹配 `js` 和 `md` 文件
*   **excludePattern：** 正则过滤掉 `_`模式文件，例如: `node_modules`
*   **opts：** 命令行选项合并到配置文件，Destination 输出文件，Template 主题模板。

```
{
  "applicationName": "sdk document",
  "plugins": [
    "plugins/markdown"
  ],
  "source": {
    "include": [
      "./src/"
    ],
    "includePattern": ".+\\.js(md)?$",
    "excludePattern": "(^|\\/|\\\\)_"
  },
  "opts": {
    "encoding": "utf8",
    "recurse": true,
    "destination": "./build",
    "template": "./node_modules/ink-docstrap/template"
  }
}

```

### 命令行配置

```
$ jsdoc -e utf8 -d ./build -t ./node_modules/ink-docstrap/template ./src README.md -r

## config配置 等同于 👆命令行配置
$ npx jsdoc -c conf.json -R README.md

```

## 关键属性

### IMSDK类配置实例

`@class` 标签标明函数是一个构造器函数

```
/**
 * @class IMSDK
 * @description 消息基础SDK，`回调函数全部小写`
 * @name IMSDK
 * 
 * @param {Object} options                      配置参数
 * @param {String} options.appKey               应用APPKEY
 * @param {String} options.biz                  业务类型, BC, CC, 小蜜等 {@link IMSDK.biz|业务类型 }
 * @param {String} options.targetId             目标用户Id, 可以是群ID或者用户Nick
 * @param {String} [options.account]            账号Id或者Nick
 * @param {Function} options.onlogin            登入回调，可以拿到用户信息
 * @param {Function} options.onconnect          连接建立后的回调, 会传入一个对象, 包含登录的信息
 * @param {Function} options.onclose            断开连接后的回调
 * @param {Function} options.onerror            发生错误回调  {@link IMError|消息错误}
 * @param {Function} options.onmsg              实时消息回调 {@link IMMessage|消息体}
 * @param {Function} options.onsystemmsg        系统消息回调
 * @param {Function} options.onofflinemsg       离线消息，漫游消息，历史消息回调 {@link IMMessage|消息体}
 * @param {Function} options.onconversation     同步最近会话{@link Conversation|会话}列表回调, 会传入会话列表。
 * 
 * 
 * @example
 * const imsdk = new IMSDK({
 *      appkey: 'appKey',
 *      targetId: 'xxxx',
 *      account: 'account',
 *      onlogin: onLogin,
 *      onclose: onClose,
 *      onerror: onError,
 *      onmsg: onMsg,
 *      onsystemmsg: onSystemMsg,
 *      onofflinemsg: onOfflineMsg,
 *      onconversation: onConversation
 * })
 */

```

### namespace实例

`@namespace` 标签指明对象是一个命名空间, 用于 **实体对象** 的说明

```
/**
* @namespace
* @name Conversation
* @property {String}   id                  会话ID
* @property {String}   scene               {@link IMMessage.type|场景}
* @property {String}   to                  聊天对象, 账号或群ID
* @property {Long}     updateTime          会话更新的时间
* @property {Number}   unread              未读数
* @property {Message}  lastMsg             此会话的最后一条消息
* @property {String}   custom              自定义消息
*/

```

*   **@class:** 标示构造器函数
*   **@description:** 构造器函数描述
*   **@name：** 构造器函数名称，可以被 `@link` 引用
*   **@param：** 标记方法参数及参数类型, 语法格式 `@param {类型} 属性 - 说明`
*   **@link:** 外部属性链接
*   **@example:** 举例说明
*   **@property:** 属性说明 `@property {类型} 属性 说明描述`

## 结语

上文介绍了 JSDoc 的基本配置，给读者推荐了 DocStrap 主题配置模板，参考 [IMSDK文档](https://github.com/dkypooh/front-end-develop-demo/tree/master/base/jsdoc) 可以开箱即用。 同时列举了 JSDoc 常用的配置属性。

IMSDK文档 会在 《项目最佳实践》章节中作为标准化文档使用。

## 参考文档

*   [JSDoc 中文文档](http://www.shouce.ren/api/view/a/13232)
*   [JSDoc 常用属性](https://www.jianshu.com/p/f2a363513d67)
*   [JSDoc 插件介绍](https://www.html.cn/doc/jsdoc/about-plugins.html)