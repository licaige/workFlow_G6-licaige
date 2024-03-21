import { createApp } from "vue";
import App from "./app.vue";

// import DivinePlus from "../packages/components/index";
// import "../packages/theme-chalk/index.scss";

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
const app = createApp(App);

// app.use(DivinePlus); // 注册插件

app.mount("#app");

console.log("process.env.NODE_ENV", process.env.NODE_ENV);
console.log("process.env.HOST_ENV", process.env.HOST_ENV);
