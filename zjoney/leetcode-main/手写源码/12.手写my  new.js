
const myNew = function(fn, ...args) {
  let context = Object.create(fn.prototype)
  let res = fn.apply(context, args)
  // 如果 res 是 undefined 或者，没有返回的东西，则返回 context
  if (res instanceof Object) {
    return res
  } else {
    return context
  }
}
function Person(name, age) {
  this.name = name;
  this.age = age;
}
const person = myNew(Person, 'fl', 32)
console.log(person)