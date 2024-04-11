const PENDING = 'panding'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

function MyPromise(executor) {
  let that = this
  this.state = PENDING
  this.value = undefined
  this.reason = undefined
  this.onFulfilled = [];//成功的回调
  this.onRejected = []; //失败的回调
  function resolve (value) {
    if (that.state === PENDING) {
      that.state = FULFILLED
      that.value = value
      that.onFulfilled.forEach(fn => fn(value))
    }
  }
  function reject (reason) {
    if (that.state === PENDING) {
      that.state = REJECTED
      that.reason = reason
      that.onRejected.forEach(fn => fn(reason))
    }
  }
  try {
    executor(resolve, reject);
  } catch (e) {
    reject(e);
  }
}

MyPromise.prototype.then = function (onFulfilled, onRejected) {
  let that = this
  onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value
  onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason }

  let promise2 = new MyPromise((resolve, reject) => {
    function onFulfilledDo () {
      setTimeout(()=>{
        try {
          resolvePromise(promise2, onFulfilled(that.value), resolve, reject)
        } catch (error) {
          reject(error)
        }
      })
    }
    function onRejectedDo () {
      setTimeout(()=>{
        try {
          resolvePromise(promise2, onRejected(that.reason), resolve, reject)
        } catch (error) {
          reject(error)
        }
      })
    }
    if (that.state === FULFILLED) {
      onFulfilledDo()
    } else if (that.state === REJECTED) {
      onRejectedDo()
    } else if(that.state === PENDING){
      that.onFulfilled.push(onFulfilledDo)
      that.onRejected.push(onRejectedDo)
    }
  })
  return promise2
};

//promise2：新的Promise对象
//x：上一个then的返回值
//resolve：promise2的resolve
//reject：promise2的reject
function resolvePromise(promise2, x, resolve, reject){
  if(promise2 === x){
    reject(new TypeError('Chaining cycle'))
  }
  if(x && typeof x === 'object' || typeof x === 'function'){
    let used;
    try {
      let then = x.then
      if(typeof then === 'function'){
        then.call(x, (y)=>{
          if (used) return;
          used = true
          resolvePromise(promise2, y, resolve, reject)
        }, (r) =>{
          if (used) return;
          used = true
          reject(r)
        })
      } else {
        if (used) return;
        used = true
        resolve(x)
      }
    } catch(e){
      if (used) return;
      used = true
      reject(e)
    }
  } else {
    resolve(x)
  }
}

MyPromise.defer = MyPromise.deferred = function () {
  let dfd = {};
  dfd.promise = new MyPromise((resolve, reject) => {
      dfd.resolve = resolve;
      dfd.reject = reject;
  });
  return dfd;
}

module.exports = MyPromise