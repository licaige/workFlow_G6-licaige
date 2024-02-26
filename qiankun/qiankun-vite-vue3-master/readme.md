# vite + vue3 + qiankun

目前`qiankun`不支持`vite`，需要借助插件`vite-plugin-qiankun`实现。

# 启动方式

```bash
cd main-app && pnpm dev
cd app-01 && pnpm dev
cd app-02 && pnpm dev
```

主应用和子应用可以单独运行。

```bash
> http://localhost 主应用地址
> http://localhost:8081 app-01地址
> http://localhost:8082 app-02地址
```

# 部署

```bash
> ./build
```

打包脚本执行后，会在当前目录产生一个`html`文件夹，html 的文件夹结构：

```bash
html
  index.html
  sub
    app-01
    app-02
```

直接部署到 Nginx 即可，或者可以本地启动，查验效果：

```bash
> cd html && serve . -p 5500
```

在浏览器访问`http://localhost:5500`，查看效果。

# 坑点

## 001. 主应用注册 App 时，`activeRule` 有两种模式

hash 模式

```js
const getActiveRule = (hash) => (location) => location.hash.startsWith(hash);
registerMicroApps([
  {
    name: "app-hash",
    entry: "http://localhost:8080",
    container: "#container",
    activeRule: getActiveRule("#/app-hash"),
    // 这里也可以直接写 activeRule: '#/app-hash'，但是如果主应用是 history 模式或者主应用部署在非根目录，这样写不会生效。
  },
]);
```

history 模式

```js
registerMicroApps([
  {
    name: "app",
    entry: "http://localhost:8080",
    container: "#container",
    activeRule: "/app",
  },
]);
```

## 002. 主应用使用`history`时，如何控制子应用的切换

history 模式时，主应用会监听`location.pathname`的变化，从而切换子应用的加载与卸载。

主应用中，使用 a 便签切换应用时：

```html
<!-- 开发环境时，没有问题 -->
<!-- 部署环境时，会报错：/app_01 404的错误 -->
<a href="/app_01">app 01</a>
```

404 的原因，静态部署时：a 标签会触发浏览器的刷新，刷新后，浏览器向后台发起请求/app_01，后台的确没有这个物理路径

改进方案，使用 `history.pushState` 接口：

```html
<a @click="toApp('/app_01')">app 01</a>
```

```js
function toApp(path: string) {
  history.pushState({}, "", path);
}
```

使用`history.pushState`的方式，不会出发浏览器的刷新行为。当浏览器的`pathname`发生变化时，`qiankun`会感知到路由发生变化，并加载对应的页面。

到这一步时，若不主动执行`F5`刷新操作，一切正常。但使用`F5`后，还是会报错 404，此时需要后台的路由进行配合，以 Nginx 为例子：

```nginx
server {
  listen       8080;
  server_name  localhost;

  location / {
    root   html;
    index  index.html index.htm;
    try_files $uri $uri/ /index.html;
  }

  location /child/vue-history {
    root   html;
    index  index.html index.htm;
    try_files $uri $uri/ /child/vue-history/index.html;
  }
}
```
