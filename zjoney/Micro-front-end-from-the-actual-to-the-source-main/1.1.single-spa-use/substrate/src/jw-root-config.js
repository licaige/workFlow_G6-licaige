import { registerApplication, start } from "single-spa";

// 注册应用

registerApplication({
  name: "@single-spa/welcome",
  app: () =>
    System.import( // 远程加载模块
      "https://unpkg.com/single-spa-welcome/dist/single-spa-welcome.js"
    ),
  activeWhen: (location)=>location.pathname === '/' ,
});

registerApplication({
  name: "@jw/react", // 不重名即可
  app: () =>
    System.import('@jw/react'),
  activeWhen: (location)=>location.pathname.startsWith('/react')  ,
});

registerApplication({
  name: "@jw/vue", // 不重名即可
  app: () =>
    System.import('@jw/vue'),
  activeWhen: (location)=>location.pathname.startsWith('/vue')  ,
});

// registerApplication({
//   name: "@jw/navbar",
//   app: () => System.import("@jw/navbar"),
//   activeWhen: ["/"]
// });

start({
  urlRerouteOnly: true,
});
// 根应用
// 父应用的加载过程  9000 -> index.ejs -> @jw/root-config -> jw-root-config
// 匹配路径加载应用


// 写实现原理 我们给你加载一下
// 动态加载方式
