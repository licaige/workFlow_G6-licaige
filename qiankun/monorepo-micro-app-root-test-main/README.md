# monorepo-micro-app-root-test

微前端框架micro-app+pnmp+monorepo搭建测试版应用  

本项目使用micro-app实现微前端应用，并使用pnpm和Monorepo管理项目代码。运行环境为 node>=16.8.0, pnpm>=7.32.0。  

## 项目目录结构

```
  .
  ├── main-app // 主应用 Vite + react (history路由)   
  ├── sub-pps // 子应用  
  │  ├── vite-react-ts-jest-app  
  │  ├── vitest-vue3-ts-el-app // Vite + vue3 (history路由)   
  ├── package.json   
  ├── pnpm-workspace.yaml  
  └── pnpm-lock.yaml  
```  

## 工具

"lint-staged": "^11.1.2", // 对暂存的 git 文件运行 linter  
"commitizen": 是一个命令行提示工具，它主要用于帮助我们更快地写出规范的commit message  
"@commitlint/cli": 用于校验填写的commit message是否符合设定的规范  
"@commitlint/config-conventional": 配置指定需要的规范，在.commitlintrc文件中引入  
"@commitlint/cz-commitlint": git cz相关插件  

### git操作

初始化本地仓库
`git init -b master`  

添加文件到本地仓库、并提交  
`git add .`  

`git commit -m "init"`  

添加远程仓库地址到本地仓库  
`git remote add origin {远程仓库地址}`  

push到远程仓库  
`git push -u origin master`  


**Git Hooks相关管理工具**  

`git config core.hooksPath` 检查git配置信息  
`git config core.hooksPath .git/hooks/` 指定core.gitHooks的值为 .git/hooks  


"simple-git-hooks": 一个git钩子管理工具，优点是使用简单，缺点是每个钩子只能执行一个命令，如果需要执行多个命令可以选择husky。

package.json中配置simple-git-hooks  
```
"scripts": {  
  "ghooks": "simple-git-hooks",  
  "commit-msg": "pnpm commitlint -e $1",  
},  
"simple-git-hooks": {  
  "pre-commit": "pnpm lint-staged",  
  "preserveUnused": [  
    "commit-msg"  
  ]  
},
```  

"husky": 自动配置 Git hooks 钩子

`pnpm exec commitlint --config .commitlintrc -e $1`

```
pnpm -F 'main-apps/vitest-react-ts-swc-base' exec lint-staged
pnpm -F 'sub-apps/side-nav' exec lint-staged
pnpm -F 'sub-apps/vite-react-ts-jest-app' exec lint-staged
pnpm -F 'sub-apps/vitest-vue3-ts-el-app' exec lint-staged
```

**使用changesets管理包版本，生成changelog**   

"@changesets/cli": changesets 安装包  
初始化changeset配置:   
`npx changeset init`  
这个命令会在根目录下生成.changeset文件夹，文件夹下包含一个config文件和一个readme文件   

`npx changeset`  
运行这个命令，会出现一系列确认问题，包括：   
  1. 需要为哪些包更新版本  
  2. 哪些包更新为major版本  
  3. 哪些包更新为minor版本  
  4. 修改信息（会添加到最终生成的changelog.md中）   

所有问题回答完成之后，会在.changeset下生成一个Markdown文件，这个文件的内容就是刚才问题的答案集合   

`npx changeset version`   
这个命令会做以下操作:   
  1. 依据上一步生成的md文件和changeset的config文件更新相关包版本   
  2. 为版本更新的包生成CHANGELOG.md文件 填入上一步填写的修改信息   
  3. 删除上一步生成的Markdown文件，保证只使用一次    

建议执行此操作后，pulish之前将改动合并到主分支   

**版本发布**
`npx changeset publish`  

## micro-app爬坑记

**多层嵌套问题**   

  1. 数据通讯问题: 不使用属性data传值，改用setData响应式传值到子应用   
  2. 为了防止标签名冲突，name都要保证全局唯一, 子应用中设置tagName：  
    `microApp.start({  
      tagName: 'micro-app-xxx', // 标签名称必须以 `micro-app-` 开头  
    })`   

## Monorepo架构搭建
  
  Monorepo 代表"单一代码仓库"（Monolithic Repository）, 是一种将多个项目存储在一个代码库中的策略，这使得跨项目共享和管理代码变得更加容易。   

### 包管理工具
  
  npm、yarn、pnpm 等是用来管理项目依赖、发布包、安装依赖的工具，它们都提供了对工作区（workspace）的支持，允许在单个代码库中管理多个项目或包。这种工作区支持在单个代码库中同时开发、测试和管理多个相关的项目，而无需使用多个独立的代码仓库。  

  lerna已经停止更新维护了，当下前端组件库 / 工具库的最佳实践方案基本都是 pnpm + monorepo 的开发模式，如 Vue、React、Vite、Element UI、Varlet UI、Vant UI 等。  

  其中 pnpm 是一个高效的前端包管理工具，它通过使用硬链接和符号链接将包存储在共享的内容寻址存储中，从而避免了重复下载和安装。它自身支持的某些特性可以很好的与 monorepo 模式相结合。   

  **包安装过程中需要经过的三个流程：**   

  1. resolving：首先他们会解析依赖树，决定要下载哪些安装包。  
  2. fetching：下载依赖的tar包。这个阶段可以同时下载多个，来增加速度。  
  3. wrting：解压包，根据文件构建出真正的依赖树，这个阶段需要大量文件IO操作。  

#### pnpm
  pnpm 针对每个包的三个流程（resolving、fetching、 wrting）都是平行的，所以速度会快很多。当然pnpm会多一个阶段，就是通过链接组织起真正的依赖树目录结构。  
  pnpm 使用硬连接的方式节约磁盘空间利用率、采用虚拟存储目录+软连接解决幽灵依赖（项目代码在某些情况下可以在代码中使用没有被定义在 package.json 中的包）   

  *硬链接：* 电脑文件系统中的多个文件平等的共享同一个文件存储单元。  
  硬链接可以有多条，它们可以指向同一块磁盘空间。  

  *软链接（符号连接）：* 包含一条以绝对路径或相对路径的形式指向其他文件或者目录的引用。  
  最常见的就是桌面的快捷方式，其本质就是一个软链接，软链接所产生的文件是无法更改的，它只是存储了目标文件的路径，并根据该路径去访问对应的文件。  

  `pnpm exec` 在项目范围内执行 shell 命令, pnpm exec 允许执行依赖项的命令。  
  
  将 lint-staged 作为项目的依赖项，则无需全局安装lint-staged，只需使用 pnpm exec运行   

  `pnpm exec lint-staged --concurrent false`  
  
  exec 命令的任何选项都应该在 exec 关键字之前列出。 在 exec 关键字之后列出的选项都将被传递给被执行的命令   
  -p, --concurrent <parallel tasks>  要同时运行的任务数，或者为false则要连续运行任务（默认值：true）   

   --recursive, -r 在工作区的每个项目中执行 shell 命令。   
   `pnpm -r exec rm -rf node_modules` 为所有的软件包清理 node_modules 安装信息    

  `pnpm --parallel -r run build` 通过--parallel会执行所有package中的build命令, 加入 -r 是指定为 worksapce 中的子包执行 build 命令   

  `pnpm --parallel -r run watch` 在项目根目录下执行 pnpm run watch，以对每个子包执行 watch 命令监听文件的变更以生成最新的构建产物. watch 命令是会长时间运行监听文件变更，进程不会自动退出（除了报错或者手动退出），因此需要加上 --parallel 告诉 pnpm 运行该脚本时完全忽略并发和拓扑排序。   

#### Bash

  | 命令  | 说明 |  
  | ---- | ---- |  
  | &&   | 顺序执行多条命令，当碰到执行出错的命令后将不执行后面的命令 |  
  | &    | 并行执行多条命令 |  
  | \|\| | 顺序执行多条命令，当碰到执行正确后的命令后将不执行后面的命令 | 
  | \|   | 管道符 |   


  concurrently 跨平台，同时运行多个命令（并发）。   
  ```
  "scripts": {  
      "test": "concurrently \"node ./build/1.js\" \"node ./build/2.js\""   
  }
  ```

#### npm-run-all

  支持跨平台，一种可以并行或串行运行多个 npm 脚本的 CLI 工具。  

  1. npm-run-all 综合性命令（可串行可并行）  
  2. run-s 简写，等价于 npm-run-all -s 串行（sequentially）运行 npm scripts   
  3. run-p 简写，等价于 npm-run-all -p 并行（parallel）运行 npm scripts   

  npm-run-all 还具备支持参数传递；错误退出控制；提供 Node Api；以及一些优化项npm-run-all --parallel dev:**等。  
  注意，npm-run-all node 方式不支持，其实针对 npm scripts 并发和顺序执行的解决方案；但对于 Yarn 同样支持！   


### pnpm + monorepo的基本实践
  
  pnpm 支持 monorepo 模式的工作机制叫做 workspace(工作空间)。  

  安装pnpm：   
  `npm i pnpm -g`   
  初始化项目：   
  `npm i pnpm -g`   

  在代码仓的根目录下创建pnpm-workspace.yaml文件指定哪些目录作为独立的工作空间（一个子模块或者 npm 包）：   
  ```
  packages:   
    # all packages in direct subdirs of packages/  
    - 'main-apps/**'   
    # all packages in subdirs of components/   
    - 'sub-apps/**'   
  
    - 'axios-ajax-ts/**'  

    # exclude packages that are inside test directories   
    - '!**/tests/**'  
    - '!**/cypress/**'  
  ```

  在main-apps目录中创建主应用，在sub-apps创建子应用，axios-ajax-ts为共享请求封装目录  
  应用创建完成之后，可以将公共使用的依赖拷贝到根目录下的package.json中，进行统一安装。   
  在根目录下执行命令：   
  `pnpm i -w`  // -w, --workspace-root 表示在根目录下安装   

  封装好axios-ajax-ts之后，通过link机制实现package包之间的依赖引用：   
  `pnpm -F [appPath+appName] add [sharePackageName]@workspace `    
  通过filter 过滤需要关联依赖的package, appPath+appName为应用的路径和名称，sharePackageName共享的包名   

  ```  
    "dependencies": {  
      ...  
        "axios-ajax-ts": "workspace:^",  // 通过 workspace协议 为本地引用   
      ...   
    },   
  ```  

## micro-app实现原理解析

### 前置知识 webComponent

microApp是一款轻量级微前端框架,使用webComponent的思想去实现。   
html中有许多标签,div,p,span等等,这些标签渲染出的都是html元素。   
webComponent（自定义html元素）, 其实现思路很简单,就是让用户通过js代码自定义一个htmlElement,并注册到document中, 之后便可使用标签。   

  创建一个自定义元素  
  ```
    class CustomEle extends HTMLElement {  
        constructor() {  
            super();  
            console.log('创建了自定义标签')  
            const name = this.getAttribute('name') || '';  
            this.innerHTML=`<p>{name}</p>` // 或者其他操作dom的方法   
        }  

        connectedCallback() {}// 组件被成功添加到主文档时触发  
        disconnectedCallback() {} //组件从主文档移除时触发  
        adoptedCallback() {}      // 元素被移动到新的文档时调用,(不常用)   
        
         // 监听组件属性,用于触发attributeChangedCallback   
        static get observedAttributes() { return ['img', 'text']; }   
        attributeChangedCallback() {} // 增删改被监听的组件属性时触发  
    }  

    // 注册自定义元素为标签   
    customElements.define('custom-ele', CustomEle);  
    
    // 在html中使用  
    <body>  
        <custom-ele name="hello-micro-app"/>  
    </body>   
    // createElement时会执行new CustomEle   
    const customEle = document.createElement('custom-ele');  
  ```
  通过这种方式,我们可以使用一个类轻松定制出一个即插即用的组件,跨平台,跨框架。CustomEle的构造函数只会在其创建时执行一次, CustomEle类里可以添加生命周期以及钩子函数来帮助我们完成其他的操作。<br>


### micro-app运行的整体流程

  1. 初始化子应用<br>
  2. 通过fetch + url 获取子应用的html<br>
  3. 处理html文本<br>
  4. 通过fetch获取子应用的静态资源（e.g. js/css/jpg、png...）<br>
  5. 将处理过的html放入webComponent容器中<br>
  6. 在沙箱环境中执行子应用的js<br>
  7. 完成子应用的初始化<br>

#### 获取/处理子应用内容

  **body 和 header 的处理**   
  首先，micro-app 可以通过 fetch 拿到 url 对应的 html 字符串，然后替换 head 和 body 标签，避免污染主应用。<br>
  micro-app-head 和 micro-app-body 都是自定义标签，自定义标签和已有的标签相比，只是缺少了默认的样式及行为，因此需要通过extractSourceDom 负责处理 header 里头的其他标签，以及加载 link 及 script 标签的内容。<br>

  **其他标签处理**   
  flatChildren 函数是处理 header 里的其他标签的具体操作。注意这里用了递归，以确保每个标签都能处理到。<br>

#### 挂载子应用

当对 html 做了处理后，下一步就是挂载到 micro-app 自定义的 webComponent 中<br>

#### 绑定沙箱

巧妙用了with关键字，将子应用语句的作用域替换成了 proxyWindow.__MICRO_APP_WINDOW__，从而绑定了沙箱环境。<br>

#### 沙箱实现原理
  
  **实现元素隔离**   
  micro-app 是修改了 Document 原型链上的方法，通过判断 appName，如果 appName 非空，则说明是子应用调用的 querySelector，这时候我们就可以直接使用 appInstanceMap.get(appName)?.container?.querySelector(selectors) 方法，从而做到元素的隔离。<br>
  子应用在访问 document 对象时实际上还做了一层拦截， throttleDeferForSetAppName 方法作用是修改 appName，并创建一个微任务，执行微任务将appName置空。所以 appName 仅在子应用访问 document 对象时才会存在，当主应用访问 document 时，appName 被清空了。<br>


  **实现js隔离**   
  主要利用了强大的 Proxy，下面简要分析get 和 set 拦截器：
  
  1. get 拦截器<br>
  如果代理对象中存在该属性，直接返回代理对象的属性<br>
  代理对象不存在该属性时，从原生的 windows 对象中返回。但是需要检查一下属性是否是构造函数，如果是构造函数，还需要给函数绑定 window 对象，例如 console，alert 属性。<br>

  1. set 拦截器主要做的事情是<br>
  当沙箱处于 active 状态才会处理<br>
  使用 injectedKeys 将 key 记录下来，方便子应用在频繁切换应用时恢复现场。<br>

  
  **事件处理**   
  首先是改写原来的 addEventListener 方法，将监听的事件名和事件句柄记录在一个 map中。<br>
  然后在子应用卸载的时候会触发 releaseEffect 方法，将之前监听的事件全部移除。<br>
