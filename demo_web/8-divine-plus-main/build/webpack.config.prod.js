const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const { merge } = require("webpack-merge");
const base = require("./webpack.config.base");

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

module.exports = merge(base, {
  mode: process.env.NODE_ENV,
  entry: {
    main: path.resolve(__dirname, "../packages/index.ts"),
  }, // 组件库入口
  output: {
    path: path.resolve(process.cwd(), "dist"), // 等价于 path: path.resolve(__dirname, "../dist")
    filename: "divine-plus.js",
    library: {
      name: "DivinePlus", // 配置导出库的名称，如使用require引入，这里就是require("8divine")
      type: "umd", // 配置将库暴露的方式，即配置以何种方式导出库，注意 该属性用来代替下面的 libraryTarget，以后webpack可能移除对 libraryTarget 的支持
      // type: "var", // var表示：让你的库加载之后，入口起点的返回值 将会被赋值给一个变量
      umdNamedDefine: true, // 当使用 output.library.type: "umd" 时，将 output.library.umdNamedDefine 设置为 true 将会把 AMD 模块命名为 UMD 构建。否则使用匿名 define
    },
    // libraryTarget: "umd", // 配置以何种方式导出库 -> 将被 output.library.type 代替
    // umdNamedDefine: true, // -------------------> 将被 output.library.umdNamedDefine 代替，当使用 libraryTarget: "umd" 时，设置 output.umdNamedDefine 为 true 将命名由 UMD 构建的 AMD 模块。否则将使用一个匿名的 define。
  },

  externals: {
    // 不打包 vue 依赖，因为本项目并不是vue项目
    vue: "vue",
  },

  optimization: {
    minimize: true,
    minimizer: [
      // TerserPlugin
      //- https://webpack.docschina.org/plugins/terser-webpack-plugin/
      new TerserPlugin({
        terserOptions: {
          compress: {
            // comments: false, // 删除注释
            drop_console: true, // 默认值就是true，即默认就会删除console，如需要保留设置 drop_console: false
          },
        },
        extractComments: false, // 不创建单独的主食文件
      }),
    ],
  },
});

// 1
// process.cwd() 和 __dirname 的区别 ?
// 1.1
// process.cwd()
// - 返回 Node.js 进程的当前工作目录，即 ( 执行命令的文件所在的文件夹 )
// - 这里webpack命令是在 package.json 文件中执行的，所在的文件夹是 8-divine-plus
// 1.2
// __dirname
// - 返回 源代码所在的目录文件夹，即当 ( 前文件所在的目录 )， 这里源代码文件就是webpack.config.prod.js，所在文件夹就是 build

// 2
// externals
// - 报错：打包后使用组件库报错 Uncaught TypeError: Cannot read properties of null (reading 'isCE')
// - 解决：通过 webpack 构建时，通过 externals 不打包 vue
// - vite 同理
