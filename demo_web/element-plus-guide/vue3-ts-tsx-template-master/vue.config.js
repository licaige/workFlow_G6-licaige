const webpack = require('webpack')
const path = require('path')

module.exports = {
  // 基本路径
  publicPath: './',
  // 输出文件目录
  outputDir: 'dist',
  // eslint-loader 是否在保存的时候检查
  lintOnSave: true,
  // webpack配置
  // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
  //   chainWebpack: (config) => {},
  configureWebpack: {
    // 开发生产共同配置
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@lib': path.resolve(__dirname, './src/library'),
      },
      extensions: ['.js', '.json', '.vue'],
    },
  },
  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: true,
  // css相关配置
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    // extract: true,
    // 开启 CSS source maps?
    sourceMap: false,
    // css预设器配置项
    loaderOptions: {},
    // 启用 CSS modules for all css / pre-processor files.
    modules: false,
  },
  // webpack-dev-server 相关配置
  devServer: {
    open: false,
    host: '0.0.0.0',
    port: 9527,
    https: false,
    hot: true,
    disableHostCheck: true,
    // hotOnly: true
    // proxy: {
    //     // 设置代理
    //     // proxy all requests starting with /api to jsonplaceholder
    //     'http://localhost:8080/': {
    //         target: 'http://baidu.com:8080', //真实请求的目标地址
    //         changeOrigin: true,
    //         pathRewrite: {
    //             '^http://localhost:8080/': ''
    //         }
    //     }
    // },
    before: function (app) {
      app.use(require('./mock/mockServer.ts'))
    },
  },
  // 第三方插件配置
  pluginOptions: {
    // ...
  },
}
