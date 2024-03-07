# 基于 vite 构建微应用（qiankun）

## 什么是微前端

微前端（Micro-Frontends）是一种多个团队通过独立发布功能的方式来共同构建现代化 `web` 应用的技术手段及方法策略。它旨在解决单体应用在一个相对长的时间跨度下，由于参与的人员、团队的增多、变迁，从一个普通应用演变成一个巨石应用（Frontend Monolith）后，随之而来的应用不可维护的问题。这类问题在企业级 `Web` 应用中尤其常见。

微前端架构旨在将巨石应用拆分成多个可以独立开发、独立运行、独立部署的小应用，从而达到多个小应用共同构建一个大型应用的目的。

## 为什么要使用微前端

- 技术栈无关，微前端架构允许我们在不同的应用中使用不同的技术栈，例如：`React`、`Vue`、`Angular`、`JQuery` 等等。
- 独立开发、独立部署，微前端架构允许我们将一个庞大的应用拆分成多个小应用，这些小应用可以独立开发、独立部署，各个小应用之间又可以共用代码。
- 独立运行时，微前端架构允许我们将多个小应用独立运行在一个框架中，也可以将多个小应用运行在不同的框架中。
- 增量升级，微前端架构允许我们将不同技术栈的应用进行重构，从而达到技术栈升级的目的。
- 独立团队，微前端架构允许我们根据不同的业务模块组建不同的团队，从而实现真正的前后端分离。

[微应用（qiankun）之 vite 构建](https://juejin.cn/post/7271276760905334845)

## 项目介绍

基于 `vite` 构建微应用（qiankun），各应用涉及技术栈如下：

- 主应用(micro-main)：react18 + react-router6 + redux8 + qiankun2 + vite2
- 子应用(react-app)：react18 + react-router6 + qiankun2 + vite2
- 子应用(vue-app)：vue3 + vue-router4 + qiankun2 + vite2

## 项目启动

主应用(micro-main)

```zsh
cd micro-main && pnpm install && pnpm run dev
```

子应用(react-app)

```zsh
cd react-app && pnpm install && pnpm run dev
```

子应用(vue-app)

```zsh
cd vue-app && pnpm install && pnpm run dev
```
