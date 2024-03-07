module.exports = (options, app) => {
  return async function (ctx, next) {
    const source = ctx.get('user-agent') || '';//获取请求头中的用户代理
    const matched = options.uas.some(ua => ua.test(source));
    if (matched) {
      ctx.status = 403;
      ctx.body = '无权访问';
    } else {
      await next()
    }
  }
}
//在项目中我们权限判断还有请求数据校验都是通过中间件实现