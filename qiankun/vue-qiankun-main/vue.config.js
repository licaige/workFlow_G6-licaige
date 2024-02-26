/*
 * @Descripttion:
 * @version:
 * @Author: chunwen (chunwen.zou@caibeitv.com)
 * @Date: 2021-04-07 18:04:24
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-11-09 23:22:15
 */
const path = require('path')

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/projectA/' : '/',
  configureWebpack: {
    resolve: {
      extensions: ['.js', '.vue', '.json', '.ts', '.tsx'],
      alias: {
        '@/': path.resolve(__dirname, 'src/'),
      },
    },
  },
  devServer: {
    port: 4000,
    // historyApiFallback: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8888',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '',
        },
      },
    },
  },
}
