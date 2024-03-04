# Webpack开发环境搭建

![](https://user-gold-cdn.xitu.io/2019/2/2/168ac3da418cfddd?w=720&h=349&f=png&s=97052)

## 前言

Webpack 是一个现代 JavaScript 应用程序的静态模块打包器 (module bundler)，使用 Webpack 可以对模块进行压缩、预处理、按需打包、按需加载等。

当 Webpack 处理应用程序时，它会递归地构建一个依赖关系图(dependency graph)，其中包含应用程序需要的每个模块，然后将所有这些模块打包成一个或多个 bundle。

### Webpack 构建 React+Mobx+Scss 开发环境源码

> 源码地址：[https://github.com/dkypooh/front-end-develop-demo/tree/master/base/react-mobx-scss](https://github.com/dkypooh/front-end-develop-demo/tree/master/base/react-mobx-scss)

### 通过本章读者可以学习了解到什么？

*   Webpack 核心概念以及基本配置。
*   Webpack 性能优化策略，主要分为构建性能和构建包性能（大小和按需加载）两大部分
*   搭建 React + Mobx + Scss 开发环境 ，实践讲解如何构建一个主流开发环境， 如何一步步完善 webpack 性能

当前前端主流构建工具有 `Browserify`, `Grunt`, `Gulp`,`Webpack` 和 `Rollup`。

![](https://user-gold-cdn.xitu.io/2019/1/31/168a29721ee7fffa?w=1816&h=1248&f=png&s=233763)

数据采集到2019年2月2日，最近半年数据指标

横向对比这几种构建工具，webpack 在构建工具还是占据主导地位，整个生态相对完善，同时可以自定义业务构建需要的 `plugin` 和 `loader` 。

## Webpack基础

从 Webpack 4 开始，可以不用引入一个配置文件, 可以实现零配置运行（之前 webpack 的配置复杂一直引起诟病），大多数项目会需要复杂的设置来支持开发环境定制，这也是他的强大之处。

在 Webpack 需要理解四个核心概念：**入口(entry)**， **输出(output)**，**加载器(loader)**，**插件(plugins)**。

## Webpack 四个核心概念

### 入口(entry)

**入口起点(entry point)** 是指 Webpack 应该使用哪个模块，来作为构建其内部依赖图的开始，Webpack 会找出有哪些模块和 library 是入口起点（直接和间接）依赖的。

可以通过在 [webpack 配置](https://www.webpackjs.com/configuration) 中配置 `entry` 属性，来指定一个入口起点（或多个入口起点），默认值为`./src`。

接下来我们看一个 `entry` 配置的最简单例子：`webpack.config.js`

```

module.exports = {
  entry: 'src/copy.js'
};

```

### 输出(output)

**output** 属性告诉 Webpack 在哪里输出它所创建的 bundles，以及如何命名这些文件，默认值为 `./dist`。基本上，整个应用程序结构，都会被编译到指定的输出路径的文件夹中。

你可以通过在配置中指定一个 `output` 字段，来配置这些处理过程：

**webpack.config.js**

```
const path = require('path');

module.exports = {
  entry: './src/copy',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  }
};

```

### 加载器(Loader)

**Loader** 让 Webpack 能够去处理那些非 JavaScript 文件（webpack 自身只识别 JavaScript），Loader 可以将所有类型的文件转换为 Webpack 能够处理的有效模块，然后你就可以利用 Webpack 的打包能力，对它们进行处理。

本质上，webpack loader 将所有类型的文件，转换为应用程序的依赖图和最终的 bundle 可以直接引用的模块。

> **主要注意是的:** 在更高层面，在 webpack 的配置中 loader 有两个目标：
> 
> *   **test 属性**，用于标识出应该被对应的 loader 进行转换的某个或某些文件。
> *   **use 属性**，表示进行转换时，应该使用哪个 loader。

**webpack.config.js**

```
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js'
  },
  module: {
    rules: [{ 
        test: /\.txt$/, 
        use: [
            { loader: 'style-loader' },
            { loader: 'css-loader', options: { modules:true }},
            { loader: 'sass-loader' }
        ]
    }]
  }
};


```

配置文件说明, 对一个单独的 module 对象定义了 rules 属性，里面包含两个必须属性：`test` 和 `use`。

*   test: 表示需要检索的文件类型
*   use: 指定配置文件 loader 选项，可以通过数组关联多个。

#### 常见的Loader

*   **css-loader**: 解释 (interpret) @import 和 url() ，会 import/require 后再解析 (resolve) 它们，推荐和 **style-loader** 一起配合使用。
*   **babel-loader**: 让 webpack 可以使用 babel 代码编译能力。并在 `.babelrc` 或者 `package.json` 的 `"babel: {"plugin": []}` 配置的编译的能力

### 插件(Plugins)

**Loader** 被用于转换某些类型的模块，而插件（Plugins）则可以用于执行范围更广的任务。

插件的范围包括，从打包优化和压缩，一直到重新定义环境中的变量，插件接口功能极其强大，可以用来处理各种各样的任务。想要使用一个插件，你只需要 require 进来，然后把它添加到 plugins 数组中。

多数插件可以通过选项 (option) 自定义。你也可以在一个配置文件中因为不同目的而多次使用同一个插件，这时需要通过使用 new 操作符来创建它的一个实例。

**webpack.config.js**配置如下：

```
const webpack = require('webpack'); //访问内置的插件
const path = require('path');

module.exports = {
  entry: './index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    // 1. 配置 UglifyJsPlugin 插件，优化打包后的JS大小
    new webpack.optimize.UglifyJsPlugin(),
  ]
};


```

## Plugin原理

插件（Plugin）是 Webpack 生态系统的重要组成部分，为社区用户提供了一种强大方式来直接触及 Webpack 的编译过程 (compilation process)。

### Plugin生命周期钩子（Hooks）

插件能够 Hook 到在每个编译 (compilation) 中触发的所有关键事件。在编译的每一步，插件都具备完全访问 compiler 对象的能力，如果情况合适，还可以访问当前 compilation 对象。

> 钩子(hook)参考文档：[https://www.webpackjs.com/api/compiler-hooks/#hooks](https://www.webpackjs.com/api/compiler-hooks/#hooks)

**Plugin 是一个支柱，对于整个编译过程，模块处理进行全链路的钩子回调。**

### Loader原理

loader 用于对模块的源代码进行转换。loader 可以使你在 import 或"加载"模块时预处理文件。因此，loader 类似于其他构建工具中 “任务(task)”，并提供了处理前端构建步骤的强大方法。

loader 可以将文件从不同的语言（如 TypeScript）转换为 JavaScript，或将内联图像转换为 data URL，loader 甚至允许你直接在 JavaScript 模块中 import CSS文件！

#### 安装Loader

例如，你可以使用 Loader 告诉 Webpack 加载 CSS 文件，或者将 TypeScript 转为 JavaScript。为此，首先安装相对应的 loader。

```
npm install --save-dev css-loader
npm install --save-dev ts-loader

```

然后指示 Webpack 对每个 `.css` 使用 css-loader，以及对所有 .ts 文件使用 ts-loader：

**webpack.config.js**

```
module.exports = {
  module: {
    rules: [
      { test: /\.css$/, use: 'css-loader' },
      { test: /\.ts$/, use: 'ts-loader' }
    ]
  }
};

```

### Webpack的命令行工具

本小节会介绍下如何通过 `webpack-cli` 构建一个打包工具。使用两种方式构建开发环境：命令行方式 和 webpack 配置文件方式

#### 安装准备

安装 Webpack 的版本是 4.x, `webpack-cli` 和 `webpack-dev-server` 的版本是 3.x

```
$ npm i webpack webpack-cli webpack-dev-server -D

```

#### 编写 命令行开发环境

通过 webpack 命令行配置 webpack-dev-server 开发服务。 说明如下：使用 `cross-env` 跨平台设置环境变量，当前环境为 `development`, 端口号为 `3000` ,静态资源的地址为 `./dist` , 使用 Chrome 浏览器打开，并且显示编译进度。

```
$ cross-env NODE_ENV=development webpack-dev-server --config webpack.config.js --port 3000 --content-base ./dist --open 'Chrome' --progress 

```

#### 配置 npm scripts 完整的开发环境

通过 npm srcipts 脚本快捷管理开发环境，配置一个完善的开发环境主要有如下能力：

*   start：开发环境配置
*   build: 构建打包环境
*   size: 分析打包大小环境
*   lint: Eslint 代码检查以及修复

```
"scripts": {
    "start": " cross-env NODE_ENV=development webpack-dev-server --config webpack.config.js",
    "build": "cross-env NODE_ENV=production  webpack --config webpack.config.js --progress",
    "lint": "npx eslint --config .eslintrc src --fix",
    "size": " cross-env NODE_ENV=analyzer webpack --config webpack.config.js --progress"
}

```

## React + Mobx + Scss 项目实践

本小节会通过搭建 React + Mobx + Scss 开发环境，和读者一起探讨 Webpack 的性能优化 的策略。性能优化主要从两个方面入手: 构建性能 和 打包文件大小性能。 总结下来有如下策略：

### 构建性能优化策略

#### 方案一: 合理配置 CommonsChunkPlugin

假设我们的页面中存在 entry1，entry2，entry3 三个入口，这些入口中可能都会引用如 utils，lodash，fetch 等这些通用模块，那么就可以考虑对这部分的共用部分机提取。配置如下：

```
module.exports = {
  //...
  entry: {
    vendor: ['jquery', 'other-lib'],
    app: './entry'
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      // filename: "vendor.js"
      // (给 chunk 一个不同的名字)
      minChunks: Infinity,
      // (随着 entry chunk 越来越多，
      // 这个配置保证没其它的模块会打包进 vendor chunk)
    })
  ]
};

```

**HTML配置文件**

```
<script src="vendor.js" charset="utf-8"></script>
<script src="app.js" charset="utf-8"></script>

```

#### 方案二：通过 externals 配置来提取常用库

简单来说 external 就是把我们的依赖资源声明为一个外部依赖，然后通过 script 外链脚本引入。告知 Webapck 遇到此类变量名时就可以不用解析和编译至模块的内部文件中，而改用从外部变量中读取，这样能极大的提升编译速度，同时也能更好的利用 CDN 来实现缓存。配置如下：

```
module.export = {
    react: {
        amd: 'react',
        root: 'React',
        commonjs: 'react',
        commonjs2: 'react'
    },
    'react-dom': {
        amd: 'react-dom',
        root: 'ReactDOM',
        commonjs: 'react-dom',
        commonjs2: 'react-dom'
    }
}

```

**HTML配置文件**

```
<script crossorigin src="https://unpkg.com/react@16/umd/react.production.min.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.production.min.js"></script>

```

#### 方案三：利用 DllPlugin 和 DllReferencePlugin

我们的项目依赖中通常会引用大量的 npm 包，而这些包在正常的开发过程中并不会进行修改，但是在每一次构建过程中却需要反复的将其解析。DllPlugin 的作用是预先编译一些模块，而 DllReferencePlugin 则是把这些预先编译好的模块引用起来。简单来说 DllPlugin 和 DllReferencePlugin 主要是缓存编译后的内容，对不变的文件减少二次编译。 配置如下：

\*\*生成缓存文件 manifest.json \*\*

webpack.dll.lib.js 为生成缓存文件，配置静态文件。

```
$ NODE_ENV=development webpack --config  webpack.dll.lib.js --progress

```

**配置dllPlugin的静态资源引入**

```
// 将mainfest.json添加到webpack的构建中
module.export = {
  plugins: [
       new webpack.DllReferencePlugin({
       context: __dirname,
       manifest: require('../dll/manifest.json'),
      })
  ]
}

```

#### 方案四：使用 Happypack 加速你的代码构建

happypack 的处理思路是将原有的 Webpack 对 loader 的执行过程从单一进程的形式扩展多进程模式，原本的流程保持不变，这样可以在不修改原有配置的基础上来完成对编译过程的优化，核心配置如下：

```
module.export = {
    module: {
        rules: [
          { test: /\.jsx|js?$/, use: 'happypack/loader?id=jsx'}
        ]
    },
    plugins: [
        new HappyPack({ id: 'jsx', threads: 4, loaders: ['babel-loader']}),
    ]
}

```

配置解析：在 rules 需要配置 happypack 的 loader id，在 Happypack 插件需要配置 线程数。

## 打包文件性能优化

打包文件性能优化主要手段是采用特定的方式来减少最终打包的大小，下文介绍几种基础的配置来优化打包的文件大小。

我们使用原始的打包方式，所有的资源文件都会打包到 `bundlejs` 里面，导致 `bunldejs` 很大，如下图所示

![](https://user-gold-cdn.xitu.io/2019/5/23/16ae4db56339f2aa?w=2792&h=1534&f=png&s=169624)

### 提取公共文件

相同的资源被重复的加载，浪费用户的流量和服务器的成本，每个页面需要加载的资源太大，导致网页首屏加载缓慢，影响用户体验，将多个入口重复加载的公共资源提取出来, 基本配置如下。

> 在 webpack4.0 optimization.splitChunks 替代了 CommonsChunkPlugin

#### webpack 配置

```
module.exports = {
    optimization: {
        splitChunks: {
          // 默认打包node_modules到venders.js
          chunks: 'all'
        }
    },
    entry: {
        bundle: './src/index.js',
        vendor: ['react', 'react-dom'] // 配置哪些依赖包需要提取到 vendor 文件中
    },
}

```

#### 优化后的效果如下

![](https://user-gold-cdn.xitu.io/2019/5/23/16ae4db56326d04a?w=2784&h=1540&f=png&s=225667)

可以看到公共文件被提取到 `vendor.js` 文件中了， `bundle.js` 文件大小 94KB 左右

### 压缩资源文件

对原有文件进行压缩和混淆一方面有利于以更小的体积传输， 另一方面有利代码安全。 在 webpack4 中配置如下：

#### webpack 配置

```
module.exports  = {
    mode: 'production'
}


```

#### 优化后的效果

![](https://user-gold-cdn.xitu.io/2019/5/23/16ae4db565f00d13?w=1400&h=1102&f=png&s=84343)

可以看到 `bundle.js` 文件大小有原先的 `94KB` 压缩到 `70KB`, 通过 gzip 压缩后的大小为 `14KB`。

### Tree Shaking

Tree shaking 是一个术语，通常用于描述移除 JavaScript 上下文中的未引用代码(dead-code)。执行生产编译 （mode = production）默认已开启Tree Shaking。

#### webpack 配置

```
module.exports  = {
    mode: 'production'
}

```

## 思考题

Q：如何把react, jquery等外部依赖文件, 从输出的 bundle 中排除依赖, 不打包进bundle, 变成外部依赖？

## 参考文献

*   [webpack配置说明](https://user-gold-cdn.xitu.io/2019/3/18/16990228e0ed6ba0)
*   [Webpack Plugins插件列表](https://www.webpackjs.com/plugins/)
*   [Webpack Loaders列表](https://www.webpackjs.com/loaders/)
*   [从零开始使用webpack 4, Babel 7创建一个React项目（2018）](https://user-gold-cdn.xitu.io/2019/2/2/168ac617a14e5a29)