const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

function MyPromise(execute) {
    const that = this;
    that.state = PENDING;
    that.onFulfilledFn = [];
    that.onRejectedFn = [];

    function resolve(value) {
        setTimeout(_ => {
            if (that.state === PENDING) {
                that.state = FULFILLED;
                that.value = value;
                that.onFulfilledFn.forEach(f => {
                    f(that.value);
                });
            }
        });
    }

    function reject(reason) {
        setTimeout(_ => {
            if (that.state === PENDING) {
                that.state = REJECTED;
                that.reason = reason;
                that.onRejectedFn.forEach(f => {
                    f(that.reason);
                });
            }
        });
    }
    try {
        execute(resolve, reject);
    } catch (e) {
        reject(e);
    }
}
MyPromise.prototype.then = function(onFulfilled, onRejected) {
    onFulfilled =
        typeof onFulfilled === 'function'
            ? onFulfilled
            : function(x) {
                  return x;
              };
    onRejected =
        typeof onRejected === 'function'
            ? onRejected
            : function(e) {
                  throw e;
              };
    const that = this;
    let promise;
    if (that.state === FULFILLED) {
        promise = new MyPromise((resolve, reject) => {
            setTimeout(_ => {
                try {
                    var x = onFulfilled(that.value);
                    resolvePromise(promise, x, resolve, reject);
                } catch (reason) {
                    reject(reason);
                }
            });
        });
    }
    if (that.state === REJECTED) {
        promise = new MyPromise((resolve, reject) => {
            setTimeout(_ => {
                try {
                    var x = onRejected(that.reason);
                    resolvePromise(promise, x, resolve, reject);
                } catch (reason) {
                    reject(reason);
                }
            });
        });
    }
    if (that.state === PENDING) {
        promise = new MyPromise((resolve, reject) => {
            that.onFulfilledFn.push(_ => {
                try {
                    var x = onFulfilled(that.value);
                    resolvePromise(promise, x, resolve, reject);
                } catch (reason) {
                    reject(reason);
                }
            });
            that.onRejectedFn.push(_ => {
                try {
                    var x = onRejected(that.reason);
                    resolvePromise(promise, x, resolve, reject);
                } catch (reason) {
                    reject(reason);
                }
            });
        });
    }
    return promise;
};

function resolvePromise(promise, x, resolve, reject) {
    if (promise === x) {
        return reject(new TypeError('x 不能与 promise 相等'));
    }
    if (x instanceof MyPromise) {
        if (x.state === FULFILLED) {
            resolve(x.value);
        } else if (x.state === REJECTED) {
            reject(x.reason);
        } else {
            x.then(y => {
                resolvePromise(promise, y, resolve, reject);
            }, reject);
        }
    } else if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
        var executed;
        try {
            var then = x.then;
            if (typeof then === 'function') {
                then.call(
                    x,y => {
                        if (executed) return;
                        executed = true;
                        resolvePromise(promise, y, resolve, reject);
                    },e => {
                        if (executed) return;
                        executed = true;
                        reject(e);
                    }
                );
            } else {
                resolve(x);
            }
        } catch (e) {
            if (executed) return;
            executed = true;
            reject(e);
        }
    } else {
        resolve(x);
    }
}

module.exports = {
    deferred() {
        var resolve;
        var reject;
        var promise = new MyPromise(function(res, rej) {
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