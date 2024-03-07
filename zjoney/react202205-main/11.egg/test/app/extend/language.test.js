const { assert, app } = require('egg-mock/bootstrap');
describe('test context extend', () => {
  it('test language', async () => {
    const ctx = app.mockContext({ headers: { 'Accept-language': 'zh-CN' } });
    assert(ctx.language() === 'zh-CN');
  });
});