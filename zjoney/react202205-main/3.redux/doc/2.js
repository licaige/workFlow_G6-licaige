function add1(str) {
  return '1' + str;
}
function add2(str) {
  return '2' + str;
}
function add3(str) {
  return '3' + str;
}

//let result = add3(add2(add1('zhufeng')));
/* function compose(...funcs) {
  return function (args) {
    for (let i = funcs.length - 1; i >= 0; i--) {
      args = funcs[i](args);
    }
    return args;
  }
} */
function compose(...funcs) {
  return funcs.reduce((a, b) => (...args) => a(b(...args)));
}
const fn = compose(add3, add2, add1);
/**
 * let funcs = [add3,add2,add1];
 * 第1次的时候 a=add3,b=add2  返回一个新的函数 (args)=>add3(add2(args))
 * 第2次的时候 a=(args)=>add3(add2(args)) b=add1 返回一个新的函数    (args)=> add3(add2(add1(args))
 * 最终我们会返回一个新的函数 (args)=> add3(add2(add1(args))
 */

console.log(fn('zhufeng'));