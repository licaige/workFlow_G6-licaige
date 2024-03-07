module.exports = {
    chainWebpack:config=>{
        // 配置不打包 Vue 及 vue-router
        config.externals(["vue","vue-router"])
    }
}