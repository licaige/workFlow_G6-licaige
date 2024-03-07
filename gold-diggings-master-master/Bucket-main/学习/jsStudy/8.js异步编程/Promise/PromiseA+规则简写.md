1.Promise状态

(1)pending
(2)fulFilled
(3)rejected

2.then方法
语法：
promise.then(onFulfilled,onRejected)

（1）接收两个参数，如果不是函数的忽略
（2）如果onFulfilled是函数，接收promise返回的value做参数，
最多被调用一次，必须在promise为fulFilled状态后执行
（3）如果onRejected是函数，接收promise返回的reason做参数，
最多被调用一次，必须在promise为rejected状态后执行
（4）then可以被链式调用
（5）then需要异步执行
（6）then必须返回一个promise
（7）onFulfilled和onRejected必须作为函数被调用

3.promise执行程序

语法：
[[Resolve]](promise,x)

（1）如果promise和x指向同一个对象，执行reject(TypeError)
（2）如果x是一个promise，采用它的状态
（3）如果x是一个对象或函数
（4）如果x不是函数，执行resolve(x)