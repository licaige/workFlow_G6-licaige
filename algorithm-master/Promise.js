/*
  then 方法：（返回值是promise，如果没有返回值则相当于返回undefined）
  then 方法接收两个函数作为参数：
  ①第一个参数是 Promise 执行成功时的回调
  ②第二个参数是 Promise 执行失败时的回调，两个函数只会有一个被调用。
    • 如果执行了resolve函数，则会回调promise对象的.then函数
    • 如果执行了reject函数，且then函数没有传入第二个参数，则会回调promise对象的.catch函数
    • 如果then函数传入了第二个参数（即reject时的回调），则promise对象的.catch函数将无法捕获reject
  catch方法的返回值也是promise
  无论promise状态是fulfilled还是rejected都会执行一次finally方法
*/
function request (url) {
  return new Promise((resolve, reject) => {
    if (url === 'https') {
      resolve('https')
    } else {
      reject('reject not https')
    }
  })
}
// resolve
request('https').then(res => {
  console.log('https-res:', res) // 捕获resolve
}).catch(err => {
  console.log('https-err:', err)
}).finally(() => {
  console.log('finally')
})
// reject 方式一
request('http').then(res => {
  console.log('http1-res:', res)
}, err => { console.log('http1-err1', err) } // 捕获reject
).catch(err => {
  console.log('http1-err2:', err) // 不执行
})
// reject 方式二
request('http').then(res => {
  console.log('http2-res:', res)
}).catch(err => { // then函数没有传入第二个参数时，捕获reject
  console.log('http2-err:', err)
})

// async & await
function onPromise () {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(true)
    }, 1500)
  })
}
async function onCheck () {
  console.log('await:', await onPromise())
}
onCheck() // await: true

/*
  Promise.all 方法用于将多个 Promise 实例，包装成一个新的 Promise 实例。
  p 的状态由 p1、p2、p3 决定，分成两种情况。
	• （1）只有p1、p2、p3的状态都变成fulfilled，p的状态才会变成fulfilled，此时p1、p2、p3的返回值组成一个数组，传递给p的回调函数。
  • （2）只要p1、p2、p3之中有一个被rejected，p的状态就变成rejected，此时第一个被reject的实例的返回值，会传递给p的回调函数。
*/
const promise1 = Promise.resolve(3) // 等价于 new Promise((resolve, reject) => resolve(3))
const promise2 = 42
const promise3 = new Promise((resolve, reject) => {
    setTimeout(resolve('333'), 300, 'foo')
  })
const promise4 = Promise.reject(new Error('fail'))
Promise.resolve(promise4).then(res => {
  console.log('rej-res:', res)
}).catch(err => {
  console.log('rej-err:', err) // 捕获
})
var pAll = Promise.all([promise1, promise2, promise3]).then(res => {
    console.log('all-res:', res)
  }).catch(err => {
    console.log('all-err:', err) // 有reject就输出第一个reject的结果 Error: fail
  })

// 手写实现Promise.all()函数
var PromiseAll = function (promises) {
  return new Promise((resolve, reject) => {
    // 判断是否具有 iterator 接口：return typeof promises[Symbol.iterator] === 'function'
    if (typeof promises[Symbol.iterator] !== 'function') {
      reject(`TypeError: ${promises} is not iterable`)
    }
    const len = promises.length
    if (len === 0) {
      resolve([])
    }
    var result = []
    for (let p of promises) {
      Promise.resolve(p).then(res => {
        result.push(res)
        if (result.length === len) {
          resolve(result)
        }
      }).catch(err => {
        reject(err)
      })
    }
  })
}
const p1 = Promise.resolve(3) // 等价于 new Promise((resolve, reject) => resolve(3))
const p2 = true
const p3 = 'hello'
const p4 = Promise.reject('rej')
pAll = PromiseAll([p1, p2, p3]).then(res => {
  console.log('pAll-res:', res) // [3, true, 'hello']
}).catch(err => {
  console.log('pAll-err:', err) // 有reject就输出第一个reject的结果 Error: fail
})

/*
  Promise.race 方法同样是将多个 Promise 实例，包装成一个新的 Promise 实例。
  只要p1、p2、p3之中有一个实例率先改变状态，p的状态就跟着改变。
  那个率先改变的Promise实例的返回值，就传递给p的返回值。
  输出第一个获取到的结果，无论是resolve还是reject
*/
var pRace = Promise.race([promise1, promise2, promise3]).then(res => {
  console.log('race-res:', res)
}).catch(err => {
  console.log('race-err:', err)
})

// 手写实现Promise.race()函数
var PromiseRace = function (promises) {
  return new Promise((resolve, reject) => {
    // 判断是否具有 iterator 接口：return typeof promises[Symbol.iterator] === 'function'
    if (typeof promises[Symbol.iterator] !== 'function') {
      reject(`TypeError: ${promises} is not iterable`)
    }
    if (promises.length === 0) {
      resolve([])
    }
    for (let p of promises) {
      Promise.resolve(p).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    }
  })
}
const p5 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(3)
  }, 300)
})
const p6 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(5)
  }, 500)
})
const p7 = 'hello'
var pRace = PromiseRace([p6, p7]).then(res => {
  console.log('pRace-res:', res)
}).catch(err => {
  console.log('pRace-err:', err)
})
// var pRace = PromiseRace([]).then(res => {
//   console.log('pRace-res:', res)
// }).catch(err => {
//   console.log('pRace-err:', err)
// })

/*
  ES11新增语法Promise.allSettled()，无论状态是fulfilled或rejected都会把参数返回

*/
// const p1 = request('http')
// const p2 = request('https')
// const p3 = request('hello')
// Promise.allSettled([p1, p2, p3]).then(res => {
//   console.log('allSettled-res:', res)
//   // allSettled-res: [
//   //   { status: 'rejected', reason: 'reject not https' },
//   //   { status: 'fulfilled', value: 'https' },
//   //   { status: 'rejected', reason: 'reject not https' }
//   // ]
// })
