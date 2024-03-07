const PENDING = 'PENDING';
const FULFILLED = 'FULFILLED';
const REJECTED = 'REJECTED';
// 在编写代码的时候 如果typeof xxx.then === 'function' 就姑且认为他是promise了
// promiseA+规范帮我们解决了 多个promise库可以兼容的问题
// 别人的库 可能既调用了成功 又调用了失败 2个都会执行
const resolvePromise = (x, promise2, resolve, reject) => {
  // 处理x 导致的promise2 是成功还是失败
  // 如果x是普通值 直接调用promise2 的resolve
  // 如果x是一个promise 那么就采用x的状态。 并且将结果继续调用promise2的resolve和reject向下传递
  if (promise2 === x) {
    return reject(new TypeError('不能自己等待自己完成，出错了'))
  }
  // 找到x 是不是一个proimse
  if ((typeof x === 'object' && x !== null) || typeof x === 'function') { // 别人家的promise可以是函数
    // 才有可能是一个promise
    let called;
    try {
      let then = x.then; // 因为用户返回的可能有一个then属性，一取值就报错了
      if (typeof then === 'function') { // 无法在细化了 有then说明就是promise了
        // 这里就是promise,获取promise成功的值或者失败的值
        then.call(x, (y) => {
          if (called) return;
          called = true
          resolvePromise(y, promise2, resolve, reject); // 不停的解析直到是一个普通的值为止
        }, (r) => {
          if (called) return;
          called = true
          reject(r);
        }) // x.then()  x.then如果then方法是通过defineProperty来定义的会再次调用get方法
      } else { // {a:1}
        resolve(x); // 直接用x作为成功的结果
      }
    } catch (e) {
      if (called) return;
      called = true
      reject(e);
    }
  } else { // 一定是一个普通的值，那么就直接让这个promise变成成功态
    resolve(x);
  }
}
class Promise {
  constructor(executor) {
    this.value = undefined;
    this.reason = undefined;
    this.status = PENDING;
    this.onResolvedCallbacks = [];
    this.onRejectedCallbacks = []; // 用来存储then中的回调
    const resolve = (value) => {
      // 这里不能用 value.then方式 因为规范里没有写，测试会通不过
      if (value instanceof Promise) {
        return value.then(resolve, reject); // 递归解析
      }
      if (this.status == PENDING) {
        this.value = value;
        this.status = FULFILLED;
        this.onResolvedCallbacks.forEach(fn => fn())
      }
    }
    const reject = (reason) => {
      if (this.status === PENDING) {
        this.reason = reason
        this.status = REJECTED
        this.onRejectedCallbacks.forEach(fn => fn())
      }
    }
    try {
      executor(resolve, reject);
    } catch (e) { // 如果执行时发生了异常就将异常作为失败的原因
      reject(e)
    }
  }
  then(onFulfilled, onRejected) { // Promise.prototype.then
    // 可选参数的含义就是用户不给 就用默认的
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : v => v
    onRejected = typeof onRejected === 'function' ? onRejected : err => { throw err }
    let promise2 = new Promise((resolve, reject) => {
      // 链式调用的核心 就是处理 x 和 promise2之间的关系
      if (this.status === FULFILLED) {
        setTimeout(() => {
          try {
            let x = onFulfilled(this.value);
            resolvePromise(x, promise2, resolve, reject);
          } catch (e) {
            reject(e);
          }
        }, 0);
      }
      if (this.status === REJECTED) {
        setTimeout(() => {
          try {
            let x = onRejected(this.reason);
            resolvePromise(x, promise2, resolve, reject)
          } catch (e) {
            reject(e);
          }
        }, 0);
      }
      if (this.status === PENDING) {
        // 这时候用户没有调用 成功或者失败 没有resolve和reject
        this.onResolvedCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onFulfilled(this.value);
              resolvePromise(x, promise2, resolve, reject)
            } catch (e) {
              reject(e);
            }
          }, 0);
        });
        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onRejected(this.reason);
              resolvePromise(x, promise2, resolve, reject)
            } catch (e) {
              reject(e);
            }
          }, 0);
        })
      }
    })

    return promise2;
  }
  catch(onRejected) {
    return this.then(null, onRejected)
  }
  static resolve(value) { // 我们希望有等待效果 就用Promise.resolve方法
    return new Promise((resolve, reject) => {
      resolve(value);
    })
  }
  static reject(reason) {// Promise.reject不具备等待效果
    return new Promise((resolve, reject) => {
      reject(reason);
    })
  }
}
new Promise((resolve, reject) => {
  reject(100)
}).then().then().then(null, function (data) {
  console.log(data)
})
new Promise((resolve, reject) => {
  resolve(102)
}).then((data) => {
  console.log(data)
})
