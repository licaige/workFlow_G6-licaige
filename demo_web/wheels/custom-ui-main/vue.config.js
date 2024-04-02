const { defineConfig } = require('@vue/cli-service')
const path = require("path")

module.exports = defineConfig({
  transpileDependencies: true,
  // 修改pages入口
  pages: {
    index: {
      entry: "examples/main.ts",
      template: "public/index.html",
      filename: "index.html"
    }
  },
  outputDir: "lib", // 将文件打包到lib目录，默认为dist
  // 扩展 webpack配置
  chainWebpack: (config) => {
    config.resolve.alias
      .set("~", path.resolve("packages"))
      .set("@", path.resolve("examples"))
  }
})
