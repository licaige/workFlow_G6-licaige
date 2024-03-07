const { Controller } = require('egg');
class NewsController extends Controller {
  async index() {
    const { ctx, service, config } = this;
    const { pageNum = config.news.pageNum, pageSize = config.news.pageSize } = ctx.query;
    const list = await service.news.list(pageNum, pageSize);
    /*   list.forEach(item => {
        item.createAt = ctx.helper.fromNow(item.createAt);
      }); */
    await ctx.render('index', { list, title: "新闻列表" });
  }
}
module.exports = NewsController;