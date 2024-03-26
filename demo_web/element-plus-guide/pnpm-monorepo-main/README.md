# 从 Vue3 源码入门理解 pnpm 的 monorepo 到以 pnpm 构建 monorepo 环境搭建组件库工程化实战


monorepo 是把多个项目的所有代码放到一个 git 仓库中进行管理，多个项目中会有共享的代码则可以分包引用。整个项目就是有 root 管理的 dependencies 加上多个 packages，每个 package 也可以在自己的作用域引入自己的 dependencies。

为什么要使用 monorepo

使用 monorepo 可以把原本一个项目的多个模块拆分成多个 packages，在 packages 之间相互引用，也可以单独发布成包，极大地解决了项目之间代码无法重用的痛点。在项目打包或者编译操作时也可重用一套配置，通吃所有 packages。

搭建 Vue3 源码开发环境

初始化项目生成一个 package.json

```
pnpm init
```

管理多个项目

pnpm 提供的一个功能，可以管理多个项目，那么怎么管理多个项目呢？你需要创建一个配置文件

pnpm-workspace.yaml

在这个配置文件中要告诉 pnpm 项目写在哪个项目下

```json
packages:
  - 'packages/*'
```


```
pnpm install vue -w
```



符号链接



npm 的特点：幽灵依赖



Vue3 源码的开发环境

```
pnpm install esbuild typescript minimist -D -w
```

Vue3 的源码开发环境采用的是 `esbuild` 进行编译打包，特点就是编译速度快，所以采用 `esbuild` 进行编译开发速度也变得很快。跟 Vite 一样，我们使用的 Vite 开发效率高是因为它采用 ESModule，开发的时候，不打包，内部编译的时候也是通过 `esbuild` 进行编译。最终上生产的时候，还是通过 rollup 进行打包，跟 Vite 一样。Vue3 源码是使用 TypeScript 开发的，所以需要安装 `typescript`。通常我们需要在命令行了进行一些参数输入，所以需要进行命令行参数解析，`minimist` 则可以实现对命令行的参数进行解析。因为我们是在开发阶段使用的，所以安装的时候使用 `-D`，又因为这些包是所有模块的公共使用的，所以需要安装到根目录，所以添加 `-w`。

模块中的 package.json 配置

```json
{
    "name": "@vue/shared",
    "version": "0.0.1",
    "main": "dist/shared.cjs.js", // node.js 环境引用的
    "module": "dist/shared.esm-bundler.js", // 浏览器 ESM 模式引用的
    "buildOptions": {
        "formats": [
            "esm-bundler",
            "cjs"
        ]
    }
}
```



在 reactivity 模块怎么引用 shared 模块的东西呢？

比如说我们平时可能这样引用一个项目中的其他目录的方法或者变量。

```javascript
import { isObject } from "../../shared/src";
```

但现在我们这些目录都是独立的每个包，都可以独立发布的，如果还是通过上面这种方式进行引用的话，会把两个包都打包在一起了。

那么我们一般通过下面这种别名方式进行引用。

```javascript
import { isObject } from "@vue/shared";
```

初始化一个 TypeScript 的配置文件

```
pnpm tsc -init
```
进行别名配置，告诉 TypeScript 别名要去哪个目录进行查找。

```json
{
    "compilerOptions": {
        "outDir": "dist", // 输出的目录
        "sourceMap": true, // 采用sourcemap
        "target": "es2016", // 目标语法
        "module": "esnext", // 模块格式
        "moduleResolution": "node", // 模块解析方式
        "strict": false, // 严格模式
        "resolveJsonModule": true, // 解析json模块
        "esModuleInterop": true, // 允许通过 es6 语法引入common.js模块
        "jsx": "preserve", // jsx 不转义
        "lib": ["esnext", "dom"], // 支持的类库 esnext 及 dom
        "baseUrl": ".", // 以当前目录作为别名目录作为入口
        "paths": {
            "@vue/*":["packages/*/src"]
        }
    }
}
```

通过上述设置，就可以通过 TypeScript 的别名实现了不同包直接的互相引用。

安装之后就不需要了，通过下面命令进行安装本地包。

```
pnpm install @vue/shared@workspace --filter @vue/reactivity
```



打包配置



minimist 可以解析命令行参数，非常好用，功能简单不复杂


使用 monorepo 环境的好处就是可以在一个项目中管理多个仓库，可以达到仓库之间的资源共享。

先使用 pnpm init 进行 package.json 的初始化。
```
pnpm init
```
