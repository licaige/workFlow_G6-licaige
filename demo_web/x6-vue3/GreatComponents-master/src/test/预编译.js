function fn (a, c) {
  console.log(a) // function a () {}
  // 用let会报错
  var a = 123
  console.log(a) // 123
  console.log(c) // function c () {}
  function a () {}
  if (false) {
    var d = 678
  }
  console.log(d) // undefined
  console.log(b) // undefined
  var b = function () {}
  console.log(b) // function () {}
  function c () {}
  console.log(c) // function c () {}
}

fn(1, 2)

// 预编译
// 作用域的创建阶段 预编译阶段
// 预编译的时候做的事情：
// js的变量对象 AO对象 供js引擎自己访问
// 1 创建AO对象 2 找形参和变量的声明 并赋值undefined 3 实参形参相统一 4 找函数声明 会覆盖变量的声明

/**
 * AO {
 *  fn ...
 *  a undefined 1 function a () {}
 *  c undefined 2 function c () {}
 *  d undefined 
 *  b undefined function () {}
 * }
*/

// js 的解释执行 逐行执行