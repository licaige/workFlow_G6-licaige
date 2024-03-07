const { assert, app } = require('egg-mock/bootstrap');
describe('test /news', () => {
  /*   it('test mockContext', async () => {
      //可以通过app 快速 创建一个ctx对象
      const ctx = app.mockContext({
        session: { user: { name: 'zhufeng' } }
      });
      assert(ctx.method === 'GET');
      assert(ctx.url === '/');
      assert(ctx.session.user.name === 'zhufeng');
    }); */
  //在测试用例中编写异步代码有三种方式
  /*  it('promise', () => {
     return app.httpRequest().get('/users').expect(200);
   });
   it('callback', (done) => {
     app.httpRequest().get('/users').expect(200, done);
   });
   it('async', async () => {
     await app.httpRequest().get('/users').expect(200);
   }); */
});