# Lerna包管理

![](https://user-gold-cdn.xitu.io/2019/2/13/168e50137db9546c?w=2500&h=1250&f=png&s=587754)

## 前言

和大家一起学习探讨包管理策略，monorepo 和 multrepo 区别，Lerna 的基本操作和原理，Lerna 的适用场景，同时深入到 Lerna 源码探究它是如何实现 文件软链。

### Lerna开发环境源码

> [https://github.com/dkypooh/front-end-develop-demo/tree/master/base/lerna](https://github.com/dkypooh/front-end-develop-demo/tree/master/base/lerna)

### Lerna 简介

> A tool for managing JavaScript projects with multiple packages. Lerna is a tool that optimizes the workflow around managing multi-package repositories with git and npm.

**翻译：** Lerna 是一个用来优化托管在 git\\npm 上的多 package 代码库的工作流的一个管理工具,可以让你在主项目下管理多个子项目，从而解决了多个包互相依赖，且发布时需要手动维护多个包的问题。

**关键字：** 多仓库管理，多包管理，自动管理包依赖

### 通过本章读者可以学习了解到什么？

1.  lerna 基本操作，如何更新，链接，发布等。
2.  lerna 采用的是 monorepo 模式，和 multrepo 有什么区别。
3.  lerna 是如何实现内部文件软链，是 npm link 么。
4.  lerna 的适用场景以及包管理策略。
5.  lerna 如何提升安装性能。
6.  lerna 如何指定发布版本，如何指定发布子目录。

### lerna的使用策略

![image.png](https://user-gold-cdn.xitu.io/2019/1/23/168766fa43b753bf?w=696&h=404&f=png&s=36370)

我们一般会把一个大型项目才分两大部分：业务模块 + 通用模块。 由于通用模块会被多个业务模块使用，往往是通过 NPM 包提供服务。lerna 很好的管理多个包以及他们的依赖关系。

最佳案例：React 仓库， Rax 仓库

## Lerna核心原理

### monorepo 和 multrepo 区别

**monorepo：** 是将所有的模块统一的放在一个主干分支之中管理。

**multrepo：** 将项目分化成为多个模块，并针对每一个模块单独的开辟一个reporsitory来进行管理。

![image.png](https://user-gold-cdn.xitu.io/2019/1/23/168766fa438d2522?w=1206&h=856&f=png&s=96924)

### lerna 如何实现软链

lerna 是如何做到内部模块的软链和管理，对于作者来说是一个很大的困惑？在 npm 下，npm link 可以在系统目录下建立包软链。软链可以不需要发布，就可以使用本地包，很好的提高开发效率。

作者阅读源码发现 lerna 实现软链使用了 `symlink-dependencies` 包。最终使用 `fs.symlink` 函数实现了文件软链。

![image.png](https://user-gold-cdn.xitu.io/2019/1/23/168766fa44d8b898?w=1418&h=690&f=png&s=186541)

源码解析如下：

1.  command 基类是 lerna 的核心包，提供了各种指令
2.  utils 目录下提供了文件软链的各种方法，例如：create-symlink(创建软链)，symlink-dependencies(软链依赖)等
3.  在 create-symlink 文件中， 核心函数 `createSymbolicLink` 使用了 `fs` 文件类的 `symlink` 方法实现了文件依赖管理

`createSymbolicLink` 函数源码地址

> [https://github.com/lerna/lerna/blob/master/utils/create-symlink/create-symlink.js#L20](https://github.com/lerna/lerna/blob/master/utils/create-symlink/create-symlink.js#L20)

## Lerna 环境配置

### lerna 初始化

```
npm i lerna -g 				// 全局安装lerna
lerna init 					// 初始化lerna目录

```

### lerna.json 基础配置

```
{
"version": '0.0.1',
"npmClient": 'cnpm',                        // yarn, npm
"packages": ['packages/*', 'xx/*'],         // 管理多个目录
"command": {
    "publish": {                            // lerna publish配置，忽略*.md文件，
        "ignoreChanges": ["*.md"],
        "message": "chore(release): publish"
    },
    "bootstrap": {                          // lerna bootstrap配置，忽略component-*包
      "ignore": "component-*",
      "npmClientArgs": ["--no-package-lock"]
    }
}

```

### lerna 目录结构

![image.png](https://user-gold-cdn.xitu.io/2019/1/23/168766fa4623da66?w=1318&h=660&f=png&s=235505)

使用 Lerna 注意事项：

1.  Lerna 会管理 packages 下面的包的依赖关系，对于 package-2 依赖 package-1，lerna可以帮助自动管理。
2.  lerna 可以管理多个目录的依赖关系，只需要在 lerna.json 的 packages 属性配置。
3.  当遇到异常情况需要更新或者清理缓存时， 可以使用 `lerna clean` 指令。

## Lerna 基本操作

本小节会介绍 lerna 基本操作命令，如何创建一次lerna的工作流。

lerna的常用命令：list, bootstrap, clean, changed, publish。

### 安装依赖

```
lerna bootstrap

```

### 查看本地包列表

```
lerna list

```

### 删除安装依赖

```
lerna clean

```

### 何建立软链

```
lerna link

```

### 发布安装包

```
lerna publish

```

### 场景使用实例

创建一次完整的 lerna 工作流有如下流程：

> lerna boostrap(依赖包安装) --> 开发模块 --> git commit --> lerna changed(查看包变化) --> lerna publish。

如下操作实例

```
lerna bootstrap     // 安装依赖包
lerna list          // 本地依赖包
lerna changed       // 待发布包列表
lerna publish       // 发布

```

## Lerna 高阶操作

### publish 高级应用

某些发布的情况，开发者需要指定安装包版本，或者指定子目录发布。

```
lerna publish --dist-tag next   // 指定当前版本号
lerna publish --contents dist   // 指定dist目录为发布目录

```

### 性能提升

如果使用 `lerna bootstrap` 命令会在每个子目录都安装 `node_modules` 依赖，导致性能变差，在开发环境下，可以使用 `--hoist` 在 `lerna` 根目录安装依赖来提升性能。

```
lerna bootstrap --hoist         // 提升到根目录

```

### 结语

Lerna 对于大部分的同学来说相对还比较陌生，但是越来越多的国内外公司都在使用 Lerna 管理他们的项目，当前版本也很稳定，请放心使用。

例如：[babel/babel](https://github.com/babel/babel), [facebook/jest](https://github.com/facebook/jest), [alibaba/rax](https://github.com/alibaba/rax)。

Lerna 解决的是多包依赖管理的问题，可以动态建立软链，自动更新依赖，大大减少的人力，降低了出错的概率。

下面一章将要学习 React 组件, 大家需要提前了解下 React 基本知识和生命周期, 查看 [React 官网](https://reactjs.org/)。 当前版本 `React@16.8.1` 支持了 `Hooks` 提案，一起来学习此特性。

## 思考题

Q: 简单搭建一个 Lerna 管理项目，如果两个包互相依赖，可以自动更新

## 参考文献

*   [使用lerna优雅地管理多个package](https://zhuanlan.zhihu.com/p/35237759)
*   [lerna管理前端packages的最佳实践](https://juejin.im/post/5a989fb451882555731b88c2)
*   [Lerna 官网](https://lernajs.io/)