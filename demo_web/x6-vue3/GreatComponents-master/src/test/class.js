/**
 * 1. class中挂载到原型链上的方法：fn() {}
 *    fn = () => {}和fn = funciton() {}都只能挂载到实例化对象上
 * 2. class中写this.prototype的方法：static
 */

class Person {
  constructor (name) {
    this.name = name

    function fn1 () {
      console.log('fn')
    }
    this.fn1 = fn1
    this.fn2 = function () {
      console.log('fn2')
    }
    this.fn3 = this.fn4
    this.fn5()
    this.fn5 = 123
    // 这里的this指向实例化对象，这里的this.prototype是undefined
    // this.prototype.a = () => {}
    // this.prototype.b = 123
  }
  // fn4, fn5挂载在Person上
  fn4 () {
    console.log('fn4')
  }
  fn5 () {
    console.log('fn5')
  }
  // fn6, fn7挂载在实例化对象上
  fn6 = () => {}
  fn7 = function() {}
  // static {
  //   // 这里的this指向Person
  //   this.prototype.a = () => {}
  //   this.prototype.b = 123
  // }
}

let a = new Person('a')
let b = new Person('b')

console.log(a, b)
console.log(a.fn1 == b.fn1) // 在constructor内部声明赋值的，不相等 false
console.log(a.fn2 == b.fn2) // 在constructor内部声明赋值的，不相等 false
console.log(a.fn3 == b.fn3) // 在constructor外部 用 fn() {}方式声明的，相等 true
console.log(a.fn4 == b.fn4) // 在constructor外部 用 fn() {}方式声明的，相等 true
console.log(a.fn4==a.__proto__.fn4) // fn4在构造函数中隐式加载到Person原型链上了，相等 true
console.log(a.fn5 == b.fn5) // 变成了123，相等 true
console.log(a.fn6 == b.fn6) // 在constructor外部 用 fn = ()=> {}方式声明的，不相等 false
console.log(a.fn7 == b.fn7) // 在constructor外部 用 fn = function() {}方式声明的，不相等 false
a.__proto__.fn5() // fn5


console.log(a.a == b.a) // 原型链上的，相等 true
console.log(a.b == b.b) // 原型链上的，相等 true

a.fn1() // 在constructor被覆盖，fn
a.fn2() // fn2
a.fn3() // fn4
a.fn4() // fn4
a.fn5() // 报错，在constructor被覆盖不是函数
