const path = require('path');
function resolve(dir){
    return path.join(__dirname,dir)
}
module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? '/x6-vue3-components-examples/' : '/',
    configureWebpack: {
        module:{
            rules:[{
                test:/\.mjs$/,
                use: ['babel-loader'], 
                include: /node_modules/,
                type: "javascript/auto"
            }]
        },
        resolve: {
            symlinks: false,
            alias: {
                vue: path.resolve('./node_modules/vue')
            }
        }
    },
    pluginOptions: {
        'style-resources-loader': {
            preProcessor: 'scss',
            patterns: [
                // 这个是绝对路径,不能使用 alias 中配置的别名路径，如@表示的src
                path.resolve(__dirname, './src/components/X6UI/style/theme/variables.scss')
            ]
        }
    },
    runtimeCompiler: true,
    chainWebpack:(config)=>{
        config.resolve.alias
            //set第一个参数：设置的别名，第二个参数：设置的路径
            .set('@',resolve('./src'))
            .set('assets',resolve('.src/assets'))
            .set('components',resolve('./src/components'))
            .set('views',resolve('./src/views'))
    }
}