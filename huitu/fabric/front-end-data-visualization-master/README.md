# 前端可视化笔记

<br>

> 插播一则消息：
>
> 我最近在编写 [《fabric.js中文教程》](https://k21vin.gitee.io/fabric-js-doc/)，如果想学习 `fabric.js` ，这份教程应该可以在一定程度上帮到你~

<br>


## 项目介绍
 **[:computer: 点击预览 「前端可视化笔记」 :rocket:  :rocket:  :rocket: ](http://k21vin.gitee.io/front-end-data-visualization)**

![](./preview.gif)

<br>

本项目是我工作和学习中整理出来的前端可视化demo，部分代码会有详细注释。

部分demo还配备图文讲解，可在 [我的掘金主页中查找到相应文章（点击即可跳转，方便的话帮我的文章点个赞吧）](https://juejin.cn/user/2673620576140030/posts)

<br>

项目使用 `vite^2.5.4` 搭建。

项目中用到 `vue^3.2` 、`vue-router`、`vuex` 做基础建设，使用了 `element plus` 做基础ui布局。

本项目是可视化方面的笔记，包含了：
- `原生三件套特效`
- `svg`
- `canvas`
- `ECharts`
- `百度地图`
- `OpenLayers`
- `ThreeJS`
- `FabricJS`

<br><br>

## 运行
```
# 初始化项目，下载依赖包
npm install

# 启动开发环境（默认端口3000，可以调试）
npm run dev

# 启动生产环境（运行dist，默认端口5000，难以调试）
npm run serve
```

<br><br>

## 关于运行报错


### 1、缺少 echarts/theme/vintage2.js

因为笔记中记录了 **“如何自定义 `ECharts` 主题”**，所以在 `npm install` 后，需要把 `src/assets/echarts/theme` 目录下的 `vintage2.js` 文件拷贝到 `node_modules/echarts/theme` 目录下。

<br>

### 2、初次运行时报错
*已修复，但不保证某些电脑运行时还会出现该错误 [2021-09-07]*

<br>

> 错误代码：-4058

手动执行 `node node_modules/esbuild/install.js`
然后再使用启动命令 `npm run dev`

<br><br>

## 推荐仓库
[:rocket: ol在vue2中运行，仓库地址  :rocket:  :rocket:  :rocket:  :rocket: ](https://gitee.com/k21vin/vue-openlayers)

[:rocket: 原生环境使用fabrif.js，仓库地址  :rocket:  :rocket:  :rocket:  :rocket: ](https://gitee.com/k21vin/fabricjs-demo)

<br><br>

## 推荐阅读

### 日常工作与团队合作

- [《Vite 搭建 Vue2 项目（Vue2 + vue-router + vuex）》](https://juejin.cn/post/6988808776291713060)
- [《前端规范落地，团队级的解决方案》](https://juejin.cn/post/7046171572129759262)
- [《『前端必备』本地数据接口 —— json-server 从入门到膨胀》](https://juejin.cn/post/7043424909472563208)
- [《前端需要的免费在线api接口》](https://juejin.cn/post/7041461420818432030)

<br>

### 前端特效

- [《这18个网站能让你的页面背景炫酷起来》](https://juejin.cn/post/7044397764368662559)
- [《纯CSS：动态渐变背景【一分钟学会】》](https://juejin.cn/post/7040376300296470535)
- [《视差特效的原理和实现方法》](https://juejin.cn/post/7040283893106212895)
- [《纯CSS实现『斑马纹理投影文字』》](https://juejin.cn/post/7009637424611491848)
- [《纯css实现117个Loading效果（下）》](https://juejin.cn/post/7037660617779445796)
- [《纯css实现117个Loading效果（中）》](https://juejin.cn/post/7037636080539009038)
- [《纯css实现117个Loading效果（上）》](https://juejin.cn/post/7037036742985121800)
- [《console.log也能插图！！！》](https://juejin.cn/post/6913554505841770509)
- [《给console来的样式》](https://juejin.cn/post/6911337056678379534)

<br>

### 能力进阶

- [《原生 node 搭建最基础的 npm 工具包》](https://juejin.cn/post/6991300926099357709)
- [《阅读Skeleton.css源码，改善睡眠质量（尽管它只有419行代码）》](https://juejin.cn/post/7032103972085334024)
- [《『 JS算法-力扣557题』反转字符串中的单词 III》](https://juejin.cn/post/7011336873788309541)
- [《【JS】作用域（入门篇）》](https://juejin.cn/post/6957852122268794887)
- [《如何用 CSS 选择符杀死队友》](https://juejin.cn/post/6915047570226020359)

<br>

### Fabric.js
- [《Fabric.js 从入门到________》](https://juejin.cn/post/7026941253845516324)
- [《Fabric.js 线性渐变和径向渐变》](https://juejin.cn/post/7022534821524013087)
- [《Fabric.js 右键菜单》](https://juejin.cn/post/7051373700209180679)
- [《Fabric.js 更换图片的3种方法（包括更换分组内的图片，以及存在缓存的情况）》](https://juejin.cn/post/7052719026874613773)
- [《Fabric.js 3个api设置画布宽高》](https://juejin.cn/post/7053049468601499684)
- [《Fabric.js 将本地图像上传到画布背景》](https://juejin.cn/post/7055201274693681160)
- [《Fabric.js 删除元素（带过渡动画）》](https://juejin.cn/post/7056599707094614024)
- [《Fabric.js 摆正元素的4种方法（带过渡动画）》](https://juejin.cn/post/7057392358391808008)
- [《Fabric.js 自由绘制矩形（逐一分析4种操作方向带来的影响）》](https://juejin.cn/post/7058093223566114847)

<br>

<br>

# 关于我

雷猴，我是德育处主任，一个喜欢吃喝玩乐的地球生物。只要和工作无关的事情我都觉得很有趣。

<br>

我正在整理前端可视化相关库的笔记，不定期在 [掘金](https://juejin.cn/column/7050370347324932132)、[CSDN](https://blog.csdn.net/weixin_39415598)、[思否](https://segmentfault.com/) 更新。

如果方便的话，可以点进我的 [掘金主页 **帮我的文章点个赞~**](https://juejin.cn/user/2673620576140030/posts) ，或者点其他平台也行。感恩🌷

<br>

已经停更了很久的 **订阅号（德育处主任）** 也有计划重启了，我打算把每个我学过的库整理成独立的专栏，以循序渐进的方式和大家一起摄入知识~

![公众号：德育处主任](OfficialAccounts.gif)

<br>

> 最后最后，如果你觉得我的文章对你有帮助，可以请我的猫吃个罐头~
>
> ![公众号：德育处主任](q.png)

