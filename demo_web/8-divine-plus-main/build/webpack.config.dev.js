const path = require("path");
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

// 1
// mode
//  1. mode: 表示模式
//  - development 开发环境
//  - production  生产环境
// 这里的值在 package.json 中的 scripts 中的打包命令中通过 cross-env 来指定了

// 2
// entry
//  1. entry 表示thunk的入口点
//  2. entry 的简单规则
//      - html: 每个html都有 一个入口起点
//      - 单页应用spa: 一个入口起点
//      - 多页应用mpa: 多个入口起点
//  3. 如果entry后面跟一个 ( 字符串 )，或者 ( 字符串数组 )，chunk会被命名为 ( main ) ---- main
//  4. 如果entry后面跟一个 ( 对象 )，则 ( key ) 就是 thunk名 -------------------------- key
//  5. 如何打包一个多页应用
//      - 1. entry设置为 ( 对象模式 )，则可以指定 ( 多个入口 )
//      - 2. output的 ( filename ) 设置为 ('[name].[hash:8].js' ) 的形式，使用 ( 占位符 ) 则可以分别打包为不同的 ( 出口文件 )
//      - 3. plugins 数组中需要多次 ( new HtmlWebpackPlugin() )，具体如下
// plugins: [
//   new HtmlWebpackPlugin({ // ---------------------------- html-webpack-plugin可以new多个
//     template: './src/index.html', // 模版html
//     filename: 'home.html', // 打包后的html文件名
//     chunks: ['home'] // --------------------------------- 每个chunk对应加载哪些打包后的 js 文件，即 output指定的输出js文件
//   }),
//   new HtmlWebpackPlugin({
//     template: './src/index.html',
//     filename: 'other.html',
//     chunks: ['other']
//   }),
// ]

// 3
// output
//  1. filename
//      - filename: 表示打包后的 thunk 的名字
//      - '[name].[hash:8].js'
//        - []: 表示占位符
//        - [name]: 表示使用 entry 属性对象中的 key 作为thunk名
//        - [hash:8]: 表示加上hash串，长度为 8
//  2. path
//      - path: 表示打包生成的文件夹的路径
//  3. hash chunkhash contenthash 之间的区别？
//      - hash
//          - 作用：只要项目中有文件修改，整个项目构建的hash都会改变，并且全部文件都共用相同的hash
//          - 弊端：如果只修改了一个文件，整个文件的缓存都将失效，因为真个文件的hash都改变了
//      - chunkhash
//          - 相对于hash，chunkhash的影响范围较小
//          - 原理：
//            - 根据不同的入口文件(Entry)进行依赖文件解析、构建对应的chunk，生成对应的哈希值
//            - 不同入口打包生成的chunk的hash不一样
//          - 测试
//            - 请使用 cnpm run build 进行 chunkhash 的测试，main和other的js文件的hash值就不一样
//          - 例子：
//            - 策略：比如一个项目有6个组件，123打包为一个thunk1输出一组js/css，456打包为另一个thunk2输出另一组js/css
//            - 结果： 如果使用chunkhash，打包完成后chunk1的hash和chunk2的hash就不一样，改动了123，456的chunk2的hash就不会变，缓存仍然有效
//      - contenthash
//          - 1. 影响范围最小，在hash，chunkhash，contenthash三者中
//          - 2. 遇到问题
//            - 使用chunkhash，如果index.css被index.js引用了，那么 ( css文件和js文件 ) 就会 ( 共用相同的chunkhash值 )
//            - 如果index.js更改了代码，css文件就算内容没有任何改变，由于是该模块发生了改变，导致css文件会重复构建
//          - 3. 解决方法
//            - 使用 ( mini-css-extract-plugin ) 里的 ( contenthash ) 值，保证即使css文件所处的模块里就算其他文件内容改变，只要css文件内容不变，那么不会重复构建
//      - 总结
//          - hash(任何一个文件修改，整个打包所有文件的hash都会改变)： - 是根据整个项目构建，要项目里有文件更改，整个项目构建的hash值都会更改，并且全部文件都共用相同的hash值
//          - chunkhash(只影响到不同entry划分的chunk)：chunkhash根据不同的入口文件(Entry)进行依赖文件解析、构建对应的代码块（chunk），生成对应的哈希值，某文件变化时只有该文件对应代码块（chunk）的hash会变化
//          - contentHash(即使是相同chunk的js和css，改动js只会影响对应的js而不会影响到css)：每一个代码块（chunk）中的js和css输出文件都会独立生成一个hash，当某一个代码块（chunk）中的js源文件被修改时，只有该代码块（chunk）输出的js文件的hash会发生变化
//  4. 在哪些地方可以使用到 hash chunkhash contenthash
//      - 凡是在 webpack.config.js 中具有 ( filename ) 属性的地方都可以使用 ( 占位符的方式 [hash] ) 使用到这几种hash

// 真正打包 output npm 相关的配置文件在：webpack.config.prod.js

module.exports = merge(base, {
  mode: process.env.NODE_ENV,

  target: "web",

  entry: {
    index: "./test/main.ts",
  },

  output: {
    filename: "[name].[hash].js",
    path: path.resolve(process.cwd(), "dist"), // 等价于 path: path.resolve(__dirname, "../dist")
    // path: path.resolve(__dirname, "../dist"), // __dirname这里表示 webpack.config.dev.js 文件所在的文件夹，即build文件夹

    // 1
    // path.resolve() 返回一个 绝对路径
    // __dirname 当前模块的目录名
    // __filename 当前模块的文件名
    // 2
    // process.cwd() ---> 表示 执行node命令所在的目录文件夹
    // __dirname -------> 表示 源代码所在的目录文件夹
  },
  devServer: {
    // contentBase 改成 static
    static: "../dist",
    hot: true,
    open: true,
    compress: true, // 开启 gzip 压缩
  },
});
