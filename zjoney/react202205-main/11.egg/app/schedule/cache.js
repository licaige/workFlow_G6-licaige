const { Subscription } = require('egg');
class Cache extends Subscription {
  static get schedule() {
    return {
      interval: '1m',//间隔1分钟
      type: 'all'//egg.js默认是多进程的，会有多个worker,all就是在每个worker上执行
    }
  }
  //是真正执行的计划任务函数逻辑
  async subscribe() {
    /*  const res = await this.ctx.curl(this.config.cache.refreshUrl, { dataType: 'json' });
     this.ctx.app.cache = res.data; */
  }
}
module.exports = Cache;