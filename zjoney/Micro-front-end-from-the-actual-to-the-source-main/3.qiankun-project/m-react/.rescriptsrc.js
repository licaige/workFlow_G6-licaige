module.exports = {
    webpack:(config)=>{
        config.output.libraryTarget = 'umd';
        config.output.library = 'm-react'; // 打包的格式是umd格式

        return config
    },
    devServer:(config)=>{
        config.headers = {
            'Access-control-Allow-Origin':"*"
        }
        return config
    }
}