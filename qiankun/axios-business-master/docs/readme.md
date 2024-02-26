# axios-ext

基础 axios 封装业务 HTTP 库

# 工程构建

## 启用 ts

安装依赖库

> yarn add -D tslib typescript

初始化`typescript`的配置，在根目录会生成文件`tsconfig.json`

```bash
npx tsc --init
# 或者
./node_modules/.bin/tsc --init
```

## 使用 rollup 作为打包工具

全局安装`rollup`

> yarn global add rollup

添加`rollup`的插件

> yarn add -D @babel/core @rollup/plugin-node-resolve @rollup/plugin-commonjs @rollup/plugin-typescript @rollup/plugin-babel

编写配置文件`rollup.config.js`
