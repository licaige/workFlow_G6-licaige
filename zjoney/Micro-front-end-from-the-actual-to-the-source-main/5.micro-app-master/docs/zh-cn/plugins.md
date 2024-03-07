微前端的使用场景非常复杂，没有完美的沙箱方案，所以我们提供了一套插件系统，它赋予开发者灵活处理静态资源的能力，对有问题的资源文件进行修改。

插件系统的主要作用就是对js进行修改，每一个js文件都会经过插件系统，我们可以对这些js进行拦截和处理，它通常用于修复js中的错误或向子应用注入一些全局变量。

## 适用场景
通常我们无法控制js的表现，比如在沙箱中，顶层的变量是无法泄漏为全局变量的（如 var xx = , function xxx 定义变量，无法通过window.xx 访问），导致js报错，此时开发者可以通过插件对js进行修改处理。

## 使用方式
```js
import microApp from '@micro-zoe/micro-app'

microApp.start({
  plugins: {
    // 全局插件，作用于所有子应用的js文件
    global?: Array<{
      // 可选，强隔离的全局变量(默认情况下子应用无法找到的全局变量会兜底到基座应用中，scopeProperties可以禁止这种情况)
      scopeProperties?: string[],
      // 可选，可以逃逸到外部的全局变量(escapeProperties中的变量会同时赋值到子应用和外部真实的window上)
      escapeProperties?: string[],
      // 可选，如果函数返回 `true` 则忽略 script 和 link 标签的创建
      excludeChecker?: (url: string) => boolean
      // 可选，如果函数返回 `true` ，则 micro-app 不会处理它，元素将原封不动进行渲染
      ignoreChecker?: (url: string) => boolean
      // 可选，传递给loader的配置项
      options?: any,
      // 必填，js处理函数，必须返回code值
      loader?: (code: string, url: string, options: any, info: sourceScriptInfo) => code,
      // 可选，html 处理函数，必须返回 code 值
      processHtml?: (code: string, url: string, options: unknown) => code
    }>

    // 子应用插件
    modules?: {
      // appName为应用的名称，这些插件只会作用于指定的应用
      [appName: string]: Array<{
        // 可选，强隔离的全局变量(默认情况下子应用无法找到的全局变量会兜底到基座应用中，scopeProperties可以禁止这种情况)
        scopeProperties?: string[],
        // 可选，可以逃逸到外部的全局变量(escapeProperties中的变量会同时赋值到子应用和外部真实的window上)
        escapeProperties?: string[],
        // 可选，如果函数返回 `true` 则忽略 script 和 link 标签的创建
        excludeChecker?: (url: string) => boolean
        // 可选，如果函数返回 `true` ，则 micro-app 不会处理它，元素将原封不动进行渲染
        ignoreChecker?: (url: string) => boolean
        // 可选，传递给loader的配置项
        options?: any,
        // 可选，js处理函数，必须返回code值
        loader?: (code: string, url: string, options: any, info: sourceScriptInfo) => code,
        // 可选，html 处理函数，必须返回 code 值
        processHtml?: (code: string, url: string, options: unknown) => code
      }>
    }
  }
})
```

## 案例
```js
import microApp from '@micro-zoe/micro-app'

microApp.start({
  plugins: {
    global: [
      {
        scopeProperties: ['key', 'key', ...], // 可选
        escapeProperties: ['key', 'key', ...], // 可选
        excludeChecker: (url) => ['/foo.js', '/bar.css'].some(item => url.includes(item)), // 可选
        options: 配置项, // 可选
        loader(code, url, options, info) { // 可选
          console.log('全局插件')
          return code
        },
        processHtml(code, url, options, info) { // 可选
          console.log('每个子应用 HTML 都会传入')
          return code
        },
      }
    ],
    modules: {
      'appName1': [{
        loader(code, url, options, info) {
          if (url === 'xxx.js') {
            code = code.replace('var abc =', 'window.abc =')
          }
          return code
        }
      }],
      'appName2': [{
        scopeProperties: ['key', 'key', ...], // 可选
        escapeProperties: ['key', 'key', ...], // 可选
        ignoreChecker: (url) => ['/foo.js', '/bar.css'].some(item => url.includes(item)), // 可选
        options: 配置项, // 可选
        loader(code, url, options, info) { // 可选
          console.log('只适用于appName2的插件')
          return code
        },
        processHtml(code, url, options, info) { // 可选
          console.log('只适用于 appName2 的 HTML 处理')
          return code
        },
      }]
    }
  }
})
```

## 插件列表
#### 1、子午线埋点插件
子午线埋点文件中使用function定义将函数泄漏为全局变量，这在沙箱中是不允许的，所以我们需要将其修改为
`window.xx = funnction xx` 的形式进行适配。

```bash
# 安装子午线埋点插件
npm i @micro-zoe/plugin-painful-joya -S
```

```js
import microApp from '@micro-zoe/micro-app'
import painfulJoya from '@micro-zoe/plugin-painful-joya'

// 设置为全局插件，作用于所有子应用
microApp.start({
  plugins: {
    global: [painfulJoya],
  }
})

// 或者设置为某个子应用的插件，只作用于当前子应用
microApp.start({
  plugins: {
    modules: {
      'appName': [painfulJoya],
    }
  }
})
```
