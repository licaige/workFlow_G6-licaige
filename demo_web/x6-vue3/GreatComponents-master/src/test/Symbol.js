// 第七种js数据类型

let s1 = Symbol('s')
let s2 = Symbol('s')
s1 == s2 // false
Symbol.for('a') == Symbol.for('b') // true


s1 + s2 // 报错，symbol不能用四则运算

String(s1) // 可以
Boolean(s2) // 可以

// 作为对象属性，有三种写法
var obj = {}

obj[s1] = 'xxx' // 1

obj = {  // 2
  [s1]: 123,
  a: 321,
  b: 321,
}

Object.defineProperty(obj, s1, {value: 'xxx'})  // 3

// 对象属性遍历

Object.keys(obj)  // ['a', 'b']
Object.getOwnPropertyNames(obj)  // ['a', 'b']
Object.getOwnPropertySymbols(obj)  // [Symbol('s')]
Reflect.ownKeys(obj)  // [Symbol('s'), 'a', 'b']
