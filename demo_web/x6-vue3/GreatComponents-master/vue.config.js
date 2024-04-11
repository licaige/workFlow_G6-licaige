module.exports = {
  lintOnSave: false,
  publicPath: '/',
  devServer: {
    host: '0.0.0.0',
    // port: 8110,
    open: true,
    overlay: {
      warnings: false,
      errors: true,
    },
    proxy: {
      "/water_resource": {
        target: "http://180.76.233.44:8907", // 新服务
        changeOrigin: true,
        pathRewrite: {
          "^/water_resource": "/water_resource",
        },
      }
    },
  },
};
