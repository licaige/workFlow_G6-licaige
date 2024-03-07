const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
module.exports = (env) => {
    return {
        // 1.为了更好的看到打包后的代码，统一设置mode为开发模式
        mode: 'development',
        output: {
            filename: 'index.js',
            path: path.resolve(__dirname, 'dist'),
            // 2.指定生产模式下采用systemjs 模块规范
            libraryTarget: env.production ? 'system' : ''
        },
        module: {
            // 3.使用babel解析js文件
            rules: [{
                test: /\.js$/,
                use: { loader: 'babel-loader' },
                exclude: /node_modules/
            }]
        },
        plugins: [
            // 4.生产环境下不生成html
            !env.production && new HtmlWebpackPlugin({
                template: './public/index.html'
            }),
        ].filter(Boolean),
        // 5.生产环境下不打包react,react-dom。（这里也可以打包到当前项目下均可）
        externals: env.production ? ['react', 'react-dom'] : [],

        // 打包的时候 1） 考虑公共模块是否要打包进去  2） 打包后的资源大小
    }
}

// 我们将子应用 打包成类库，在主应用中加载这个库（systemjs）
// system 模块规范 umd amd esModule commonjs