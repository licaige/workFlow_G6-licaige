/**
 * js语言特点：
 *  单线程 解释性语言
 * 事件循环机制由三部分组成
 *  1 调用栈  2 微任务队列  3 消息队列
 * 
 * event-loop开始的时候 会从全局一行一行执行，遇到函数调用，会压入到调用栈中，被压入的函数被称为帧 当函数返回后会从调用栈中弹出
 * 在调用栈清空后，微任务里的会比消息队列里的任务先执行
 * 
 * 宏任务中的事件放在callback queue中，由事件触发线程维护；微任务的事件放在微任务队列中，由js引擎线程维护
 * 宏任务：I/O、setTimeout、setInterval、setImmediate、requestAnimationFrame、MessageChannel
 * 微任务：process.nextTick、MutationObserver、Promise.then catch finally
 * 
*/




