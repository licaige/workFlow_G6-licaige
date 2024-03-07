
//egg提供了统一的入口文件进行启动过程的自定义
module.exports = (app) => {
  app.beforeStart(async () => {
    //在系统启启动前先立刻执行一次计划任务
    await app.runSchedule('cache');
  });
}