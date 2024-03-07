const { Controller } = require('egg');
const users = [];
class UsersController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = await this.service.users.index();
  }
  async add() {
    await this.ctx.render('user/add');
  }
  async doAdd() {
    const { ctx } = this;
    let user = ctx.request.body;
    user.id = users.length > 0 ? users[users.length - 1].id + 1 : 1;
    users.push(user);
    ctx.body = user;
  }
}
module.exports = UsersController;