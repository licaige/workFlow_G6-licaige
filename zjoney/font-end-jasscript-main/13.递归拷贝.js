function deepClone(obj, cache = new WeakMap()) {
  if (obj === null || typeof obj !== 'object') return obj;
  if (obj instanceof Date) return new Date();
  if (obj instanceof RegExp) return new RegExp();
  if (cache.has(obj)) return cache.get(obj);//如果出现缓存应用，则返回缓存对象
  let cloneObj = new obj.constructor();//使用对象所属的构造函数，创建新的对象
  cache.set(obj, cloneObj)//  缓存对象，用于循环引用的情况
  for(let key in obj){
    if(obj.hasOwnProperty(key)){
      cloneObj[key] = deepClone(obj[key], cache)
    } 
  }
  return cloneObj;
}

// test
let obj = {name: '杰克', add:{a: 1, b:3}}
obj.a = obj;
const obj1 = deepClone(obj)
console.log(obj1.add === obj.add, obj1, obj) // false
