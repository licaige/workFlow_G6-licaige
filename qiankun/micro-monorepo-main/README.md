# 微前端与Monorepo架构实践demo

本项目是一个关于微前端与Monorepo架构实践的示例项目。我们展示如何在实际的项目开发中结合微前端与Monorepo的优点，实现高效的代码管理和团队协作开发。

## 准备工作

确保您的计算机上已经安装以下环境：
- Node.js (推荐使用版本 14.x 或以上)
- pnpm (作为包管理工具)

## 快速上手

1. 克隆此项目：

```bash
git clone https://github.com/yukiyukixing/micro-monorepo.git
```

1. 进入项目目录并安装依赖：

```bash
cd micro-monorepo
pnpm i
```

1. 启动项目：

```bash
pnpm dev
```

此时，主应用项目会在`localhost:8080`上运行。您可以打开浏览器，访问该地址来查看项目效果。

## 项目目录结构

```
micro-monorepo/
│
├── main/               # 主应用，集成各个微前端应用
│
├── micro/              # 微前端应用目录
│   ├── micro1/         # 微前端应用1
│   ├── micro2/         # 微前端应用2
│
└── ...                 # 其他配置文件和目录
```

## 贡献指南

如果您希望为此项目做出贡献，我们非常欢迎！请确保在提交PR之前阅读了我们的贡献指南。

## 联系方式

如有任何问题或建议，欢迎在GitHub Issues中提出，或通过邮件与我们联系。
