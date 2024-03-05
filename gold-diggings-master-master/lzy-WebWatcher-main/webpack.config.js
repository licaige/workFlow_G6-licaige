const path = require('path')


module.exports = {
    mode: 'development', // development|production
    rootPath: __dirname, // 项目根路径
    entry: path.join(__dirname, './src/out/index.js'), //配置打包入口
    output: path.join(__dirname, '/dist'), // 出口
    module: "UMD", // 自定义打包模块化规范(默认为CMD)
    umdName: "LzyWebWatcher", // UMD挂载到window上时会使用此名

    devServer: {
        port: 8000,// 端口
        socketPort: 3001,// 使用的webSocket的端口
        hot: true,// 启动热更新
        cors: true,// 配置是否能跨域
        staticPath: './public',// 静态资源托管文件夹
        publicPath: 'http://localhost:8000'         // 读取静态资源的地址(比如localhost:8000) 默认为本服务的端口
    }
}

