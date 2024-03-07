const pending = 'pending';
const fulFilled = 'fulFilled';
const rejected = 'rejected';

function MyPromise(execute) {
    const that = this;
    that.status = pending;
    that.resolveFn = [];
    that.rejectFn = [];
    function resolve(value) {
        setTimeout(_ => {
            if (that.status === pending) {
                that.status = fulFilled;
                that.value = value;
                that.resolveFn.forEach(f => {
                    f(that.value)
                })
            }
        })
    }

    function reject(reason) {
        setTimeout(_ => {
            if (that.status === pending) {
                that.status = rejected;
                that.value = reason;
                that.rejectFn.forEach(f => {
                    f(that.value)
                })
            }
        })
    }

    try {
        execute(resolve, reject);
    } catch (error) {
        reject(error)
    }
}

MyPromise.prototype.then = function (onResolve, onRejected) {
    if (typeof onResolve !== 'function') {
        onResolve = value => value
    }
    if (typeof onRejected !== 'function') {
        onRejected = reason => {
            throw reason
        }
    }
    const that = this;
    let promise;
    if (that.status === fulFilled) {
        promise = new MyPromise((resolve, reject) => {
            setTimeout(_ => {
                try {
                    let x = onResolve(that.value);
                    resolvePromise(promise, x, resolve, reject)
                } catch (error) {
                    reject(error)
                }
            })
        })
    }
    if (that.status === rejected) {
        promise = new MyPromise((resolve, reject) => {
            setTimeout(_ => {
                try {
                    let x = onRejected(that.value);
                    resolvePromise(promise, x, resolve, reject)
                } catch (error) {
                    reject(error)
                }
            })
        })
    }
    if (that.status === pending) {
        promise = new MyPromise((resolve, reject) => {
            that.resolveFn.push(_ => {
                try {
                    let x = onResolve(that.value);
                    resolvePromise(promise, x, resolve, reject)
                } catch (error) {
                    reject(error)
                }
            })

            that.rejectFn.push(_ => {
                try {
                    let x = onRejected(that.value);
                    resolvePromise(promise, x, resolve, reject)
                } catch (error) {
                    reject(error)
                }
            })
        })
    }
    return promise
}
function resolvePromise(promise, x, resolve, reject) {
    if (x === promise) {
        return reject(new TypeError('x不能和promise相等'))
    }
    if (x instanceof MyPromise) {
        if (x.status === fulFilled) {
            resolve(x.value)
        } else if (x.status === rejected) {
            reject(x.value)
        } else {
            x.then(y => {
                resolvePromise(promise, y, resolve, reject)
            }, reject)
        }
    } else if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
        let executed;
        try {
            let then = x.then;
            if (typeof then === 'function') {
                then.call(x, y => {
                    if (executed) {
                        return false
                    }
                    executed = true;
                    resolvePromise(promise, y, resolve, reject)
                }, e => {
                    if (executed) {
                        return false
                    }
                    executed = true;
                    reject(e)
                })
            } else {
                resolve(x)
            }
        } catch (error) {
            if (executed) {
                return false
            }
            executed = true;
            reject(error)
        }
    } else {
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
