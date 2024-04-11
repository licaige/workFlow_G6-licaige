const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { DefinePlugin } = require('webpack');

module.exports = {
  // mode和devtool两个设置可以让打包报错可以阅读！
  // 开发者模式，打包之后的js不会被压缩
  mode: 'development',
  // 默认值是eval，打包后代码都是eval不好读
  devtool: 'source-map',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {}
          },
        ],
      },
      {
        test: /\.js$/,
        exclude: '/node_modules/',
        // loader: 'babel-loader',
        use: {
          loader: 'babel-loader',
          // 下方配置抽离到.babelrc或者babel.config.js文件中去
          options: {
            // 用插件对AST树进行遍历转换，解析es6语法
            // plugins: [
            //   '@babel/plugin-transform-arrow-functions',
            //   '@babel/plugin-transform-block-scoping',
            // ],
            // plugins的简化写法？
            presets: [
              // 集成了各种plugin插件
              "@babel/preset-env",
              // ["@babel/preset-env", {
              //   // 传参
              // }],
            ]
          }
        }
      },
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new DefinePlugin({
      BASE_URL: "'./'"
    })
  ]
};