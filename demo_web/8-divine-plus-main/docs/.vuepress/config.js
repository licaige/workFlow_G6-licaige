const { head, theme, plugins, bundler } = require("./utils/config.js");

module.exports = {
  lang: "zh-CN",
  title: "DivinePlus",
  description: "vue3 + webpack5 + ts + vuepress2 组件库",
  open: false,
  port: 7070,
  head,
  theme,
  plugins,
  bundler,
};
