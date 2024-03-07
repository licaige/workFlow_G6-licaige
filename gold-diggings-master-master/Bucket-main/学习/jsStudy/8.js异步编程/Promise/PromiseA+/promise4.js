const pending = 'pending';
const fulFilled = 'fulFilled';
const rejected = 'rejected';

// Promise/A+规范

// 1. Promise状态

// （1） 当Promise为pending状态时，可以被转换成另外两种状态
// （2） 当Promise为fulFilled状态时，不能被更改，且必须有一个不能被更改的value值
// （3） 当Promise为rejected状态时，不能被更改，且必须有一个不能被更改的reason值

function MyPromise(execute){
    const that = this;
    that.status = pending;
    that.resolveFn = [];
    that.rejectFn = [];
    function resolve(value){
        setTimeout(_ => {
            if(that.status === pending){
                that.status = fulFilled;
                that.value = value;
                that.resolveFn.forEach(f => {
                    f(that.value)
                })
            }
        })
    }

    function reject(reason){
        setTimeout(_ => {
            if(that.status === pending){
                that.status = rejected;
                that.value = reason;
                that.rejectFn.forEach(f => {
                    f(that.value)
                })
            }
        })
    }

    // 如果执行中有错误，会立马执行reject
    // 也就是说Promise中的错误是被reject吞掉的
    // try...catch是捕获不到的
    try {
        execute(resolve,reject);   
    } catch (error) {
        reject(error)
    }
}

// 2.then方法

// 首先，then方法是挂在Promise原型上的一个方法

// （1）then方法接收两个回调函数,如果不是函数忽略
// （2）then方法返回一个Promise
// （3）then方法需要异步执行
// （4）then可以被链式调用
// （5）如果onResolve是函数，必须在Promise状态为fulFilled后调用
// （6）如果onRejected是函数，必须在Promise状态为rejected后调用
// （7）then没有自己的this（也可以理解为then方法是挂在Promise原型上的）
MyPromise.prototype.then = function(onResolve,onRejected){
    if(typeof onResolve !== 'function'){
        onResolve = value => value
    }
    if(typeof onRejected !== 'function'){
        onRejected = reason => {
            throw reason
        }
    }
    const that = this;
    let promise;
    if(that.status === fulFilled){
        promise = new MyPromise((resolve,reject) => {
            setTimeout(_ => {
                try {
                    let x = onResolve(that.value);
                    resolvePromise(promise,x,resolve,reject)
                } catch (error) {
                    reject(error)
                }
            })
        })
    }

    if(that.status === rejected){
        promise = new MyPromise((resolve,reject) => {
            setTimeout(_ => {
                try {
                    let x = onRejected(that.value);
                    resolvePromise(promise,x,resolve,reject)
                } catch (error) {
                    reject(error)
                }   
            })
        })
    }

    if(that.status === pending){
        promise = new MyPromise((resolve,reject) => {
            that.resolveFn.push(_ => {
                try {
                    let x = onResolve(that.value);
                    resolvePromise(promise,x,resolve,reject)
                } catch (error) {
                    reject(error)
                }
            })

            that.rejectFn.push(_ => {
                try {
                    let x = onRejected(that.value);
                    resolvePromise(promise,x,resolve,reject)
                } catch (error) {
                    reject(error)
                }   
            })
        })
    }
    return promise;
}

// 3.Promise执行程序

// 1.promise和x指向同一个对象，执行reject()
// 2.x是promise，采用它的状态
function resolvePromise(promise,x,resolve,reject){
    if(promise === x){
        return reject(new TypeError('promise不能和x相等'))
    }
    if(x instanceof MyPromise){
        if(x.status === fulFilled){
            resolve(x.value)
        }else if(x.status === rejected){
            reject(x.value)
        }else{
            x.then(y => {
                resolvePromise(promise,y,resolve,reject)
            },reject)
        }
    }else if(x !== null && (typeof x === 'object' || typeof x === 'function')){
        let executed;
        try {
            let then = x.then;
            if(typeof then === 'function'){
                then.call(x,y => {
                    if(executed){
                        return false
                    }
                    executed = true;
                    resolvePromise(promise,y,resolve,reject)
                },e => {
                    if(executed){
                        return false
                    }
                    executed = true;
                    reject(e);
                })
            }else{
                resolve(x)
            }
        } catch (error) {
            if(executed){
                return false
            }
            executed = true;
            reject(error);
        }
    }else{
        resolve(x)
    }
}

module.exports = {
    deferred() {
        var resolve;
        var reject;
        var promise = new MyPromise(function (res, rej) {
            resolve = res;
            reject = rej;
        });
        return {
            promise,
            resolve,
            reject,
        }
    }
}
