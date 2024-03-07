// 
function myNew(Fn, ...args) {
  const obj = new Object();
  obj.__proto__ = Fn.prototype;
  //  将构造函数内部this替换为新对象
  const res = Fn.apply(obj, args)
  if (typeof res === 'obj' && res !== null) {
    return res;
  } else {
    return obj;
  }
}
function Animal(name, age) {
  this.name = name;
  this.age = age;
}
const ani = myNew(Animal, 'cat', '1')
console.log('ani', ani);


