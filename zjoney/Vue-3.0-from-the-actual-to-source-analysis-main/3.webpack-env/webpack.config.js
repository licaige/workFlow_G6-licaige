const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    entry:'./src/index.js',
    output:{
        filename:'bundle.js'
    },
    devtool:'source-map',
    module:{
        rules:[
            {
                test:/\.js/,use:'babel-loader',exclude:/node_modules/
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:'./public/index.html'
        })
    ]
}