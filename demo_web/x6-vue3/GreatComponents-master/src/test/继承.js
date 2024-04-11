/**
 * 1. 原型链继承
 * 2. 构造函数继承
 * 3. 组合式继承
 * 4. 原型式继承
 * 5. 寄生继承
 * 6. 组合寄生继承
 * 7. es6 class继承
 */

// 设置父类
function Father(name) {
  this.name = name;
  this.colors = ["red", "blue", "green"];
  Father.prototype.sayName = function () {
    console.log(this.name)
  }
}

/**
 * 1. 原型链继承
 * 缺点1：父类的引用属性会被所有子类实例共享;
 * 缺点2：子类构建实例时不能向父类传递参数，因为这个对象是一次性创建的（没办法定制化）。
 * 优点：写法方便简洁，容易理解；父类方法可以复用
 */
function Son1 () {}
Son1.prototype = new Father() // 一次性创建
// 所有涉及到原型链继承的继承方式都要修改子类构造函数的指向，否则子类实例的构造函数会指向SuperType。
Son1.prototype.constructor = Son1;
let a1 = new Son1()
let a2 = new Son1()
a1.name = 'a1'
a2.sayName() // undefined

/**
 * 2. 构造函数继承
 * 缺点1：方法都在构造函数中定义，因此无法实现函数复用。
 * 缺点2：在父类型的原型中定义的方法，对子类型而言也是不可见的，结果所有类型都只能使用构造函数模式。
 * 优点：解决了原型链实现继承的不能传参的问题和父类的原型共享的问题。
 */
function Son2 (name, age) {
  Father.call(this, name)
  this.age = age
}
let b1 = new Son2() // 读不到Father.prototype上的内容



/**
 * 3. 组合式继承 （经典继承）
 * 缺点：无论在什么情况下，都会调用两次超类型构造函数：一次是在创建子类型原型的时候，另一次是在子类型构造函数内部
 * 优点1：父类的方法可以复用；
 * 优点2：父类的引用属性不会共享；
 * 优点3：子类构建实例可以向父类传参。
 */
function Son3 (name, age) {
  parent.call(this, name) // 第二次调用
  this.age = age
}
Son3.prototype = new Father() // 第一次调用
let c1 = new Son3()
let c2 = new Son3()


/**
 * 4. 原型式继承
 * 缺点1：父类的引用属性会被所有子类实例共享
 * 缺点2：子类实例不能向父类传参
 * 优点：不需要单独创建构造函数。
 */

// 方法1 函数A是对传入的对象执行了一次浅复制
function createObject(obj) {
  function Fun() {}
  Fun.prototype = obj
  return new Fun()
}

var person = {
  name: "Nicholas",
  friends: ["Shelby", "Court", "Van"]
};

let d1 = createObject(person)
// 方法2
let d2 = Object.create(person)


/**
 * 5. 寄生继承
 * 缺点：通过寄生式继承给对象添加函数会导致函数难以重用。使用寄生式继承来为对象添加函数, 会由于不能做到函数复用而降低效率;这一点与构造函数模式类似.
 * 优点：写法简单，不需要单独创建构造函数。
 * 说明：寄生式继承的思路与(寄生) `原型式继承` 和 `工厂模式` 似, 即创建一个仅用于封装继承过程的函数,
 * 该函数在内部以某种方式来增强对象,最后再像真的是它做了所有工作一样返回对象。
 */
function objectCopy(obj) {
  function Fun() { };
  Fun.prototype = obj;
  return new Fun();
}
 
function createAnother(obj) {
  let clone = objectCopy(obj);
  clone.showName = function () {
    console.log('my name is：', this.name);
  };
  return clone;
}
let e1 = createAnother(person)


/**
 * 6. 组合寄生继承 （解决组合式继承开销问题）
 * 缺点：代码复杂
 * 优点：高效率只调用一次父构造函数，并且因此避免了在子原型上面创建不必要，多余的属性。与此同时，原型链还能保持不变
 */
function objectCopy2(obj) {
  function Fun() { };
  Fun.prototype = obj;
  return new Fun();
}
 
function inheritPrototype(child, parent) {
  let prototype = objectCopy2(parent.prototype);
  prototype.constructor = child
  child.prototype = prototype
}
function Child(name, age) {
  Father.call(this, name);
  this.age = age;
}
let f1 = inheritPrototype(Child, Father)


/**
 * 7. es6 class继承
 * 缺点：并不是所有的浏览器都支持class关键字 lass Per
 * 优点：语法简单易懂,操作更方便。
 * 说明：原理ES5 的继承，实质是先创造子类的实例对象this，然后再将父类的方法添加到this上面（Parent.apply(this)）。 ES6 的继承机制完全不同，
 * 实质是先将父类实例对象的属性和方法，加到this上面（所以必须先调用super方法），然后再用子类的构造函数修改this
 */

class Parent {
  constructor (name) {
    this.name = name
  }
}
class Children extends Parent {
  constructor (name, age) {
    super(name)
    this.age = age
  }
}