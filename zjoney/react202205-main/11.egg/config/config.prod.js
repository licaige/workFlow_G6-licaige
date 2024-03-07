module.exports = (app) => {
  const config = {};
  config.sequelize = {
    dialect: 'mysql',//java
    host: 'localhost',
    port: '3306',
    username: 'root',
    password: 'root',
    database: 'cms-prod'
  }
  return config;
}