# 参与贡献

[X-BUILD](https://github.com/code-device/x-build) 目前已处于正式版状态，我们会逐步总结出更多适合典型业务场景的业务开发需求。

## 提供建议与提交 BUG

有任何修改和建议都可以通过提交 [Issue](https://github.com/code-device/x-build/issues) 的方式与我们沟通。

## 前序准备

你需要在本地安装 [node.js](https://nodejs.org/en/) 和 [git](https://git-scm.com/)。本项目技术栈基于 ES6+、[vue3.0](https://v3.cn.vuejs.org/)、[vuex4.0](https://next.vuex.vuejs.org/)、[vue-router4.0](https://next.router.vuejs.org/zh/index.html) 和 [element-plus](https://element-plus.gitee.io/#/zh-CN)，全面拥抱 [typescript](https://www.tslang.cn/index.html)，使用或贡献本项目需要提前了解和学习这些知识。

除了上述知识需要掌握之外，你还需要熟悉 X-BUILD，在此新版本之前，已经经历过 **5** 个版本的迭代，目前开发的是基于 Vue3.0 的 **v6.0** 版本。

你需要了解：我在做一个样的脚手架？目标是什么？能解决哪些痛点？

以下资料可能会帮助你更快的了解 X-BUILD：

- v6.0 版本请在 next 分支下提交 PR。
- dev 分支提供了 vue2.0 版本大部分功能的实现，此分支并未发布于 npm，仅供参考。
- 阅读 [《基于Vue的前端架构，我做了这15点》](https://juejin.cn/post/6901466994478940168)，这篇文章是我在最近使用 vue2 开发一些项目时总结的一些经验，虽然得到了许多人的认可，但是**不能公布公司内部使用的脚手架源码**，这也是我要升级 X-BUILD 的一个重要因素。
- 阅读 [《X-BUILD v5.0 文档》](https://codexu.github.io/)，这是一个不集成任何框架的版本。

## 开发

**【必读】请严格遵循 [Issues / PR 编写建议](https://github.com/code-device/x-build/issues/25)。**

- Fork X-BUILD 仓库。
- 执行 git clone -b next {fork 仓库地址} 。
- 根据认领任务进行相关代码开发。
- 提交 Pull requests，等待回复。

## 文档建设

如果你对编辑文档感兴趣，在详细了解 X-BUILD 后可以参与文档的建设，当然前提是你要花点时间了解下面的内容：

- [Vuepress](https://vuepress.vuejs.org/zh/)
- [Markdown 语法](https://www.runoob.com/markdown/md-tutorial.html)

我们已经搭建好了 CI/CD，你只需要提交代码，在 Pull Request 之后会自动构建新的文档：

- 基于 **GitHub Actions** + **Github Pages** 生成文档。
- 文档目录： `/documents/docs`。
- 构建后的文件将会提交到 **gh-pages** 分支下。
- 整个过程需要花费**1分钟**左右的时间。

## 加入组织

首先欢迎加入 [CodeDevice](https://github.com/code-device)，协助我们将 X-BUILD 开发的更加优秀。

- 根据提交 PR 或 Issues 的活跃程度，等待接收 CodeDevice 的邀请。

## 最后

请在不影响正常的工作和生活贡献代码，感谢你的支持。