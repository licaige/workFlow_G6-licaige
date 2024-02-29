/*
  super这里表示父类的构造函数（constructor()），用来创建一个父类的实例对象。
  ES6规定，子类必须在constructor()方法中调用super()，否则报错
  因为子类自己的this对象，必须先通过父类的构造函数完成塑造，得到与父类同样的实例属性和方法。
  也就意味着新建子类实例时，父类的构造函数必定会先运行一次。
  子类只有调用super()之后，才可以使用this关键字，否则报错。
*/
class Point { /* ... */ }

class ColorPoint extends Point {
  constructor(x, y, color) {
    super(x, y); // 调用父类的constructor(x, y)
    this.color = color;
  }
  toString() {
    return this.color + ' ' + super.toString(); // 调用父类的toString()
  }
}

/*
  父类所有的属性和方法，都会被子类继承，除了私有的属性和方法。
  父类的静态属性和静态方法，也会被子类继承。
  静态属性是通过浅拷贝实现继承的
*/
class A { static foo = 100 }
class B extends A {
  constructor () {
    super()
    B.foo--
  }
}

const b = new B()
B.foo // 99
A.foo // 100

// 使用Object.getPrototypeOf()用来从子类上获取父类
class Point { /*...*/ }
class ColorPoint extends Point { /*...*/ }
console.log(Object.getPrototypeOf(ColorPoint) === Point) // true

/*
  super关键字
  super作为函数调用时，代表父类的构造函数
  super作为对象时，在普通方法中，执行父类的原型对象；在静态方法中指向父类
  由于super指向父类的原型对象，所以定义在父类实例上的方法或属性，是无法通过super调用的
  父类constructor中this.p = 2即是定义在父类实例上的属性，其他属性这是相当于直接定义在父类的prototype上
*/
class A {
  p () {
    return 2
  }
}
class B extends A {
  constructor () {
    super()
    console.log(super.p()) // 2 在普通方法中，即 super.p() 相当于 A.prototype.p()
  }
}
let b1 = new B()
