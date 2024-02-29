console.log(a) // undefined（只提升变量声明，不提升变量赋值）
var a = 1
/*
  实际运行时：var a console.log(a) a = 1
*/

// 变量提升只对var命令声明的变量有效，如果一个变量不是var变量声明的，就不会发生变量提升
// console.log(aa) // ReferenceError: aa is not defined 不会变量提升
aa = 1
console.log(aa)

// 与普通变量一样，js中的function也可看做变量，也存在变量提升的情况：
b()
function b() { // 函数声明被提升至代码头部
  console.log(1)
}
// 如果采用赋值语句定义函数，JavaScript就会报错：
c() // TypeError: c is not a function
var c = function () {
  console.log(1)
}
/*
  因为实际运行过程：
  var c // 这时候a是个变量，并非function
  c()
  c = function () {
    console.log(1)
  }
*/