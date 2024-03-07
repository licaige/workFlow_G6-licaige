const { assert, app } = require('egg-mock/bootstrap');
describe('test app extend', () => {
  it('test cache', async () => {
    app.cache.set('name', 'zhufeng');
    assert(app.cache.get('name'), 'zhufeng');
  });
});