
/**
 * promise、async await的异步操作的时候会加入到微任务中去，会在调用栈清空的时候立即执行
 * 调用栈中加入的微任务会立马执行
 * 
*/
// 3
var p = new Promise(resolve => {
  console.log(4)
  resolve(5)
})
function fn1 () {
  console.log(1)
}
function fn2 () {
  setTimeout(() => {
    console.log(2)
  }, 0)
  fn1()
  console.log(3)
  p.then(res => {
    console.log(res)
  })
}
fn2()


// 第3题
// 1,3,4,5,2