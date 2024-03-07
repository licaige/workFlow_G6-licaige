//监听某个动作的派发
export const TAKE = 'TAKE';
//向仓库派发某个动作
export const PUT = 'PUT';
//开启一个新的子进程
export const FORK = 'FORK';
//让saga中间件调用一个函数，函数会返回一个promise,等promise完成后继续向下执行本saga
export const CALL = 'CALL';
//让saga中间件调用一个函数，此函数在执行结束后会调用最后一个参数,就是callback,继续向下执行本saga
export const CPS = 'CPS';
//提供多个saga,需要等这多个saga全部完成了才会继续向下执行当前的saga
export const ALL = 'ALL';
//取消任务或者说取消saga执行
export const CANCEL = 'CANCEL';