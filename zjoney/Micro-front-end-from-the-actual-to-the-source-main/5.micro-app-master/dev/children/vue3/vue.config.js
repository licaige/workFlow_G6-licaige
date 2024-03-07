module.exports = {
  publicPath: '/micro-app/vue3/',
  outputDir: 'vue3',
  productionSourceMap: false,
  devServer: {
    hot: true,
    disableHostCheck: true,
    port: 4002,
    overlay: {
      warnings: false,
      errors: true,
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  lintOnSave: false,
  // 自定义webpack配置
  configureWebpack: {
    output: {
      jsonpFunction: `webpackJsonp-chile-vue3`,
    },
    module: {
      rules: [
        {
          test: /\.mjs$/,
          include: /node_modules/,
          type: "javascript/auto"
        }
      ]
    }
  },
  transpileDependencies: ['element-plus'], // 解决element-plus使用 ?. 操作符导致启动失败的问题
}
