// 封装before函数
Function.prototype.before = function (beforeFn: Function) {
    var _self = this
    // 返回的函数先执行外层(装饰器)函数
    return function () {
        beforeFn.apply(this, arguments)
        // 再执行内层函数
        return _self.apply(this, arguments)
    }
}

// 定义一个函数A
function a() { }
function b() { } 
// 则会在执行a之前执行b
a = a.before(b)

// 通过babel编译即可形成装饰器函数