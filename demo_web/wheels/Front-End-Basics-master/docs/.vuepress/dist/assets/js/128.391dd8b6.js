(window.webpackJsonp=window.webpackJsonp||[]).push([[128],{595:function(e,s,r){"use strict";r.r(s);var o=r(45),t=Object(o.a)({},(function(){var e=this,s=e.$createElement,r=e._self._c||s;return r("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[r("h1",{attrs:{id:"认识-browserslist"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#认识-browserslist"}},[e._v("#")]),e._v(" 认识 browserslist")]),e._v(" "),r("p",[r("a",{attrs:{href:"https://github.com/browserslist/browserslist",target:"_blank",rel:"noopener noreferrer"}},[e._v("browserslist"),r("OutboundLink")],1),e._v(" 定义了一套浏览器兼容配置标准，可以让众多前端开发工具之间可以共享一套配置。")]),e._v(" "),r("p",[e._v("支持的前端开发工具列表：")]),e._v(" "),r("ul",[r("li",[e._v("Autoprefixer")]),e._v(" "),r("li",[e._v("Babel")]),e._v(" "),r("li",[e._v("postcss-preset-env")]),e._v(" "),r("li",[e._v("eslint-plugin-compat")]),e._v(" "),r("li",[e._v("stylelint-no-unsupported-browser-features")]),e._v(" "),r("li",[e._v("postcss-normalize")]),e._v(" "),r("li",[e._v("obsolete-webpack-plugin")])]),e._v(" "),r("h2",{attrs:{id:"browserslist-相关工具"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#browserslist-相关工具"}},[e._v("#")]),e._v(" browserslist 相关工具")]),e._v(" "),r("ul",[r("li",[r("a",{attrs:{href:"https://github.com/browserslist/browserslist-ga",target:"_blank",rel:"noopener noreferrer"}},[e._v("browserslit-ga"),r("OutboundLink")],1),e._v(" 和 "),r("a",{attrs:{href:"https://github.com/browserslist/browserslist-ga-export",target:"_blank",rel:"noopener noreferrer"}},[e._v("browserslist-ga-export"),r("OutboundLink")],1),e._v(" ： 该工具能生成访问你运营的网站的浏览器的版本分布数据，以便用于类似 "),r("code",[e._v("0.5% in my stats")]),e._v(" 查询条件，前提是你运营的网站部署有 Google Analytics。")]),e._v(" "),r("li",[r("a",{attrs:{href:"https://github.com/browserslist/browserslist-useragent-regexp",target:"_blank",rel:"noopener noreferrer"}},[e._v("browserslist-useragent-regexp"),r("OutboundLink")],1),e._v(" ： 将 browserslist 查询编译为 regexp 以测试浏览器 useragent。可以用于展示“暂不支持你的浏览器”等信息。")]),e._v(" "),r("li",[r("a",{attrs:{href:"https://github.com/browserslist/browserslist-useragent-ruby",target:"_blank",rel:"noopener noreferrer"}},[e._v("browserslist-useragent-ruby"),r("OutboundLink")],1),e._v(" ： 功能同上，是一个 Ruby 库。")]),e._v(" "),r("li",[r("a",{attrs:{href:"https://github.com/Nyalab/caniuse-api",target:"_blank",rel:"noopener noreferrer"}},[e._v("caniuse-api"),r("OutboundLink")],1),e._v(" ：请求 caniuse 数据检查浏览器的兼容性。")]),e._v(" "),r("li",[r("code",[e._v("npx browserslist")]),e._v(" ： 在前端工程目录下运行此命令，可以输出当前工程的目标浏览器列表。")])]),e._v(" "),r("p",[e._v("其他的工具介绍可以查看"),r("a",{attrs:{href:"https://github.com/browserslist/browserslist#tools",target:"_blank",rel:"noopener noreferrer"}},[e._v("官方文档"),r("OutboundLink")],1)]),e._v(" "),r("h2",{attrs:{id:"browserslist-配置文件和查询顺序"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#browserslist-配置文件和查询顺序"}},[e._v("#")]),e._v(" browserslist 配置文件和查询顺序")]),e._v(" "),r("ol",[r("li",[e._v("工具自身的配置，例如 Autoprefixer 工具配置中的 browsers 属性")]),e._v(" "),r("li",[r("strong",[e._v("当前目录或者上级目录的 "),r("code",[e._v("package.json")]),e._v(" 配置文件里面的 "),r("code",[e._v("browserslist")]),e._v(" 配置项（推荐）")])]),e._v(" "),r("li",[e._v("当前目录或者上级目录的 "),r("code",[e._v(".browserslistrc")]),e._v(" 配置文件")]),e._v(" "),r("li",[e._v("当前目录或者上级目录的 "),r("code",[e._v("browserslist")]),e._v(" 配置文件")]),e._v(" "),r("li",[r("code",[e._v("BROWSERSLIST")]),e._v(" 环境变量")]),e._v(" "),r("li",[e._v("如果以上配置均不能提供一个有效的配置，browserslist 将采用默认配置："),r("code",[e._v("> 0.5%, last 2 versions, Firefox ESR, not dead")])])]),e._v(" "),r("div",{staticClass:"language-json extra-class"},[r("pre",{pre:!0,attrs:{class:"language-json"}},[r("code",[r("span",{pre:!0,attrs:{class:"token comment"}},[e._v("// package.json")]),e._v("\n"),r("span",{pre:!0,attrs:{class:"token comment"}},[e._v("// 默认配置：> 0.5%, last 2 versions, Firefox ESR, not dead")]),e._v("\n"),r("span",{pre:!0,attrs:{class:"token property"}},[e._v('"browserslist"')]),r("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v(" "),r("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("[")]),r("span",{pre:!0,attrs:{class:"token string"}},[e._v('"defaults"')]),r("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("]")]),e._v("\n")])])]),r("h3",{attrs:{id:"配置区分环境"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#配置区分环境"}},[e._v("#")]),e._v(" 配置区分环境")]),e._v(" "),r("p",[e._v("browserslist 可以通过 "),r("code",[e._v("BROWSERSLIST_ENV")]),e._v(" 或者 "),r("code",[e._v("NODE_ENV")]),e._v(" 选择使用哪些配置，如果这两个环境变量都没指定，那就首先看一下有没有 "),r("code",[e._v("production")]),e._v(" 这个环境配置，如果 "),r("code",[e._v("production")]),e._v(" 环境也没有，就直接使用 "),r("code",[e._v("defaults")]),e._v(" 配置。")]),e._v(" "),r("p",[e._v("例如 "),r("code",[e._v("package.json")]),e._v(" 中：")]),e._v(" "),r("div",{staticClass:"language- extra-class"},[r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[e._v('  "browserslist": {\n    "production": [\n      "> 1%",\n      "ie 10"\n    ],\n    "modern": [\n      "last 1 chrome version",\n      "last 1 firefox version"\n    ],\n    "ssr": [\n      "node 12"\n    ]\n  }\n')])])]),r("p",[e._v("在 "),r("code",[e._v(".browserslistrc")]),e._v(" 中：")]),e._v(" "),r("div",{staticClass:"language- extra-class"},[r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[e._v("[production]\n> 1%\nie 10\n\n[modern]\nlast 1 chrome version\nlast 1 firefox version\n\n[ssr]\nnode 12\n")])])]),r("h2",{attrs:{id:"具体参数"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#具体参数"}},[e._v("#")]),e._v(" 具体参数")]),e._v(" "),r("p",[e._v("browserslist 的配置内容可以理解为一个查询集合，根据这个集合来定制我们项目的兼容范围")]),e._v(" "),r("ul",[r("li",[r("code",[e._v("defaults")]),e._v(" ： 默认支持的浏览器 ("),r("code",[e._v("> 0.5%, last 2 versions, Firefox ESR, not dead")]),e._v(")")]),e._v(" "),r("li",[e._v("统计范围相关\n"),r("ul",[r("li",[r("code",[e._v("> 5%")]),e._v(" ： 兼容全球浏览器使用数量占比 5% 以上的类型。数值可以根据实际场景自定义，同理，除了 "),r("code",[e._v(">")]),e._v(" 也支持 "),r("code",[e._v(">=")]),e._v("、"),r("code",[e._v("<")]),e._v("、"),r("code",[e._v("<=")]),e._v("。")]),e._v(" "),r("li",[r("code",[e._v("> 5% in US")]),e._v(" ：指定国家使用率覆盖（双字母构成，例如 "),r("code",[e._v("CH")]),e._v("、"),r("code",[e._v("JP")]),e._v(" 等等）")]),e._v(" "),r("li",[r("code",[e._v("> 5% in alt-AS")]),e._v(" ： 指定大洲的使用覆盖率（双字母后缀，例如 "),r("code",[e._v("alt-af")]),e._v("、"),r("code",[e._v("alt-as")]),e._v(" 等等）")]),e._v(" "),r("li",[r("code",[e._v("> 5% in my stats")]),e._v(" ： 自己网站的使用覆盖率，需要结合 "),r("code",[e._v("browserslist-ga-export")])]),e._v(" "),r("li",[r("code",[e._v("cover 99.5%")]),e._v(" ： 覆盖全球 99.5% 的浏览器类型，即支持绝大多数的现代浏览器。")]),e._v(" "),r("li",[r("code",[e._v("cover 99.5% in US")]),e._v(" ： 与前面同理。")]),e._v(" "),r("li",[r("code",[e._v("cover 99.5% in my stats")]),e._v(" ： 与前面同理。")])])]),e._v(" "),r("li",[e._v("最近版本\n"),r("ul",[r("li",[r("code",[e._v("last 2 versions")]),e._v(" ： 每个浏览器支持的最新 2 个版本")]),e._v(" "),r("li",[r("code",[e._v("last 2 Chrome versions")]),e._v(" ： Chrome 浏览器支持的最新 2 个版本")]),e._v(" "),r("li",[r("code",[e._v("last 2 major versions")]),e._v(" ： 每个浏览器支持的最新 2 个主分支版本")])])]),e._v(" "),r("li",[e._v("Node 版本\n"),r("ul",[r("li",[r("code",[e._v("maintained node versions")]),e._v(" ： 兼容所有仍被支持的 NODE 版本")]),e._v(" "),r("li",[r("code",[e._v("node 10 and node 10.4")]),e._v(" ： 兼容 "),r("code",[e._v("10.x.x")]),e._v(" 或 "),r("code",[e._v("10.4.x")]),e._v(" 版本")]),e._v(" "),r("li",[r("code",[e._v("current node")]),e._v(" ： 兼容当前环境下的 NODE 版本")])])]),e._v(" "),r("li",[e._v("浏览器版本\n"),r("ul",[r("li",[r("code",[e._v("ie 6-8")]),e._v(" ： 设置兼容 IE 版本范围")]),e._v(" "),r("li",[r("code",[e._v("not ie <= 8")]),e._v(" ： 设置不支持的 IE 版本范围")]),e._v(" "),r("li",[r("code",[e._v("Firefox > 20")]),e._v(" ： 设置火狐的版本范围，同理也支持 "),r("code",[e._v(">=")]),e._v("、"),r("code",[e._v("<")]),e._v(" 及 "),r("code",[e._v("<=")]),e._v("。")]),e._v(" "),r("li",[r("code",[e._v("Firefox ESR")]),e._v(" ： 火狐延长支持板的最新版本")]),e._v(" "),r("li",[r("code",[e._v("iOS 7")]),e._v(" ： 设置支持的 iOS 7 浏览器版本")])])]),e._v(" "),r("li",[r("code",[e._v("last 2 years")]),e._v(" ： 最近 2 年发布的浏览器版本")]),e._v(" "),r("li",[r("code",[e._v("since 2015")]),e._v(" ： 自 2015 年发布的浏览器版本")]),e._v(" "),r("li",[r("code",[e._v("unreleased versions")]),e._v(" 或 "),r("code",[e._v("unreleased Chrome versions")]),e._v(" ：alpha 和 beta 版本")]),e._v(" "),r("li",[r("code",[e._v("extends browserslist-config-mycompany")]),e._v(" ：从 browserslist-config-mycompany 中继承配置。")]),e._v(" "),r("li",[r("code",[e._v("dead")]),e._v(" ： 一年内未被官方维护更新的版本，到现在为止是 "),r("code",[e._v("IE 11")]),e._v(", "),r("code",[e._v("IE_Mob 11")]),e._v(", "),r("code",[e._v("BlackBerry 10")]),e._v(", "),r("code",[e._v("BlackBerry 7")]),e._v(", "),r("code",[e._v("Samsung 4")]),e._v(", "),r("code",[e._v("OperaMobile 12.1")]),e._v(" 和所有版本的 "),r("code",[e._v("Baidu")])])]),e._v(" "),r("p",[r("strong",[e._v("在所有的查询条件前都可以添加 "),r("code",[e._v("not")]),e._v(" 取非，例如 "),r("code",[e._v("not dead")]),e._v("。并且条件可以进行集合操作，通过 "),r("code",[e._v("or")]),e._v(" 或 "),r("code",[e._v(",")]),e._v(" 进行并集操作，通过 "),r("code",[e._v("and")]),e._v(" 进行交集操作，"),r("code",[e._v("not")]),e._v(" 去非包含关系集合。具体查询组合效果可以查看"),r("a",{attrs:{href:"https://github.com/browserslist/browserslist#query-composition",target:"_blank",rel:"noopener noreferrer"}},[e._v("官方文档"),r("OutboundLink")],1)])])])}),[],!1,null,null,null);s.default=t.exports}}]);