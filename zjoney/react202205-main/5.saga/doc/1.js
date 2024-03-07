/**
 * pure function 纯函数
 * 就是没有副作用的函数，
 * 副作用就是发了一些函数外部可观察到的变化
 * 
 * 纯函数的两个特点或者说要求
 * 1.输出只依赖输入,不依赖外部变量
 * 2.不能修改函数作用域之外的变量
 */
let prefix = '$';
function sum(a, b) {
  prefix = '新';
  return prefix + a + b;
}
sum(1, 2)
console.log(prefix);