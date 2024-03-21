const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

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

module.exports = {
  mode: process.env.NODE_ENV,
  entry: {
    main: path.resolve(__dirname, "../packages/theme-chalk/index.scss"),
  },
  output: {
    path: path.resolve(process.cwd(), "dist"),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          // "style-loader",
          // 结果: 使用了 MiniCssExtractPlugin.loader 就不需要使用 style-loader 了
          // 因为: style-loader是把css文件转换成 style 标签内嵌在html中，我们希望的是用 link 标签外部引入css，所以用 mini-css-extract-plugin来抽离css，通过link标签把css引入html，或者直接在js文件中通过import引入
          MiniCssExtractPlugin.loader,
          { loader: "css-loader" },
          { loader: "postcss-loader" },
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // "style-loader",
          MiniCssExtractPlugin.loader,
          { loader: "css-loader" },
          { loader: "postcss-loader" },
          { loader: "sass-loader" },
          // postcss-loader
          // - 作用: 来解决浏览器前缀，兼容性处理
          // - 需要:
          //  - (1) 单独配置 postcss.config.js
          //  - (2) 还需配合插件 autoprefixer，autoprefixer 需要给出浏览器的一些信息，所以要在 package.json 中添加 browserslist 配置
          // - 加载顺序
          // - sass-loader => postcss-loader => css-loader => MiniCssExtractPlugin.loader
          // - sass-loader解析scss => postcss-loader生成前缀 => css-loader解析css => MiniCssExtractPlugin.loader抽离css
        ],
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/index.css", // 指定被打包后的文件夹，和文件名
    }),
  ],

  externals: {
    // 不打包 vue 依赖，因为本项目并不是vue项目
    vue: "vue",
  },
};

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
// - 英语: external 外部的adj 外部n
