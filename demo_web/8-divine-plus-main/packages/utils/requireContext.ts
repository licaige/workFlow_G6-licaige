import type { Component } from "vue";

const webpackRequireCompos = () => {
  const contextFn = require.context("../components", true, /\.vue$/);
  const modules = contextFn
    .keys()
    .map(contextFn)
    .map((module: any) => module.default);

  return modules as Component[];
};

export const requireComps = () => {
  // 环境区分
  return webpackRequireCompos();
};

// 1
// 报错
// 报错: ts报错类型“NodeRequire”上不存在属性“context”
// 解决:
//  - 1. npm install @types/webpack-env -D
//  - 2. 在 tsconfig.json 中 types 数组中添加 "webpack-env" 去自动引入 "@types/webpack-env" 包
//  - 3. 在 tsconfig.json 中 include 数组中添加 webpack语法所在的 ts 文件

// 2
// require.context
// - 参数
//  - require.context(directory, useSubdirectory, regexp)
//  - require.context(directory目录, useSubdirectory是否包含子目录, regexp需要匹配的文件)
// - 返回值
//  - 返回一个 ( 函数 )，该函数包含一下属性
//    - keys: 也是一个函数，调用后的返回值是一个数组，由所有可能被上下文模块处理的请求组成
//    - resolve: 也是一个函数，它返回请求被解析后得到的模块 id
