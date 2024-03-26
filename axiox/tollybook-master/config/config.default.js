/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1666591927088_8839';

  // add your middleware config here
  config.middleware = [];

  config.view = {
    mapping: {'.html': 'ejs'}  //左边写成.html后缀，会自动渲染.html文件
  };
  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true
    },
    domainWhiteList: ['*'] // 配置白名单
  }

  config.jwt = {
    secret: 'xiaoming'
  }

  config.multipart = {
    mode: 'file',
    whitelist: ['.txt','.jpeg','.png','.jpg']
  }

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
    uploadDir: 'app/public/upload'
  };

  config.cors = {
    origin: '*',
    credentials: true, // 允许 Cookie 跨域跨域
    allowMethods: 'GET,HEAD,POST,PUT,DELETE,PATCH'
  }


  const mysql = {
    mysql: {
      // 单数据库信息配置
      client: {
        host: 'localhost',
        port: '3306',
        user: 'root',
        password: '',
        database: 'juejin-cost'
      },
      app: true,
      agent: false
    }
  }

  return {
    ...config,
    ...userConfig,
    ...mysql
  };
};
