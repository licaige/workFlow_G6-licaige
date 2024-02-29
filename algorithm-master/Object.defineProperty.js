let player = {
  name: 'Curry',
  age: 34,
  career: {
    sports: 'basketball'
  }
}
function defineProperty (obj, key, val) {
  //如果某对象的属性也是一个对象，递归进入该对象，进行监听
  if (typeof val === 'object') {
    Observer(val)
  }
  Object.defineProperty(obj, key, {
    get () {
      console.log(`访问了${key}属性`)
      return val
    },
    set (newVal) {
      if (typeof newVal === 'object') {
        Observer(key)
      }
      console.log(`${key}属性被修改为${newVal}了`)
      val = newVal
    }
  })
}
// 实现一个遍历函数Observer
function Observer (obj) {
  if (typeof obj !== 'object' || obj === null) {
    return
  }
  Object.keys(obj).forEach(key => {
    defineProperty(obj, key, obj[key])
  })
}
Observer(player)
// get
console.log(player.career.sports) // basketball
console.log(player.career.exercise) // undefined
// set
player.career.sports = 'golf' // 已有属性
console.log(player.career.sports) // golf
player.num = 30 // 新增属性无法监听
console.log(player.num) // 无法触发监听
console.log(player)
player.career.height = 190 // 添加新属性
console.log(player.career.height) // 190