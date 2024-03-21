const webpack = require("webpack");
const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { MyCleanWebpackPlugin } = require("./plugins/MyCleanWebpackPlugin");

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

// 0
// const VueLoaderPlugin = require("vue-loader/lib/plugin"); // 注意：这样的写法会抱错，需要改成最新的下面的写法
const { VueLoaderPlugin } = require("vue-loader");

// 1
// entry
// - 测试 ( 组件库中的 - 组件 ) 时的入口文件

// 2
// path.resolve()
// - 将多个路径解析为一个规范化的 ( 绝对路径 )

// 3
// cross-env
// - 作用：设置node环境中的环境变量
// - 具体：
//   - 1. package.json 中的 script 属性中，设置为："cross-env NODE_ENV=development webpack serve --config webpack.config.js"
//   - 2. 在 webpack.config.js 中就可以通过 process.env.NODE_ENV 访问到 1 中定义的 NODE_ENV 的值
// - 环境
//   - 浏览器环境: vue项目的入口 main.ts 等前端业务页组件中都满足
//   - node环境: webpack.config.js
// - 问题：
//    - 问题：如何同步 ( 浏览器环境 ) 和 ( node环境 ) 中的环境变量
//    - 回答：
//        - aa. 在 1 的基础上，在 webpack.config.js 中设置 ( mode: process.env.NODE_ENV )，因为 ( mode 的作用是设置 浏览器环境中的环境变量 )
//        - bb. -> 或者 webpack.DefinePlugin({'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV) })
//              -> 因为在 cross-env设置了node环境中的环境变量，然后在node中有通过 webpack.definePlugin将环境变量的值友设置给了浏览器环境
// - 扩展：
//    - 问题：cross-env 和 webpack.DefinePlugin 和 mode 三者的区别？
//    - 回答：
//      - cross-env --------------- 设置node环境中的环境变量
//      - webpack.DefinePlugin ---- 设置浏览器环境中的环境变量
//      - mode -------------------- 设置浏览器环境中的环境变量
//      - mode:development 相当于 webpack.DefinePlugin({'process.env.NODE_ENV': JSON.stringify('development') })
//      - mode 可能在 package.json 中的 scripts 属性中指定，案例请看 test:env
// - 访问
console.log("process.env.NODE_ENV", process.env.NODE_ENV);
console.log("process.env.HOST_ENV", process.env.HOST_ENV);

// 4
// devtool
// eval-source-map：不产生source-map文件，但是调试时会显示行数
// source-map：产生source-map文件，显示行列信息

// 5
// resolve
// resolve.alias 取别名
// resolve.extensions 当import省略后缀时，先找.js文件，再找.css文件

module.exports = {
  resolve: {
    // https://github.com/vuejs/core/issues/4344
    symlinks: false,
    alias: {
      "@": path.resolve(__dirname, "../packages"),
      vue: path.resolve(__dirname, "../node_modules/vue"),
    },
    extensions: [".ts", ".js", ".css", ".less", "*"], // import时省略后缀时，先找.js文件，再找.css文件 注意：'*' 表示所有类型的文件
  },
  resolveLoader: {
    // 表示在寻找loader时，先去node_modules中找，再去loaders文件夹中找，loaders文件夹中有我们自己写的loader
    modules: ["node_modules", path.resolve(__dirname, "./loaders/")],
  },
  devtool: "source-map",
  module: {
    noParse: /jquery|lodash/, // module.noParse 不去解析jquery或lodash的依赖关系，因为它们俩都没有依赖其他库，从而提高构建速度
    rules: [
      {
        test: /\.vue$/,
        use: {
          loader: "vue-loader",
          options: {
            // extractCSS: true, // 单独抽离css
          },
        },
        exclude: /node_modules/,
      },
      {
        test: /\.js$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [["@babel/preset-env"]],
              plugins: [
                // ["@babel/plugin-proposal-decorators", { legacy: true }], // 装饰器语法
                // ["@babel/plugin-proposal-class-properties"], // 支持 class
                // proposal 是提案的意思
              ],
            },
          },
          // {
          //   loader: "myReplace-loader", // 通过 webpack.config.js 中的 resolveLoader 配置项，指定 loader 的寻找
          //   options: {
          //     name: "####",
          //   },
          // },
        ],
      },
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              appendTsSuffixTo: [/\.vue$/], // vue 单文件组件中假如使用了lang="ts"，ts-loader需要配置appendTsSuffixTo: [/\.vue$/]，用来给.vue文件添加个.ts后缀用于编译
            },
          },
          // {
          //   loader: "myReplace-loader",
          //   options: {
          //     name: "####",
          //   },
          // },
        ],
        exclude: "/node-modules/",
      },
      {
        test: /\.css$/,
        use: [
          // "style-loader", // 使用了 MiniCssExtractPlugin.loader 就不需要使用 style-loader 了
          MiniCssExtractPlugin.loader,
          { loader: "css-loader" },
          { loader: "postcss-loader" },
        ],
        // exclude: /node_modules/, // 这里不加入该行代码是因为 highlight.js/styles/stackoverflow-light.css 需要用css-loader来处理
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // "style-loader", // 使用了 MiniCssExtractPlugin.loader 就不需要使用 style-loader 了
          MiniCssExtractPlugin.loader,
          { loader: "css-loader" },
          { loader: "postcss-loader" },
          { loader: "sass-loader" },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.(svg|otf|ttf|woff2?|eot|gif|png|jpe?g)(\?\S*)?$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192,
              esModule: false,
              outputPath: "img/",
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.md$/,
        use: [
          { loader: "html-loader" },
          { loader: "markdown-loader", options: {} },
        ],
        // markdown-loader
        // - 用于: example 时的 md 处理
        // - 注意: 和 docs 构建没有关系
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "divine-plus",
      template: "public/index.html",
      filename: "index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "css/main.css", // 指定被打包后的文件夹，和文件名
      // filename: "[name].[hash].css", // 指定被打包后的文件夹，和文件名
      // filename: 'main.css', 抽离出来的css文件名
    }),
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
      "process.env.HOST_ENV": JSON.stringify(process.env.HOST_ENV), // 同步 node 和 browser 中的 HOST_ENV 环境变量
    }),
    new webpack.HotModuleReplacementPlugin(),

    // new CleanWebpackPlugin(),
    new MyCleanWebpackPlugin(),

    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "../typings"),
          to: "./typings",
        },
      ],
    }),
  ],
  optimization: {
    moduleIds: "named",
  },
};
