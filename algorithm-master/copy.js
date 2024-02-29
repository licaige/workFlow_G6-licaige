/*
  https://juejin.cn/post/6844904197595332622
  https://juejin.cn/post/6844903929705136141
  浅拷贝：创建一个新对象，这个对象有着原始对象属性值的一份精确拷贝。
      如果属性是基本类型，拷贝的就是基本类型的值，如果属性是引用类型，拷贝的就是内存地址，
      所以如果其中一个对象改变了这个地址指向的值，就会影响到另一个对象。
  深拷贝：将一个对象从内存中完整的拷贝一份出来,从堆内存中开辟一个新的区域存放新对象,且修改新对象不会影响原对象。
*/
// 一、Object.assign(target, source)
// 基本数据类型的复制，是深复制；引用数据类型的复制，是浅复制
// ①对象复制
var source = {
      name: '库里',
      player: {
        num: 30,
        age: 34
      }
    }
var target = {}
target = Object.assign(target, source)
target.name = 'curry' // 基本类型
target.player.num = 3 // 引用类型，也会改变source
console.log('source:', source) // { name: '库里', player: { num: 3, age: 34 } }
console.log('target:', target) // { name: 'curry', player: { num: 3, age: 34 } }
// ②数组复制
var source = [
      '库里',
      {
        num: 30,
        age: 34
      }
    ]
var target = []
target = Object.assign(target, source)
target[0] = 'curry' // 基本类型
target[1].num = 3 // 引用类型，也会改变source
console.log('source:', source) // [ '库里', { num: 3, age: 34 } ]
console.log('target:', target) // [ 'curry', { num: 3, age: 34 } ]
// 二、扩展运算符（…）
// 基本数据类型的复制，是深复制；引用数据类型的复制，是浅复制
// ①对象复制
var source = {
      name: '库里',
      player: {
        num: 30,
        age: 34
      }
    }
var target = { ...source }
target.name = 'curry' // 基本类型
target.player.num = 3 // 引用类型，也会改变source
console.log('source:', source) // { name: '库里', player: { num: 3, age: 34 } }
console.log('target:', target) // { name: 'curry', player: { num: 3, age: 34 } }
// ②数组复制
var source = [
      '库里',
      {
        num: 30,
        age: 34
      }
    ]
var target = [ ...source ]
target[0] = 'curry' // 基本类型
target[1].num = 3 // 引用类型，也会改变source
console.log('source:', source) // [ '库里', { num: 3, age: 34 } ]
console.log('target:', target) // [ 'curry', { num: 3, age: 34 } ]
// 三、var target = JSON.parse(JSON.stringify(source))
// 真正的深复制，无论是基本数据类型还是引用数据类型
// JSON.stringify()：将 JavaScript值（通常为对象或数组）转换为 JSON 字符串
// JSON.parse()：将一个 JSON 字符串转换为对象或数组
// ①对象深复制
var source = {
      name: '库里',
      player: {
        num: 30,
        age: 34
      }
    }
var target = JSON.parse(JSON.stringify(source))
target.name = 'curry' // 基本类型
target.player.num = 3 // 引用类型，不会影响source
console.log('source:', source) // { name: '库里', player: { num: 30, age: 34 } }
console.log('target:', target) // { name: 'curry', player: { num: 3, age: 34 } }
// ②数组深复制
var source = [
      '库里',
      {
        num: 30,
        age: 34
      }
    ]
var target = JSON.parse(JSON.stringify(source))
target[0] = 'curry' // 基本类型
target[1].num = 3 // 引用类型
console.log('source:', source) // [ '库里', { num: 30, age: 34 } ]
console.log('target:', target) // [ 'curry', { num: 3, age: 34 } ]

// JSON.parse(JSON.stringify())深拷贝存在的问题
let source = {
  name: '库里',
  player: {
    num: 30,
    age: 34
  },
  date: new Date(), // 深拷贝后类型会变为string
  reg: /^[1-9]$/, // 或new RegExp('[1-9]')，深拷贝后会变为空对象{}
  err: new Error('err'), // 深拷贝后会变为空对象{}
  undef: undefined, // 深拷贝后会丢失
  func: () => { console.log('func') }, // 深拷贝后会丢失
  nan: NaN, // 深拷贝后会变成null
  infinityMax: Infinity, // 深拷贝后会变成null
  infinityMin: -Infinity // 深拷贝后会变成null
}
// source.child = source // 循环引用后，深拷贝报错：TypeError: Converting circular structure to JSON
const target = JSON.parse(JSON.stringify(source))
console.log('type:', typeof source.date) // object
console.log('type:', typeof target.date) // string
console.log('source:', source)
console.log('target:', target)