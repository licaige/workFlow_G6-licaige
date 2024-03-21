import { defineClientConfig } from "@vuepress/client";

import DivinePlus from "../../packages/index";
import "../../packages/theme-chalk/index.scss";

// hightlight.js
// @highlightjs/vue-plugin
import "highlight.js/styles/atom-one-dark-reasonable.css";
import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";
// import hljsVuePlugin from "@highlightjs/vue-plugin"; // A. 打包说明文档时，注释掉AB两个地方的代码，然后手动引入高亮style

hljs.registerLanguage("javascript", javascript);

export default defineClientConfig({
  enhance({ app }) {
    app.use(DivinePlus);
    // app.use(hljsVuePlugin); // B
  },
});
