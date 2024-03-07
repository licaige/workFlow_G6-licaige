class MyPromise {
    static PENDING = 'pending';
    static FULFILLED = 'fulFilled';
    static REJECTED = 'rejected';
    constructor(executor) {
        this.status = MyPromise.PENDING;
        this.value = null;
        this.callback = [];
        try {
            // 这个地方this.resolve只是拿到resolve方法，并不是this调用的
            // 事实上是全局对象调用的，但是class里面默认是严格模式
            // 如果不改变resolve的内部this指向，他的this是undefined
            executor(this.resolve.bind(this), this.reject.bind(this));
        } catch (error) {
            this.reject(error)
        }
    }
    resolve(value) {
        if (this.status === MyPromise.PENDING) {
            this.status = MyPromise.FULFILLED;
            this.value = value;
            setTimeout(_ => {
                this.callback.forEach(callFn => {
                    callFn.onFulfilled(value)
                });
            })
        }
    }
    reject(value) {
        if (this.status === MyPromise.PENDING) {
            this.status = MyPromise.REJECTED;
            this.value = value;
            setTimeout(_ => {
                this.callback.forEach(callFn => {
                    callFn.onRejected(value)
                });
            })
        }
    }
    then(onFulfilled, onRejected) {
        if (typeof onFulfilled !== 'function') {
            onFulfilled = value => value;
        }
        if (typeof onRejected !== 'function') {
            onRejected = value => value;
        }
        let promise = new MyPromise((resolve, reject) => {
            if (this.status === MyPromise.PENDING) {
                this.callback.push({
                    onFulfilled: value => {
                        this.parse(promise, onFulfilled(this.value), resolve, reject)
                    },
                    onRejected: value => {
                        this.parse(promise, onRejected(this.value), resolve, reject)
                    }
                })
            }
            if (this.status === MyPromise.FULFILLED) {
                setTimeout(() => {
                    this.parse(promise, onFulfilled(this.value), resolve, reject)
                })
            }
            if (this.status === MyPromise.REJECTED) {
                setTimeout(() => {
                    this.parse(promise, onRejected(this.value), resolve, reject)
                })
            }
        });
        return promise;
    }
    parse(promise, res, resolve, reject) {
        if (promise == res) {
            throw new TypeError('then返回的promise不能是跟then相同的Promise');
        }
        if(res = null){
            return resolve(res)
        }
        try {
            if (res instanceof MyPromise) {
                res.then(resolve, reject)
            } else {
                resolve(res)
            }
        } catch (error) {
            reject(error)
        }
    }
    static resolve(value) {
        return new MyPromise((resolve, reject) => {
            if (value instanceof MyPromise) {
                value.then(resolve, reject);
            } else {
                resolve(value);
            }
        })
    }
    static reject(reason) {
        return new MyPromise((_, reject) => {
            reject(reason);
        })
    }
    static all(promises) {
        let resolves = [];
        return new MyPromise((resolve, reject) => {
            promises.forEach((promise, index) => {
                promise.then(value => {
                    resolves.push(value)
                    if (resolves.length === promises.length) {
                        resolve(resolves);
                    }
                }, reason => {
                    reject(reason);
                })
            })
        })
    }
    static race(promises) {
        return new MyPromise((resolve, reject) => {
            promises.forEach(promise => {
                promise.then(value => {
                    resolve(value)
                })
            })
        })
    }
}

MyPromise.deferred  = function() {
    const defer = {}
    defer.promise = new MyPromise((resolve, reject) => {
      defer.resolve = resolve
      defer.reject = reject
    })
    return defer
  }
  try {
    module.exports = MyPromise
  } catch (e) {
  }
// module.exports = {
//     defered(){
//         var resolve;
//         var reject;
//         var promise = new MyPromise(function(res,rej){
//             resolve = res;
//             reject = rej;
//         })
//         return {
//             promise,
//             resolve,
//             reject
//         }
//     }
// }