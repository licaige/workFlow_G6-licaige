/*
  call()方法：第一个参数是要绑定给this的值，后面传入的是一个参数列表。
  当第一个参数为null、undefined的时候，默认指向window。
  apply()方法：第一个参数是要绑定给this的值，第二个参数是一个参数数组。
  当第一个参数为null、undefined的时候，默认指向window。
*/
function add (c, d) {
	return this.a + this.b + c + d
}
var o = { a: 1, b: 3 }
console.log('call:', add.call(o, 5, 7)) // 1 + 3 + 5 + 7 = 16
console.log('apply:', add.apply(o, [10, 20])) // 1 + 3 + 10 + 20 = 34

var Person1  = function () {
  this.name = 'Curry'
}
var Person2 = function () {
  this.getname = function () {
    console.log(this.name)
  }
  Person1.call(this) // 使用Person1对象代替this对象
}
var person = new Person2()
person.getname() // Curry

/*
  bind()方法：返回一个this绑定（指向）传入对象的新函数，而原函数并不会改变
  和call很相似，第一个参数是this的指向，从第二个参数开始是接收的参数列表。
  区别在于：bind()方法返回值是函数以及bind接收的参数列表的使用。

  说明：bind 方法不会立即执行，而是返回一个改变了上下文 this 后的函数。
  而原函数 getName 中的 this 并没有被改变，依旧指向全局对象 window。
*/
var player = {
  name: 'curry'
}
function getName () {
  // console.log('name:', this.name)
  return this.name
}
var curryName = getName.bind(player)
console.log(curryName) // function getName () {...}
console.log('getName:', getName()) // undefined
console.log('curryName:', curryName()) // curry
// 参数的使用
function foo (a, b, c) {
  console.log(a, b, c)
}
var foo1 = foo.bind(null, 'Curry')
foo('A', 'B', 'C') // A B C
foo1('A', 'B', 'C') // Curry A B，foo1()方法的实参是在bind中参数的基础上再进行添加
foo1('B', 'C') // Curry B C
// call() 是把第二个及以后的参数作为 foo 方法的实参传进去，
// 而 foo1 方法的实参实则是在 bind 中参数的基础上再往后排。
foo.call(null, 'Curry') // Curry undefined undefined