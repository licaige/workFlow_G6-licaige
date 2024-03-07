function myInstanceOf(obj, fn) {
   // 构造函数 Fn 是否出现在 obj 的原型链上
  const proto = Object.getPrototypeOf(obj);
  while (proto) {
    if (proto === fn.prototype)
      return true
    proto = Object.getPrototypeOf(proto)
  }
  return false;
}
// test
const obj = { a: 1, b: 2 }
console.log(myInstanceOf(obj, Object)) // true

