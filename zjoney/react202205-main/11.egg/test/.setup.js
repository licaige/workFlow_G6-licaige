const { app } = require('egg-mock/bootstrap');
const factories = require('./factories');
before(() => factories(app));
afterEach(async () => {
  /* await Promise.all([
    app.model.User.destroy({ truncate: true, force: true })
  ]); */
});
