// 1.Promise有3种状态
// pending、fulFilled、rejected

const pending = 'pending', fulFilled = 'fulFilled', rejected = 'rejected';

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
                    f(that.value);
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
                    f(that.value);
                })
            }
        })
    }
    try {
        execute(resolve, reject);
    } catch (error) {
        reject(error);
    }
}

MyPromise.prototype.then = function (onResolve, onReject) {
    if (typeof onResolve !== 'function') {
        onResolve = value => value
    }
    if (typeof onReject !== 'function') {
        onReject = reason => {
            throw reason
        }
    }
    const that = this;
    let promise;
    if (that.status === fulFilled) {
        promise = new MyPromise((resolve, reject) => {
            setTimeout(_ => {
                try {
                    const x = onResolve(that.value);
                    resolvePromise(promise, x, resolve, reject);
                } catch (error) {
                    reject(error);
                }
            })
        })
    }
    if (that.status === rejected) {
        promise = new MyPromise((resolve, reject) => {
            setTimeout(_ => {
                try {
                    const x = onReject(that.value);
                    resolvePromise(promise, x, resolve, reject);
                } catch (error) {
                    reject(error);
                }
            })
        })
    }
    if (that.status === pending) {
        promise = new MyPromise((resolve, reject) => {
            that.resolveFn.push(_ => {
                try {
                    const x = onResolve(that.value);
                    resolvePromise(promise, x, resolve, reject);
                } catch (error) {
                    reject(error);
                }
            })
            that.rejectFn.push(_ => {
                try {
                    const x = onReject(that.value);
                    resolvePromise(promise, x, resolve, reject);
                } catch (error) {
                    reject(error);
                }
            })
        })
    }
    return promise
}

function resolvePromise(promise, x, resolve, reject) {
    if (x === promise) {
        return reject(new TypeError('x不能等于promise'))
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
            const then = x.then;
            if (typeof then === 'function') {
                then.call(x, y => {
                    if (executed) return;
                    executed = true;
                    resolvePromise(promise, y, resolve, reject)
                }, e => {
                    if (executed) return;
                    executed = true;
                    reject(e);
                })
            } else {
                resolve(x);
            }
        } catch (error) {
            if (executed) return;
            executed = true;
            reject(error);
        }
    } else {
        resolve(x);
    }
}

module.exports = {
    deferred() {
        let resolve, reject;
        const promise = new MyPromise((res, rej) => {
            resolve = res;
            reject = rej;
        });
        return {
            promise,
            resolve,
            reject
        }
    }
}
