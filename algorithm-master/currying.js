function  getLink (a, b) {
  return a + b
}
// 通用柯里化工具函数
function currying (fn, args) {
  args = args || [] // 柯里化时传入的参数
  console.log('out-args:', args)
  return function () {
    // arguments是柯里化后传入的参数
    console.log('in-args:', args) // 利用闭包把柯里化时的传参保存下来
    let allArgs = [...args, ...arguments] // 合并参数
    console.log('arguments:', [...arguments])
    console.log('allArgs:', allArgs)
    // 如果参数个数小于fn.length，则递归调用，继续收集参数
    if (allArgs.length < fn.length) { // fn.length：要柯里化函数的形参个数
      // return currying.call(this, fn, allArgs) // call接收参数列表
      return currying(fn, allArgs)
    }
    // 参数收集完，则执行fn
    // return fn.call(this, allArgs) // apply接收参数数组
    return fn(...allArgs)
  }
}
var curryingLink = currying(getLink)
console.log('curryingLink:', curryingLink) // function {...}
console.log('(a,b):', curryingLink('a', 'b')) // ab
console.log('(a):', curryingLink('a')) // function {...}
console.log('(a)(b):', curryingLink('a')('b')) // ab