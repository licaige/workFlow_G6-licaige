const { Controller } = require('egg');
class NewsController extends Controller {
  async index() {
    const { ctx } = this;
    let email = ctx.__('email');
    let welcome = ctx.__('welcome back ,%s', 'zhufeng');
    let name = ctx.__('hello {0},my name is {1}', ['zhufeng', 'jiagou']);
    //ctx.body = email + welcome + name;
    //await ctx.render('home', { name: 'zhufeng', names: ['zhufeng', 'jiagou'] });

    ctx.body = this.app.config.env;
  }
}
module.exports = NewsController;