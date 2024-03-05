## 个人手写的于前端埋点,性能分析的工具

### 开发

1. 配置webpack.config  运行后将LzyWebWatcher挂载到window上
    module: "UMD", // 自定义打包模块化规范(默认为CMD)
    umdName: "LzyWebWatcher", // UMD挂载到window上时会使用此名

2. npm run build 生成bundle.js    在html中引用

3. 使用脚本
~~~
   let watcher = new LzyWebWatcher({
            watchPerformance: true, // 性能监听
            watchEvent: true,       // 事件监听
            watchError: true,       // 错误监听
            watchRouter: true       // 路由跳转监听
    })
~~~
### 功能
1. 埋点点击事件
~~~
 <button lzyWebWatcher-event-id="true">点击记录埋点</button>
~~~
2. 首屏渲染上报性能


## 使用个人开发的打包器进行构建
1. 如果要直接在html中使用 需要打包为UMD模块  配置webpack.config
~~~
{
    module: "UMD", // 自定义打包模块化规范(默认为CMD)
    umdName: "LzyWebWatcher", // UMD挂载到window上时会使用此名
}
~~~

2. 也可以不设置module和umdName字段, 直接打包为CMD 在其他js中引入
~~~
import LzyWebWatcher from './bundle.js'

   let watcher = new LzyWebWatcher({
            watchPerformance: true, // 性能监听
            watchEvent: true,       // 事件监听
            watchError: true,       // 错误监听
            watchRouter: true       // 路由跳转监听
    })
~~~

