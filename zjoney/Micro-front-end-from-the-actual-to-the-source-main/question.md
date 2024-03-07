十.常见问题

- 依赖复用的问题

  创建共享模块，独立打包部署到CDN上，通过加载应用时传入，或者在子应用中引入。

  通过联邦模块进行打包处理公共资源。

  两个应用之间加载资源的地址相同即可复用（http缓存）

- 应用之间的组件复用问题

  应用中将共享的组件进行单独打包，加载应用时进行传入

- Vite支持问题

  基于vite构建的项目中import、export并没有被转码，会导致直接报错，可以采用生产环境接入vite）

- qiankun嵌套的问题

  需要避免多重沙箱嵌套问题，子应用中需要关闭沙箱。

- css沙箱不完美

  strictStylelsolation完全隔离问题，样式无法传递到子应用中。

  experimentalStylelsolation 子应用dom 结构插入到body中，样式无法生效。 
  
>   后续将移除globalState、addGlobalUncaughtErrorHandler、shadowDOM样式隔离 方案。

121231