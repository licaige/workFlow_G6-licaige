/**
 * 对JS的对象进行深克隆，避免克隆后的对象引用原来的对象
 * 普通版本 考虑对象中的String和Number
 * 进阶版本 考虑Date，循环引用，和正则表达等类型
 * @param {*} obj 
 * @param {*} map 
 * @returns 
 */
const deepClone = function(obj, map = new Map()) {
  if (!obj) return obj
  if (map.has(obj)) { // 判断是否循环引用
    return map.get(obj) 
  }

  let newObj
  if (Object.prototype.toString.call(obj) == "[object Object]") {
    newObj = {}
    map.set(obj, newObj);
    for (let key in obj) {
      let val = obj[key]
      newObj[key] = deepClone(val, map)
    }
  } else if (Object.prototype.toString.call(obj) == "[object Array]") {
    newObj = []
    map.set(obj, newObj);
    for (let key in obj) {
      let val = obj[key]
      newObj[key] = deepClone(val, map)
    }
  } else if (Object.prototype.toString.call(obj) == "[object Function]") {
    if(obj.prototype) { // 有 prototype 就是普通函数
      newObj = function(){ return obj.apply(this, arguments) }
    } else {
      newObj = (...args) => { return obj.call(undefined, ...args) }
    }
  } else if (obj.constructor === Object.prototype.toString.call(obj) == "[object Date]") {
    newObj = new Date(obj)
  } else {
    newObj = obj
  }

  return newObj
}
// console.log(deepClone(1)) // 1
// console.log(deepClone(null)) // null
// console.log(deepClone(undefined)) // undefined
// console.log(deepClone([1, 2, 3]))
// console.log(deepClone({ a: new Date(), b: null, c: 123, d: [1,2,3] }))
const a = {
  b: {
    c: null,
  },
};
a.b.c = a;
// console.log(deepClone(a))
const f = function(){
  return 1+2
}
a.f= f
a.d=()=>{
  return 11+22
}
console.log(deepClone(a))
console.log(a)