const obj = new Object() // 等价于 const obj = {}
const arr = new Array() // 等价于 const arr = []
const fn = function () {}
const date = new Date()
const reg = new RegExp('at', 'g')
const newTru = new Boolean(true) // typeof：oject
const newNum = new Number(3) // typeof：object
const newStr = new String('world') // typeof：object
const sym = Symbol('sy') // 表示独一无二的值，常用来定义对象的唯一属性名
const tru = true // typeof：boolean
const num = 5 // typeof：number
const str = 'world' // typeof：string
// var formData = new FormData()
// formData.set('data', 1)
console.log('type obj:', Object.prototype.toString.call(obj)) // [object Object]
console.log('type arr:', Object.prototype.toString.call(arr)) // [object Array]
console.log('type fn:', Object.prototype.toString.call(fn)) // [object Function]
console.log('type date:', Object.prototype.toString.call(date)) // [object Date]
console.log('type reg:', Object.prototype.toString.call(reg)) // [object RegExp]
console.log('type newTru:', Object.prototype.toString.call(newTru)) // [object Boolean]
console.log('type newNum:', Object.prototype.toString.call(newNum)) // [object Number]
console.log('type newStr:', Object.prototype.toString.call(newStr)) // [object String]
console.log('type sym:', typeof sym) // symbol
console.log('type sym:', Object.prototype.toString.call(sym)) // [object Symbol]
console.log('type tru:', Object.prototype.toString.call(tru)) // [object Boolean]
console.log('type num:', Object.prototype.toString.call(num)) // [object Number]
console.log('type str:', Object.prototype.toString.call(str)) // [object String]
// console.log('type formData:', Object.prototype.toString.call(formData)) // [object FormData]
// console.log('type file:', Object.prototype.toString.call(file)) // [object File] 二进制文件流（binary）
// 使用apply也一样