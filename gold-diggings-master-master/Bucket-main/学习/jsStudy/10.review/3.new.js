// new创建对象的过程

// function A() {
//     this.a = 100
// }
// let a = new A();
// console.log(a);

// 1.创建一个空对象{}
// 2.将这个对象的原型（__proto__）设置为构造函数的原型（prototype）
// 3.将这个对象作为上下文的this
// 4.如果函数没有返回对象则返回这个this

// function A() { }
// function myNew(fn, ...rest) {
//     const obj = {};
//     obj.__proto__ = fn.prototype;
//     const res = fn.apply(obj, rest);
//     return res instanceof Object ? res : obj
// }
// let a = myNew(A, '123');
// console.log(a);

// 手写instanceof

function Right() { }
let left = Object.create(Right.prototype);
console.log(left instanceof Right);
console.log(myInstanceof(left, Right));
function myInstanceof(left, Right) {
    left = left.__proto__;
    Right = Right.prototype;
    while (true) {
        if (left === null) {
            return false
        }
        if (left === Right) {
            return true
        }
        left = left.__proto__
    }
}