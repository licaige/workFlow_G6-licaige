const { Service } = require('egg');
class UsersService extends Service {
  async index(pageNum, pageSize) {
    const { ctx } = this;
    const result = await ctx.model.User.findAll();
    return result;
  }
}
module.exports = UsersService;