@MyDecorator
@fn(20)
@fn2
class MyTest {
    @fn4 message = 'Hello';
}

function MyDecorator(target) {
    target.load = true;
}

function fn(value) {
    return function (target) {
        target.count = value;
    }
}

function fn2(target) {
    target.prototype.load = 'load';
}

function fn4(target, name, description) {
    console.log(target); // 目标类的.prototype
    console.log(name); // 被修饰的类成员的名称
    console.log(description); // 被修饰的类成员的描述对象
}

console.log(MyTest.load);
console.log(MyTest.count);
console.log(new MyTest().load);
