/*
  类的所有方法都定义在类的prototype属性上面
  constructor()方法是类的默认方法，通过new命令生成对象实例时，自动调用该方法。
  一个类必须有constructor()方法，如果没有显式定义，一个空的constructor()方法会被默认添加。
  constructor()方法默认返回实例对象（即this），也可以指定返回另一个对象（但此时可能导致 instancof 为false）
  类必须使用 new 调用，否则报错
  生成的所有实例共享一个原型对象（p.__proto__ === Point.prototype）
*/
class Point {
  constructor(x, y) {
    this.x = x
    this.y = y // this关键字代表实例对象
  }
  toString() {
    return '(' + this.x + ', ' + this.y + ')'
  }
}
const p = new Point()
// 实例的构造函数，就是其类原型的构造函数constructor()方法
console.log(p.constructor === Point.prototype.constructor) // true
// 类原型的构造函数constructor，直接指向类本身
console.log(Point === Point.prototype.constructor) // true

/*
  类的内部可以使用 get 和 set 关键字，对属性设置存值函数和取值函数，拦截该属性的存取行为
*/
class MyClass {
  constructor () {
    // ...
  }
  get prop () { // 取值函数
    return 'getter'
  }
  set prop (value) { // 存值函数
    console.log('setter:' + value)
  }
}
let inst = new MyClass()
inst.prop = 123 // setter: 123
console.log(inst.prop) // 'getter'

/*
  类中定义的方法都会被实例继承。如果在一个方法前，加上static关键字，就表示该方法不会被实例继承，
  而是直接通过类来调用，这被称为静态方法。
  如果静态方法中包含this关键字，则this指的是类，而不是实例。
  静态方法可以与非静态方法重名。
*/
class Foo {
  static classMethod () {
    return 'hello'
  }
  static bar () {
    this.baz()
  }
  static baz () {
    console.log('hello')
  }
  baz() {
    console.log('world')
  }
}
Foo.classMethod() // 'hello'

var foo = new Foo()
// foo.classMethod()// TypeError: foo.classMethod is not a function

Foo.bar() // hello

// 父类的静态方法可以被子类继承。静态方法也可以从super对象上调用
class Bar extends Foo {
  static sonClassMethod () {
    return super.classMethod() + ', too'
  }
}
// Bar.classMethod() // 'hello'
Bar.sonClassMethod() // 'hello, too

/*
  class内部只有静态方法，没有静态属性
*/
Foo.prop = 1 // 老写法，定义了一个静态属性prop
console.log(Foo.prop)
// 新写法
class Foo {
  static prop = 1
}