import type { App, Plugin, AppContext } from "vue";

type SFCWithInstall<T> = T & Plugin;

export type SFCInstallWithContext<T> = SFCWithInstall<T> & {
  _context: AppContext | null;
};

const withInstall = <T, E extends Record<string, any>>(main: T, extra?: E) => {
  (main as SFCWithInstall<T>).install = (app: App) => {
    for (const comp of [main, ...Object.values(extra ?? {})]) {
      app.component(comp.name, comp);
    }
  };
  if (extra) {
    for (const [compName, comp] of Object.entries(extra)) {
      (main as Record<string, any>)[compName] = comp;
    }
  }

  return main as SFCWithInstall<T> & E; // 将 T 断言为具体的类型 T & plugin & Record<string, any>
};

const withInstallFunction = <T>(fn: T, name: string) => {
  (fn as SFCWithInstall<T>).install = (app: App) => {
    (fn as SFCInstallWithContext<T>)._context = app._context;
    app.config.globalProperties[name] = fn;
  };

  return fn as SFCInstallWithContext<T>;
};

export { withInstall, withInstallFunction };

// 1
// withInstall
// - effect: install component and return component
// - advantage:
//   - 1. 注册插件: 比如 breadcrumb 和 breadcrumb-item，利用 withInstall 在单独注册插件时，只需要 app.use(breadcrumb) 而不用再写 app.use(breadcrumb.item)
//   - 2. 使用组件: 在 Breadcrumb.BreadcrumbItem 就可以调用到 BreadcrumbItem
// - 详见
//   - https://github.com/woow-wu7/7-element-plus-source-code-analysis/blob/main/packages/utils/vue/install.ts

// 2
// withInstallFunction
// - 作用
//   - 1.当 组件 是 函数类型 时 ( 比如Message )，注册为Vue插件
//   - 2.把 该组件 注册到 能够被应用内所有组件实例访问到的 全局属性的对象 上，在任意 ( 组件模版 ) 和 ( 组件实例 ) 上都能访问到
// - app.config.globalProperties
//   - 一个用于注册能够被应用内所有组件实例访问到的全局属性的对象
//   - 这是对 Vue 2 中 Vue.prototype 使用方式的一种替代，此写法在 Vue 3 已经不存在了
//   - 如果全局属性与组件自己的属性冲突，组件自己的属性将具有更高的优先级
//   - 示例
//     - app.config.globalProperties.msg = 'hello'
//     - 1.这使得 msg 在应用的任意组件模板上都可用
//     - 2.并且也可以通过任意组件实例的 this 访问到 => this.msg
// - app._context
//     - app 上下文环境 VNode树挂在上面

// 3
// Record<string, any>
// - object key: string
// - object value: any

// 4
// SFC 是 vue 组件使用的规范
// - https://v3.cn.vuejs.org/api/sfc-spec.html#%E4%BB%8B%E7%BB%8D

// 5
// Vue Plugin
// - 4.1 插件类型:
//  - object: 一个具有 ( install方法的对象 ) ---- 参数 install(app, options)
//  - function: 或者是一个 ( function ) ------- 参数 function(app, options)
// - 4.2 插件参数:
//  - app -------> createApp 生成的 app 对象，app中包含了 ( component,config,mixin,directive,provide,use,mount,unmount ) 等属性
// - 4.3 插件的使用:
//    - app.use(plugin: Plugin, ...options: any[])
//      - 第一个参数: 插件
//      - 第二个参数: 传给插件的 选项对象，插件选项 (app.use() 的第二个参数) 将会传递给插件的 install() 方法

// 6
// app.component()
// 1.如果同时传递一个 ( 组件名字符串 )，( 及其定义 )，则 ( 注册一个全局组件 ) ---- 存
// 2.如果 ( 只传递一个名字 )，则会返回用该名字注册的组件 (如果存在的话) ---------- 取
