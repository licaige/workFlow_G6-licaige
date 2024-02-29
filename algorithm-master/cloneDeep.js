/*
  https://juejin.cn/post/6844904197595332622
  https://juejin.cn/post/6844903929705136141
  浅拷贝：创建一个新对象，这个对象有着原始对象属性值的一份精确拷贝。
      如果属性是基本类型，拷贝的就是基本类型的值，如果属性是引用类型，拷贝的就是内存地址，
      所以如果其中一个对象改变了这个地址指向的值，就会影响到另一个对象。
  深拷贝：将一个对象从内存中完整的拷贝一份出来,从堆内存中开辟一个新的区域存放新对象,且修改新对象不会影响原对象。
*/
function deepClone (target, wmap = new WeakMap()) {
  if (target === null) return target // null 直接返回
  if (target instanceof Date) return new Date(target)
  if (target instanceof RegExp) return new RegExp(target)
  // 可能是对象或者普通的值，如果是函数的不需要深拷贝
  if (typeof target !== 'object') { // 包括: boolean/number/string/undefined/function
    return target
  }
  // 防止循环引用
  if (wmap.get(target)) {
    return wmap.get(target)
  }
  // 实例的构造函数，就是其类原型的构造函数constructor()方法，类原型的构造函数constructor，直接指向类本身
  // obj.constructor === Object.prototype.constructor === Object
  let cloneTarget = new target.constructor()
  wmap.set(target, cloneTarget)
  for (let key in target) {
    cloneTarget[key] = deepClone(target[key], wmap)
  }
  return cloneTarget
}
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
source.self = source // 循环引用，即对象的属性间接或直接的引用了自身的情况
let target = deepClone(source)
console.log('source:', source)
console.log('target:', target)
console.log('source:', source.toString()) // '[object Object]'
/*
  解决循环引用问题，我们可以额外开辟一个存储空间，来存储当前对象和拷贝对象的对应关系，
  当需要拷贝当前对象时，先去存储空间中找，有没有拷贝过这个对象，如果有的话直接返回，
  如果没有的话继续拷贝，这样就巧妙化解的循环引用的问题
*/
function clone (target, map = new Map()) {
  if (typeof target === 'object') {
    let cloneTarget = Array.isArray(target) ? [] : {}
    if (map.get(target)) {
      return map.get(target)
    }
    map.set(target, cloneTarget)
    for (const key in target) {
      cloneTarget[key] = clone(target[key], map)
    }
    return cloneTarget
  } else {
    return target
  }
}
// let target = deepClone(source)
// console.log('source:', source)
// console.log('target:', target)
// console.log('source:', source.toString()) // '[object Object]'

