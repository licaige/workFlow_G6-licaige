const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const Mfp = require('webpack').container.ModuleFederationPlugin

module.exports = {
    // entry 入口，output出口，module模块，plugins 插件  mode工作模式，devServer开发服务器

    //  mode 工作模式
    mode: 'development', // production  、 development、none

    // 入口 
    entry: './src/index.js',

    //  出口 
    output: {
        filename: './bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    // 模块 
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                '@babel/preset-env',
                                '@babel/preset-react'
                            ]
                        }
                    }
                ]
            },
        ]
    },

    //  插件 
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),

        new Mfp({
            name:'roots',
            remotes:{
                one:"study@http://localhost:3001/myuser.js"
            }
        })
    ],

    //  服务器
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        port: 3000,
        open: true
    },


}