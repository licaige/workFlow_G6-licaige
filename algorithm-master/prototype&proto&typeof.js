/*
  原型：
  显式原型：每个函数function都有一个prototype，这个就是显式原型
  隐式原型：每个实例对象都有一个__proto__，这个就是隐式原型
  每个实例对象的__proto__都等于其构造函数的prototype，它们都指向原型对象
  也就是 函数的是显式原型，实例对象的是隐式原型。
	• prototype与__proto__的联系
	  prototype与__proto__都指向原型对象，
    任意一个函数（包括构造函数）都有一个prototype属性，指向该函数的原型对象，
    任意一个构造函数实例化的对象，都有一个__proto__对象,它指向构造函数的原型对象.
	• prototype与__proto__的区别
		prototype是函数独有的，而__proto__是每个对象都会拥有的（包括函数）
		prototype的作用是保存所有实例公共的属性和方法；
    原型链：
      当试图访问一个对象的某个属性时，会先在对象自身中寻找，如果对象本身没有这个属性，
      则会去它的隐式原型 __proto__（也即它的构造函数的显式原型 prototype）中寻找，
      如果没有，则会去它的原型的原型中去寻找，直到找到Object对象的原型，如果依然没有，则返回undefined
    s.__proto__ === Student.prototype   prototype还有一个constractor属性,指向该对象的构造函数本身
*/
console.time('prototype')
const obj = new Object() // 等价于 const obj = {}
const arr = new Array() // 等价于 const arr = []
const fn = function () {}
const date = new Date()
const reg = new RegExp('at', 'g')
const err = new Error()
const newTru = new Boolean(true) // typeof：oject
const newNum = new Number(3) // typeof：object
const newStr = new String('world') // typeof：object
const tru = true // typeof：boolean
const num = 5 // typeof：number
const str = 'world' // typeof：string
console.log('typeof obj:', typeof obj) // object
console.log('typeof arr:', typeof arr) // object
console.log('typeof fn:', typeof fn) // function
console.log('typeof date:', typeof date) // object
console.log('typeof reg:', typeof reg) // object
console.log('typeof err:', typeof err) // object
console.log('typeof null:', typeof null) // object
console.log('typeof newTru:', typeof newTru) // object
console.log('typeof newNum:', typeof newNum) // object
console.log('typeof newStr:', typeof newStr) // object
console.log('typeof undefined:', typeof undefined) // undefined
console.log('typeof tru:', typeof tru) // boolean
console.log('typeof num:', typeof num) // number
console.log('typeof str:', typeof str) // string
console.log(obj.__proto__ === Object.prototype) // true
console.log(arr.__proto__ === Array.prototype) // true
console.log(fn.__proto__ === Function.prototype) // true
console.log(date.__proto__ === Date.prototype) // true
console.log(reg.__proto__ === RegExp.prototype) // true
console.log(tru.__proto__ === Boolean.prototype) // true
console.log(num.__proto__ === Number.prototype) // true
console.log(str.__proto__ === String.prototype) // true
console.log(Object.prototype.__proto__) // null
console.log(Array.prototype.__proto__ === Object.prototype) // true
console.log(Function.prototype.__proto__ === Object.prototype) // true
console.log(Date.prototype.__proto__ === Object.prototype) // true
console.log(RegExp.prototype.__proto__ === Object.prototype) // true
console.log(Boolean.prototype.__proto__ === Object.prototype) // true
console.log(Number.prototype.__proto__ === Object.prototype) // true
console.log(String.prototype.__proto__ === Object.prototype) // true

console.log('Object.__proto__:', Object.__proto__)
console.log('Function.prototype:', Function.prototype)
console.log(Object.__proto__ === Function.prototype) // true
console.log('obj.toString():', obj.toString()) // [object Object]

function Player (name) {
  this.name = name
  // return this // 默认返回this对象
}
var curry = new Player('curry')
console.log('curry:', curry)
console.log('curry.__proto__:', curry.__proto__)
console.log(curry.__proto__ === Player.prototype) // true
console.log('Player.prototype:', Player.prototype)
console.log('Player.prototype.__proto__:', Player.prototype.__proto__)
console.log(Player.prototype.__proto__ === Object.prototype) // true
console.log(Object.prototype.__proto__) // null，Object的隐式原型__proto__指向null
console.timeEnd('prototype')