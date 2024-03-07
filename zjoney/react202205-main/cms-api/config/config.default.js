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
  config.keys = appInfo.name + '_1656223489640_3391';

  // add your middleware config here
  config.middleware = [];
  config.security = {
    csrf: false
  }
  config.mysql = {
    client: {
      host: 'localhost',
      port: 3306,
      user: 'root',
      password: 'root',
      database: 'cms'
    }
  }
  config.view = {
    defaultExtension: '.js',
    defaultViewEngine: 'nunjucks',
    mapping: {
      '.js': 'nunjucks'
    }
  }
  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
