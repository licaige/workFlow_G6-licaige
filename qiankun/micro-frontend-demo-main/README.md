# 微前端项目Demo

这是一个微前端项目demo，采用[Module Federation](https://webpack.js.org/concepts/module-federation/)技术构建。

## 项目介绍

这个项目旨在展示如何使用微前端架构将多个独立部署的前端应用整合到一个主应用中。每个子应用都可以独立开发、测试和部署，而主应用则负责加载和呈现这些子应用。

## 功能特点

1. **独立部署**：每个子应用都可以独立部署，互不干扰。
2. **技术栈无关**：子应用可以使用不同的技术栈（例如React、Vue等）。
3. **共享状态**：通过全局状态管理工具如Redux或Vuex实现子应用间的状态共享。

## 开始

### 克隆仓库

```bash
git clone https://github.com/yukiyukixing/micro-frontend-demo.git
cd micro-frontend-demo/main
```

### 安装依赖

```bash
pnpm i
```

### 启动项目

```bash
pnpm dev
```

## 结构

- **主应用**：micro-frontend-demo/main。它负责加载和呈现子应用。
- **子应用1**：micro-frontend-demo/micro1。
- **子应用2**：micro-frontend-demo/micro2。

>Tips：上面的3个应用都是可以独立运行访问的。

## 贡献

欢迎任何形式的贡献！如果你发现了错误或有新的功能建议，请提交一个Issue或Pull Request。
