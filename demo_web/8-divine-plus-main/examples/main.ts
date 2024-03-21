import { createApp } from "vue";
import App from "./app.vue";

import DivinePlus from "../packages";
import "../packages/theme-chalk/index.scss";

// import DivinePlus from "divine-plus";
// import "divine-plus/css/index.css";

// hightlight.js
// @highlightjs/vue-plugin
import "highlight.js/styles/stackoverflow-light.css";
import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";
import hljsVuePlugin from "@highlightjs/vue-plugin";

// contrast
// import ElementPlus from "element-plus";
// import "element-plus/dist/index.css";

// 测试 - 单独注册
// import Breadcrumb from "../packages/components/breadcrumb/index";
// import Divider from "../packages/components/divider/index";
// app.use(Breadcrumb);
// app.use(Divider);

hljs.registerLanguage("javascript", javascript);

console.log("hello");

// vue
// 1. 安装
// - vue
// - vue-loader
// - vue-template-compiler
// - html-webpack-plugin
// 2. 配置:
// - 配置vue相关需要配置几个地方
// - 1. vue-loader
// - 2. VueLoaderPlugin
// - 3. 需要把 entry 设置为 vue 项目的入口文件 main.js
// - 4. devServer
// - 5. vue 中使用 ts 需要配置 ts-loader 中的 appendTsSuffixTo: [/\.vue$/]
// - 6. 热更新配置: new webpack.HotModuleReplacementPlugin() + devServer.hot
// 3. 扩展
// - 如果是开发 vue3组件库 ，我们生产打包时，是不打包vue的，所以要配置 webpack.config.js 中的  externals: { vue: "vue" }

// app
// app 上具有 ( component,config,mixin,directive,provide,use,mount,unmount ) 等属性
const app = createApp(App);
console.log("app====", app);

app.use(DivinePlus); // 注册插件
// app.use(ElementPlus);
app.use(hljsVuePlugin);

app.mount("#app");

console.log("process.env.NODE_ENV", process.env.NODE_ENV);
console.log("process.env.HOST_ENV", process.env.HOST_ENV);
// 测试 webpack 浏览器环境变量的设置
// ### (2) cross-env 和 webpack.DefinePlugin 和 mode 三者的区别？
// - cross-env
//   - cross-env 是什么
//     - cross-env 是一个单独的库，具有跨平台使用(环境变量)的优点，能兼容 windows 平台和 mac 平台
//     - 比如: windows 不支持 NODE_ENV=development 的设置方式，所以使用 cross-env 做兼容
//   - node 环境变量：cross-env 定义的是 -------------------- 1. node 中的环境变量
//     - 1.解释: 在使用 webpack 情况下，node 环境指代的是 webpack.config.js 等
//     - 2.设置: 通过在 package.json 中的 scripts 中设置 "build:test": "cross-env NODE_ENV=development webpack --config webpack.config.js" 已经设置好了 node 环境的环境变量
//     - 3.获取: 在 webpack.config.js 中通过 process.env.NODE_ENV 就可以获取到
// - webpack.DefinePlugin
//   - 浏览器环境变量：webpack.definePlugin() 定义是的 ------- 2. 浏览器中的环境变量
// - mode
//   - 浏览器环境变量：mode 是指定 --------------------------- 3. 浏览器中的环境变量
// - 以下表达式等价
//   - ( mode: 'development' ) === webpack.definePlugin({'process.env.NODE_ENV': JSON.stringify('development')})
// - 环境
//   - 浏览器环境: vue 项目的入口 main.ts 等前端业务页组件中都满足
//   - node 环境: webpack.config.js
// - 问题
//   - 问题：如何同步浏览器环境 和 node 环境的环境变量呢？
//   - 回答：
//     - 1. 在 package.json 的 script 中设置 cross-env 的 NODE_ENV 的值是 'development'
//     - 2. 在 webpack.config.js 中将 ( mode 的值设置为 process.env.NODE_ENV ) 或者 ( webpack.definePlugin({process.env.NODE_ENV: JSON.stringify('development') }) )
// - 源码
//   - 源码地址 ( 浏览器中的环境变量 ): https://github.com/woow-wu7/8-divine/blob/main/examples/main.js
//   - 源码地址 2 ( node 中的环境变量 ): https://github.com/woow-wu7/7-compiler/blob/main/webpack.config.js

// ```1
// 一
// 同步浏览器环境 和 node 环境中的环境变量

// 1. 在webpack.config.js中
// mode: process.env.NODE_ENV,
// // 注意：1. 这里是 ( webpack.config.js ) 文件，属于 ( node环境 )，而不是 ( 浏览器环境 )
// // 注意：2. 这里的 ( process.env.NODE_ENV ) 是通过 ( package.json 中的 scripts 中的 cross-env 来指定的 )；
// // 注意：3. mode 指定的是 ( 浏览器中的环境变量，只不过这里的mode的值process.env.NODE_ENV是通过cross-env来指定的 )
// // 问题：-- 自然而然会想到一个问题？如何同步浏览器和node环境中的环境变量呢？
// // 回答：-- 就是利用这里的方式 ( mode: process.env.NODE_ENV )，
// // 原理：-- ( cross-env NODE_ENV=aaa ) => 那么这里的 ( process.env.NODE_ENV=aaa ) => 推出 ( mode=aaa ) => ( webpack.DefinePLugin({'process.env.NODE_ENV': JSON.stringify(aaa)}) ) => ( 在浏览器环境中的 process.env.NODE_ENV=aaa )
// // 总结：
// // - cross-env -------------------------> 指定的是 node 环境中的环境变量
// // - webpack.DefinePlugin() ------------> 指定的是 浏览器 环境你中的环境变量
// // - mode ------------------------------> 指定的是 浏览器 环境中的环境变量，这里 ( mode: process.env.NODE_ENV ) 相当于 ( webpack.DefinePLugin({'process.env.NODE_ENV': JSON.stringify('xxxx')}) )
// // - ( mode: 'development' ) 相当于 ( webpack.DefinePlugin({'process.env.NODE_ENV': JSON.stringify('development')}) )
// ```

// ```2
// 二
// 总结
// ---
// 1
// 浏览器中的环境变量有两种方式指定
// - 以下两种等价
//   - 1. 通过 webpack.config.js 中的 mode:xxxx 来指定
//   - 2. 通过 webpack.config.js 中的 webpack.definePlugin({process.env.NODE_ENV: JSON.stringify('xxxx') })
// - 原理
//   - cross-env NODE_ENV=xxxx ---> webpack.config.js中就可以通过 process.env.NODE_ENV 获取到 xxxx ---> 再把 mode: process.env.NODE_ENV ---> 则浏览器中的 process.env.NODE_ENV 就等于了 xxxx
// ```
