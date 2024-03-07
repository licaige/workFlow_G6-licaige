module.exports = (app) => {
  const config = {};
  //是用来加密cookie
  config.keys = 'zhufeng';
  config.view = {
    defaultExtension: '.html',//默认的模板文件扩展名
    defaultViewEngine: 'nunjucks',//默认的模板引擎
    mapping: {
      '.html': 'nunjucks'
    }
  }
  config.news = {
    pageNum: 1,
    pageSize: 10,
    newsUrl: 'http://localhost:3000/news'
  }
  config.cache = {
    refreshUrl: 'http://localhost:3000/refresh'
  }
  config.mysql = {
    client: {
      host: 'localhost',
      port: '3306',
      user: 'root',
      password: 'root',
      database: 'cms'
    },
    app: true,
    agent: false
  }
  config.sequelize = {
    dialect: 'mysql',//在此指定数据库的类型,虽然不同地区有方言，但是他们前提都是中文
    host: 'localhost',
    port: '3306',
    username: 'root',
    password: 'root',
    database: 'cms'
  }
  config.i18n = {
    defaultLocale: 'en-US'
  }
  //可以给项目配置中间件
  config.middleware = [
    'robot'
  ]
  config.robot = {
    uas: []
  }
  return config;
}