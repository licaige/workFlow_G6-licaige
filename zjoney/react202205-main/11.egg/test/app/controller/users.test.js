const { assert, app } = require('egg-mock/bootstrap');
describe('test users', () => {
  it('Post /doAdd', async () => {
    let user = { username: 'zhufeng1' };
    app.mockCsrf();
    let response = await app.httpRequest().post('/doAdd').send(user).expect(200);
    assert(response.body.id === 1)
  });
});