# Babel编译及代码规范

![](https://user-gold-cdn.xitu.io/2019/2/13/168e50bf1d4d9b81?w=1800&h=400&f=png&s=141254)

## 前言

大家一起学习探讨 三大开发环境利器 ESLint, EditorConfig 和 Babel, 前两者属于代码规范，最后一个属于JavaScript的编译器。

浅谈 Babel 的 AST 编译过程，以及Babel 的 Plugin 和 Preset 的区别。

如何搭建项目开发静态代码检查规范，大厂的开箱即用的 EditorConfig 配置规则。

把三个知识点放在一起更好配合下文的React项目开发环境搭建实践。

### Babel + React 开发环境

> 源码地址：[https://github.com/dkypooh/front-end-develop-demo/tree/master/base/babel7-react](https://github.com/dkypooh/front-end-develop-demo/tree/master/base/babel7-react)

### 理解 Eslint 和 EditorConfig

ESLint 是一种可组装的 JavaScript 和 JSX 检查工具。 完全可配置，可以自定义每一个规则。

EditorConfig 是一个跨编辑器的项目统一编码样式管理规范，由文件定义格式和文本编辑插件格式。

### 理解 Babel

Babel 是一个代码编译器，输入代码编译输出代码 (source code => output code)。

### 开箱即用的 EditorConfig 配置规则

```
# 所有文件匹配
[*] 
indent_style = space                # 缩进样式
end_of_line = lf                    # 结束换行，cr回车
indent_size = 2                     # 缩进2个空格
charset = utf-8                     # 文件utf-8编码
trim_trailing_whitespace = true     # 去掉末尾空格
insert_final_newline = true         # 在最后插入一个新行

# md文件匹配
[*.md]
trim_trailing_whitespace = false    # 取消去掉末尾空格

```

在 VSCode 编辑器下要首先要下载 `EditorConfig` 插件，然后配置代码样式规划：

![](https://user-gold-cdn.xitu.io/2019/1/30/1689ccd2dad80ad8?w=740&h=290&f=png&s=50891)

## Babel编译原理

### AST语法解析实例

通过 AST 树形描述了表达式的语法结构。例如变量声明 （`VariableDeclaration`），字符穿字面量 （`StringLiteral`） 及值 （`value`）等等。

![](https://user-gold-cdn.xitu.io/2019/1/30/1689dd0d152cfcd8?w=1920&h=1080&f=png&s=195060)

如下是 AST 编译器地址：[AST链接地址](https://astexplorer.net/#/gist/e6af3d)

### Babel编译过程

![](https://user-gold-cdn.xitu.io/2019/1/30/1689d6f652979726?imageslim)

abel 的三个主要处理步骤分别是： **解析（parse）**，**转换（transform）**，**生成（generate）**。原理不是本章重点，具体可以查看参考文档\[Babel插件指南\]。

*   **解析：** 解析步骤接收代码并输出 AST。 这个步骤分为两个阶段：**词法分析（Lexical Analysis**和 **语法分析（Syntactic Analysis）**。
    *   **词法解析：** 词法分析阶段把字符串形式的代码转换为**令牌（tokens） 流。**
    *   **语法解析：** 语法分析阶段会把一个令牌流转换成 AST语法书的形式。
*   **转换:** 转换步骤接收 AST 并对其进行遍历，在此过程中对节点进行添加、更新及移除等操作。
*   **生成：** 代码生成步骤把最终（经过一系列转换之后）的 AST转换成字符串形式的代码，同时创建源码映射（source maps）。
    *   代码生成其实很简单：深度优先遍历整个 AST，然后构建可以表示转换后代码的字符串。

## Babel基础配置

Babel 是一个工具链，主要用于在旧的浏览器或环境中将 ECMAScript 2015+ 代码转换为向后兼容版本的 JavaScript 代码。

### babel-cli 命令行转换工具

```
# 工具安装 
$ npm i babel-cli -g

# 转码结果输出到标准输出
$ babel example.js

# 转码结果写入一个文件
# --out-file 或 -o 参数指定输出文件
$ babel example.js --out-file compiled.js
# 或者
$ babel example.js -o compiled.js

# 整个目录转码
# --out-dir 或 -d 参数指定输出目录
$ babel src --out-dir lib
# 或者
$ babel src -d lib

# -s 参数生成source map文件
$ babel src -d lib -s

```

### .babelrc 配置文件

在特定环境的时候，您可以用 env 选项来设置特定的配置, 如下在生产环境中指定插件：

```
{
  "env": {
    "production": {
      "plugins": ["transform-react-constant-elements"]
    }
  }
}

```

env 选项的值将从 process.env.BABEL\_ENV 获取，如果没有的话，则获取 process.env.NODE\_ENV 的值，它也无法获取时会设置为 `development` 。

您可以通过下面的方法设置环境变量, 也可以使用跨平台命令 `cross-env` ：

```
# 指定Babel环境
$ BABEL_ENV=production <commond>

# 跨平台使用
$ cross BABEL_ENV=production <commond>

```

### 查找规则

Babel 会在正在被转录的文件的当前目录中查找一个 `.babelrc` 文件。 如果不存在，它会遍历目录树，直到找到一个 `.babelrc` 文件，或一个 package.json 文件中有 "babel": {}。

### .babelrc 的几种配置方式

#### 通过 package.json 使用Babel

```
{
  "name": "my-package",
  "version": "1.0.0",
  "babel": {
    // my babel config here
  }
}

```

#### 通过 .babelrc 使用 Babel

```
{
    plugins: [],
    presets: []
}

```

### React 开发环境配置实例

如下是配置 React 开发环境的事例，需要用到 `es2015`, `react`, `stage-1`三个 Preset 预设装置。

```
# ES2015转码规则
$ npm install --save-dev babel-preset-es2015

# react转码规则
$ npm install --save-dev babel-preset-react

# ES7不同阶段语法提案的转码规则（共有4个阶段），选装一个
$ npm install --save-dev babel-preset-stage-0

```

```
{
    "presets": [
      "es2015",
      "react",
      "stage-1"
    ]
}

```

### Plugin 和 Preset 区别

Preset 是由一系列的 Plugins 组成的。可以组合完成 Plugins 的事情。例如 `babel-preset-react` 由如下 Plugins 组成：

```
preset-flow
syntax-jsx
transform-react-jsx
transform-react-display-name

```

## ESLint 配置

为了在 Node.js 上运行 ESLint，你必须先安装 npm，之后全局安装 eslint

```
 npm i eslint -g    // 全局安装eslint

```

初始化eslint文件前需要有 package.json 文件，生成 package.json，之后再生成 .eslint.js 文件

```
npm init            // 生成package.json
eslint --init       // 生成.eslint.js

```

Eslint fix 可以根据 eslint 检查配置 自动修复编码问题。 [参考ESLint修复选项](https://cn.eslint.org/docs/rules/)

```
## 语法
eslint [options] file.js [file.js] [dir]
## 实例, 按照eslint配置，检查根目录和src目录，同时修复
eslint --config .eslintrc.js ./src/*  --fix 

```

### ESLint Rules 配置

ESLint Rules 配置是ESLint的核心概念，规定了多人协作开发过程的代码规范。如下讲解下 ESLint Rules 配置语法。

![](https://user-gold-cdn.xitu.io/2019/1/31/168a1e73498eb017?w=1047&h=405&f=png&s=31468)

Rules 属性可以做下面的任何事情以扩展（或覆盖）规则：

```
# 改变继承的规则级别而不改变它的选项：
基础配置："eqeqeq": ["error", "allow-null"]
派生的配置："eqeqeq": "warn"
最后生成的配置："eqeqeq": ["warn", "allow-null"]
    
# 覆盖基础配置中的规则的选项
基础配置："quotes": ["error", "single", "avoid-escape"]
派生的配置："quotes": ["error", "single"]
最后生成的配置："quotes": ["error", "single"]

```

### ESLint常用插件

如下列举项目开发中一些常用插件和 ESLint 规范。

*   **eslint-plugin-react:** React语法规则插件
*   **eslint-config-airbnb:** airbnb ESLint开发规范
*   **eslint-config-standard:** JavaScript ESLint开发规范

## 搭建React项目开发环境

本小节通过搭建React项目开发环境，实践讲解如何配置 ESLint 和 editorconfig 。 同时 Babel 插件如何使用。

配置参考项目地址： [React项目仓库地址](https://github.com/dkypooh/front-end-develop-demo/tree/master/base/babel6-react)

### 初始化开发环境

```
npm init            // 生成package.json
eslint --init       // 生成.eslint.js

```

### 初始化项目目录

`editorconfig`和`babel`可以参考上文配置。

![](https://user-gold-cdn.xitu.io/2019/1/30/1689df7e6e169e91?w=1920&h=1080&f=png&s=415801)

**Package依赖** 主要有三大方面：Babel依赖，ESLint依赖 和 Webpack配置

### 编写React组件

![](https://user-gold-cdn.xitu.io/2019/1/30/1689e1267a6fc647?w=1344&h=778&f=png&s=114001)

### NPM Script命令行

```
$ npm run start             // 启动服务
$ npm run build             // 构建代码
$ npm run size              // 代码大小分析
$ npm run lint              // ESLint检查

```

### 输出页面

![](https://user-gold-cdn.xitu.io/2019/1/30/1689e2f058ea6009?w=1072&h=582&f=png&s=47124)

## Babel6 迁移 Babel7

为了更好的适应未来的变化，越来越多老的项目需要迁移到 Babel7上面，作者总结了如下迁移方案，Babel渐进性更新弃用了一些原来的插件。有如下重要迁移的改变：

*   **弃用 Stage Preset：** Babel正在删除 Stage presets，以支持明确的提案使用。默认使用`Stage-0`支持更多的特性。
*   **弃用年份 Preset:** 例如`babel-preset-es2015`等， 使用`@babel/preset-env`来代替
*   **删除 @babel/polyfill 中的 polyfill 提案**: `polyfill`插件会产生一些副作用，使用`@babel/runtime`代替，优化代码

具体可以参考 [React-Babel7迁移项目](https://github.com/dkypooh/front-end-develop-demo/tree/master/packages/babel7-react)

## 结语

通过本章的阅读，我们可以了解到 Babel 编译的三个核心步骤（`inputCode => outputCode`）， 同时通过React项目实践 Babel, ESlint， Editorconfig 三大能力。

最后把此项目从 Babel6 迁移到 Babel7，增加新的特性，适应未来的变化。

下一章将要学习 Webpack 环境开发搭建以及常用的Webpack优化技巧，需要了解下 Webpack 的基本知识和原理。

请预先预习 [Webapck 官方文档](https://www.webpackjs.com/concepts/)

## 思考题

Q：通过 AST Explorer [https://astexplorer.net/#](https://astexplorer.net/#) 观察下抽象语法书的结构？

## 参考文档

*   [Babel 插件开发指南](https://github.com/brigand/babel-plugin-handbook/blob/master/translations/zh-Hans/README.md#babylon)
*   [AST测试地址](https://github.com/brigand/babel-plugin-handbook/blob/master/translations/zh-Hans/README.md#babylon)
*   [Babel入门规则](http://www.ruanyifeng.com/blog/2016/01/babel.html)
*   [ESLint规则配置列表](https://cn.eslint.org/docs/rules/)
*   [EditorConfig官网](https://editorconfig.org)
*   [Babel7升级](https://babel.docschina.org/docs/en/7.0.0/v7-migration)