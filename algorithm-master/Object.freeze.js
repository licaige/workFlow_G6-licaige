// 这个方法返回传递的对象，而不是创建一个被冻结的副本。
var player = {
      name: 'Curry',
      age: 34,
      num: {
        a: 1,
        b: {
          c: 2
        }
      }
    }
// Object.freeze(player) // "浅冻结"
player.age = 3 // 基本数据类型属性无法修改
player.num.a = 2 // (引用类型)对象属性依然可以修改
console.log('player:', player) // { name: 'Curry', age: 34, num: { a: 2, b: { c: 2 } } }

// "深冻结"函数
var deepFreeze = function (obj) {
    // 获取定义在对象obj的所有属性名
    // Object.getOwnPropertyNames() 获取对象的所有自身属性的属性名（包括可枚举和不可枚举属性但不包括 Symbol 值作为名称的属性）组成的数组
    var keys = Object.getOwnPropertyNames() // Object.keys(obj) 只能获取到所有的可枚举属性
    console.log('keys:', keys)
    // 在冻结自身之前冻结属性
    keys.forEach(key => {
      var val = obj[key]
      // 如果 val 是个对象，冻结它
      if (typeof val === 'object' && val !== null) {
        deepFreeze(val) // 递归冻结所有属性
      }
    })
    // 冻结自身(no-op if already frozen)
    return Object.freeze(obj)
  }
deepFreeze(player)
player.num.b.c = 3 // 对象属性也无法修改
console.log('player:', player) // { name: 'Curry', age: 34, num: { a: 2, b: { c: 2 } } }
var list = [1, 2, 3, { name: 'curry' }, 5]
deepFreeze(list) // 深冻结
// Object.freeze(list) // 浅冻结
list[3].name = 'sc'
console.log('list:', list)
console.log(Object.isFrozen(list)) // true

// 使用Object.isFrozen()方法判断一个对象是否被冻结。返回表示给定对象是否被冻结的Boolean
console.log(Object.isFrozen(player)) // true