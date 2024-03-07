const { Service } = require('egg');
class NewService extends Service {
  async list() {
    const { ctx } = this;
    const result = await this.app.mysql.query(`select * from news`);
    return result;
  }
}
module.exports = NewService;

