
/**
 * js中异步操作，如fetch、setTimeout、setInterval 压入调用栈的时候，里面的消息会进入到消息队列中去
 * 消息队列中 会等到调用栈清空后再执行
 * 
*/
// 2
function fn1 () {
  console.log(1)
}
function fn2 () {
  setTimeout(() => {
    console.log(2)
  }, 0)
  fn1()
  console.log(3)
}
fn2()






// 第2题
// 1,3,2