const { assert, app } = require('egg-mock/bootstrap');
describe('test request', () => {
  it('test request', async () => {
    const ctx = app.mockContext({
      headers: {
        'User-Agent': 'Chrome'
      }
    });
    assert(ctx.request.isChrome);
  });
  it('test status200', async () => {
    const ctx = app.mockContext({});
    ctx.status = 200;
    assert(ctx.response.isSuccess);
  });
  it('test status500', async () => {
    const ctx = app.mockContext({});
    ctx.status = 500;
    assert(!ctx.response.isSuccess);
  });
});