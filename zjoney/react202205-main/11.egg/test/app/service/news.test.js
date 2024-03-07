const { assert, app } = require('egg-mock/bootstrap');
describe('test news', () => {
  it('test news Service list', async () => {
    const ctx = app.mockContext();
    const result = await ctx.service.news.list();
    assert(result.length === 3);
  });
});