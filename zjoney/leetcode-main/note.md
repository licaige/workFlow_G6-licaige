## 介绍

# 1. 实现一个深克隆 deepClone

需要实现一个深克隆函数，普通版本只要考虑对象中的String和Number，进阶版本会让你考虑Date，循环引用，和正则表达等类型

```js
const deepClone = function(obj, map = new Map()) {
  if (!obj) return obj
  if (map.has(obj)) { // 判断是否循环引用
    return map.get(obj) 
  }

  let newObj
  if (Object.prototype.toString.call(obj) == "[object Object]") {
    newObj = {}
    map.set(obj, newObj);
    for (let key in obj) {
      let val = obj[key]
      newObj[key] = deepClone(val, map)
    }
  } else if (Object.prototype.toString.call(obj) == "[object Array]") {
    newObj = []
    map.set(obj, newObj);
    for (let key in obj) {
      let val = obj[key]
      newObj[key] = deepClone(val, map)
    }
  } else if (Object.prototype.toString.call(obj) == "[object Function]") {
    if(obj.prototype) { // 有 prototype 就是普通函数
      newObj = function(){ return obj.apply(this, arguments) }
    } else {
      newObj = (...args) => { return obj.call(undefined, ...args) }
    }
  } else if (obj.constructor === Object.prototype.toString.call(obj) == "[object Date]") {
    newObj = new Date(obj)
  } else {
    newObj = obj
  }

  return newObj
}
// console.log(deepClone(1)) // 1
// console.log(deepClone(null)) // null
// console.log(deepClone(undefined)) // undefined
// console.log(deepClone([1, 2, 3]))
// console.log(deepClone({ a: new Date(), b: null, c: 123, d: [1,2,3] }))
const a = {
  b: {
    c: null,
  },
};
a.b.c = a;
// console.log(deepClone(a))
const f = function(){
  return 1+2
}
a.f= f
a.d=()=>{
  return 11+22
}
console.log(deepClone(a))
console.log(a)
```

# 2. 实现一个防抖函数 debounce

实现一个防抖函数，触发事件后n秒后才能执行函数，如果在n秒内触发了事件，则会重新计算执行时间。防抖的重点在于清零。在一系列相同的操作后只执行一次。使用场景有：

1.  发送短信,按钮点击太快
2.  调整浏览器窗口大小事，避免resize次数过多
3.  文本编辑器实时保存，任何更改操作之后，最后才会保存
4.  搜索框输入，只在用户最后一次输入完，才执行搜索请求

```js
const debounce = function(fn, timeout = 300) {
  let timer = null

  return function(...args) {
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, timeout)
  }
}
function saveInput(id){
  console.log('Saving data', id);
}
const testDebounce = debounce((id) => saveInput(id),250);
testDebounce(12)

```

# 3. 实现一个节流函数 throttle

实现一个节流函数，连续触发事件但是在n秒中只执行一次函数。即不管你在指定时间内触发多少次函数，但是它只执行一次事件。节流在于加锁，和服务器的rate limiter相似。使用场景有：

1.  scroll滚动事件每隔一秒计算一次位置
2.  浏览器播放事件，每隔一秒计算一次进度信息
3.  input搜索展示下拉列表，每隔1秒发送一次请求

```js
const throttle=(fn,wait)=>{
  let pre = 0;
  return function(...args){
      let now = Date.now();
      if( now - pre >= wait){
          fn.apply(this,args);
          pre = now;
      }
  }
}
const handle=(id)=>{ 
  console.log(id, Math.random()); 
}
const testThrottle = throttle((id)=>handle(id), 20);
testThrottle(15)
```

# 4. 手写 promise all

手写一个类似 Promise.all 的方法，全部异步任务完成后，一起返回。

```js
Promise.myall = function (promise) {
  return new Promise((resolve, reject) => {
    if (typeof promise[Symbol.iterator] !== 'function') {
      reject('TypeError: promise is not iterable')
    }
    if (promise.length === 0) {
      resolve([])
    } else {
      const res = [];
      const len = promise.length;
      let count = 0;
      for (let i = 0; i < len; i++) {
        Promise.resolve(promise[i]).then(data => {
          res[i] = data;
          count += 1;
          if (count === len) resolve(res);
        }).catch(err => {
          reject(err);
        })
      }
    }
  })
}

// test
function p1() {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, 1000, 1);
  })
}
function p2() {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, 1000, 2);
  })
}
Promise.myall([p1(), p2()]).then(res => {
  console.log(res); // [1, 2]
})
```

# 5. 手写 promise race

手写一个类似 Promise.race 的方法，返回第一个异步结果

```js
Promise.myRace = function (promise) {
  return new Promise((resolve, reject) => {
    if (typeof promise[Symbol.iterator] !== 'function') {
      reject('TypeError: promise is not iterable!')
    }
    for (const item of promise) {
      Promise.resolve(item).then(resolve, reject);
    }
  })
}


// test
function p1() {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, 1000, 1);
  })
}
function p2() {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, 1000, 2);
  })
}
Promise.myRace([p1(), p2()]).then(res => {
  console.log(res); // 1
})
```
# 5.实现Promise any
```js
/**
 * 任意一个 promise 变成了兑现状态，那么由该方法所返回的 promise 就会变成兑现状态
 * 并且它的兑现值就是首先兑现的 promise 的兑现值
 * 实验阶段【TC39 第四阶段草案（Stage 4）】
 * @param {*} promise 
 * @returns 
 */
Promise.myany = function (promise) {
  return new Promise((resolve, reject) => {
    if (typeof promise[Symbol.iterator] !== 'function') {
      reject('TypeError: promise is not iterable!')
    }
    const len = promise.length;
    let count = 0;
    for(let i = 0; i<len; i++){
      Promise.resolve(promise[i]).then(resolve, (err)=>{
        count +=1;
        if(count === len){
          reject(new Error('所有promise失败'))
        }
      })
    }
  })
}

/**
 * 
 * @returns 
 */
// test
function p1() {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, 1000, 1);
  })
}
function p2() {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, 1000, 2);
  })
}
Promise.myany([p1(), p2()]).then(res => {
  console.log(res); // 2
})
```

# 6. 实现最大并发数

手写一个Promise并发的控制器。假设需要执行items个异步任务，这个控制器可以并发执行limit个，不能同时执行超过limit个任务，执行完一个任务再继续执行下一个，直到全部执行完毕。

```js
/**
 * 异步任务并发量
 * @param {*} limit 限制并发数
 * @param {*} items 异步函数队列
 */
const asyncPool = async ({ limit, items }) => {
  const promises = []
  const pool = new Set()
  for (let item of items) {
    const fn = async item => await item()
    const promise = fn(item) // 返回的是promise对象
    promises.push(promise)
    pool.add(promise)
    const clean = () => pool.delete(promise)
    promise.then(clean, clean)// 失败自从重发
    if (pool.size >= limit) {
      await Promise.race(pool)
    }
  }
  return Promise.all(promises)
}
export const sleep = (n, name = 'test') => {
  return new Promise((resolve) => {
    console.log(n, name, 'start')
    setTimeout(() => {
      resolve({ n, name })
    }, n * 1000)
  })
}
export const start = async () => {
  await asyncPool({
    limit: 2,
    items: [
      () => sleep(1, '吃饭'),
      () => sleep(3, '睡觉'),
      () => sleep(5, '打游戏'),
      () => sleep(3.5, '学习算法'),
      () => sleep(4, '学习Vue  React'),
    ]
  })
  console.log('结束啦')
}
```

# 7. 手写 my reduce

手写一个类似 Array.reduce 的方法

```js
Array.prototype.myReduce = function(fn, initialValue) {
  let nums = this
  let res = 0
  if (initialValue) res = initialValue

  for (let i = 0; i < nums.length; i++) {
    res = fn(res, nums[i])
  }

  return res
}
let arr = [1,2,3,4,3,1]
let myReduceRes = arr.myReduce((a, b) => {
  return a + b
})
let reduceRes = arr.reduce((a, b) => {
  return a + b
})
console.log('myReduce', myReduceRes)
console.log('reduce', reduceRes)
```

# 8. 手写 my AJAX 

手写一个AJAX，其实就是如何使用 XMLHttpRequest

```js
function ajax(method, url, body = {}) {
  return new Promise((resolve, reject) => {
    // 0. create XMLHttpRequest instance
    let xhr = new XMLHttpRequest()
    // 1. define request
    xhr.open(method, url, true)
    // xhr.setRequestHeader("Content-Type", "application/json");
    // 2. define response
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        let res = xhr.response
        resolve(res)
      } else {
        reject()
      }
    }
    // 3. define error
    xhr.onerror = () => {
      reject()
    }
    // 4. send request
    xhr.send() // get
    // xhr.send(body) // post
  })
}
ajax('GET', 'https://ipv4.icanhazip.com/')
.then((res) => {
  console.log(res)
})
```

# 9. 手写 my instanceof

手写一个 instanceof 函数，涉及到原型链的知识。

```js
const myInstanceof = function(original, target) {
  let proto = original.__proto__
  while (proto) {
    if (proto === target.prototype) {
      return true
    }
    proto = proto.__proto__
  }

  return false
}
const myInstanceofTest = [1,2,3]
console.log(myInstanceof(myInstanceofTest, Array));  // true
console.log(myInstanceof(myInstanceofTest, Object));  // true
console.log(myInstanceof(myInstanceofTest, Function));  // false
```

# 10. 手写 my typeof

手写一个 typeof 的函数。typeof 本身对 Array 和 Object 都分不清，所以尽量使用 Object.prototype.toString.apply，在其它面试问题的时候，也尽量使用这个。

```js
const myTypeof = function(target) {
  let type = Object.prototype.toString.apply(target) // 万能查询类型方法
  type = type.split(' ')[1]
  return type.slice(0, -1).toLowerCase()
}
console.log(myTypeof({}))
console.log(myTypeof([]))
console.log(myTypeof(Function))
console.log(myTypeof(123))
console.log(myTypeof(null))
console.log(myTypeof(''))
console.log(myTypeof(new Date()))
```

# 11. 手写 my new

手写一个 new 函数，涉及到JS class和继承的知识

```js
const myNew = function(fn, ...args) {
  let context = Object.create(fn.prototype)
  let res = fn.apply(context, args)
  // 如果 res 是 undefined 或者，没有返回的东西，则返回 context
  if (res instanceof Object) {
    return res
  } else {
    return context
  }
}
function Person(name, age) {
  this.name = name;
  this.age = age;
}
const person = myNew(Person, 'fl', 32)
console.log(person)
```

# 12. 手写 my call

手写一个 call 函数

```js
Function.prototype.myCall = function(context, ...args) {
  let obj = context || window
  obj.fn = this
  let res = obj.fn(...args)
  delete obj.fn
  return res
}

```

# 13. 手写 my apply

手写一个 apply 函数，和 call 几乎一样，只是参数不一样。

```js
Function.prototype.myApply = function(context, arr) {
  // 定义 this，上下文
  let obj = context || window
  // 函数放进上下文的fn中
  obj.fn = this
  // 执行 fn，这样做fn就可以看到context了，闭包
  let res = obj.fn(...arr)
  // 要删除 fn
  delete obj.fn
  return res
}
const obj = {
  name: '张无忌'
}
const myApplyTestFn = function(a, b) {
  console.log(a,b)
  console.log(this.name)
}
console.log('myCall', myApplyTestFn.myCall(obj, 1,2))
console.log('myApply', myApplyTestFn.myApply(obj, [1,2]))
```

# 14. 手写 my bind

手写一个 bind 函数，和 call 和 apply 不一样的是 bind 会返回一个函数。

```js
Function.prototype.myBind = function(context) {
  const fn = this
  const args = [...arguments].slice(1)

  return function(...innerArgs) {
    let moreArgs = [...args, ...innerArgs]
    return fn.apply(context, moreArgs)
  }
}
const context = {
  name: '张三丰'
}
const myBindTestFn = function(name, age, school){
  console.log(name) // 'Ann'
  console.log(age) // 32
  console.log(school) // '126'
}
let myBindFn = myBindTestFn.myBind(context, 'Ann')
myBindFn(32, '126')
```

# 15. 手写 my trim

手写一个 trim 方法

```js
String.prototype.myTrim = function() {
  let str = this
  const trimLeft = function(string) {
    for (let i = 0; i < string.length; i++) {
      if (string.charAt(i) !== ' ') {
        return string.substring(i, string.length)
      }
    }

    return string
  }

  const trimRight = function(string) {
    for (let i = string.length - 1; i >= 0; i--) {
      if (string.charAt(i) !== ' ') {
        return string.substring(0, i + 1)
      }
    }

    return string
  }

  return trimRight(trimLeft(str))
}
console.log('        123123123    '.myTrim())
```

# 16. 手写 my curry

手写函数柯里化。柯里化函数会接收一部分参数，返回一个函数接收剩余参数，接收足够参数后，执行原函数。

```js
const myCurry = function(fn) {
  // fn.length gives the length of arguments of fn
  let length = fn.length
  // get arguments from myCurry
  let args = [...arguments].slice(1)

  return function(...innerArgs) {
    // concat myCurry and currying arguments
    let moreArgs = [...args, ...innerArgs]
    // if current length === fn.length, we can return the result
    if (length === moreArgs.length) return fn.apply(this, moreArgs)
    // if not yet finished, recursion and call myCurry.apply with the correct arguments
    else return myCurry.apply(this, [fn, ...moreArgs])
  }
}
function sum(a, b, c) {
  return a + b + c;
}
let currying = myCurry(sum)
console.log(currying(1)(2)(3))
console.log(currying(1,2,3))
```

# 17. 手写promise

手写一个promise，关键在于定义收集回调函数的栈，定义resolve函数和reject函数。可能有的面试会要求promise支持链式调用，需要注意。

```js
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
```

# 18. 实现 json to string

手写一个类似 JSON.stringify 的方法，递归的形式生成字符串。

```js
const jsonToString = function(obj) {
  if (!obj) return obj
  let str = ``

  if (Object.prototype.toString.call(obj) === '[object Array]') {
    str = `[`
    let keys = Object.keys(obj)
    for (let j = 0; j < keys.length; j++) {
      let key = keys[j]
      let val = obj[key]
      let res = jsonToString(val)
      str = `${str}${res}`
      if (j !== keys.length - 1) str = `${str},` // remove the last comma
    }
    str = `${str}]`
  } else if (Object.prototype.toString.call(obj) === '[object Object]') {
    str = `{`
    let keys = Object.keys(obj)
    for (let j = 0; j < keys.length; j++) {
      let key = keys[j]
      let val = obj[key]
      let res = jsonToString(val)
      str = `${str}"${key}":${res}`
      if (j !== keys.length - 1) str = `${str},` // remove the last comma
    }
    str = `${str}}`
  } else {
    // other than array or object
    return `${obj}`
  }

  return str
}
let jsonToStringTest = {
    a: 11,
    b: {
        b: 22,
        c: {
            D: 33,
            e: [44,55,66]
        }
    }
};
console.log(JSON.stringify(jsonToStringTest))
console.log(jsonToString(jsonToStringTest))
```

# 19. 实现 string to json

实现一个类似 JSON.parse 的方法

```js
const jsonString = '{ "age": 20, "name": "jack" }'
const stringToJson = function(jsonString) {
  return (new Function('return ' + jsonString))();
}
console.log(stringToJson(jsonString))
```

# 20. 实现 dom to json

React 把真实DOM转换成虚拟DOM

```js
// DOM2JSON
/*
<div>
  <span>
    <a></a>
  </span>
  <span>
    <a></a>
    <a></a>
  </span>
</div>
把上诉dom结构转成下面的JSON格式
{
  tag: 'DIV',
  children: [
    {
      tag: 'SPAN',
      children: [
        { tag: 'A', children: [] }
      ]
    },
    {
      tag: 'SPAN',
      children: [
        { tag: 'A', children: [] },
        { tag: 'A', children: [] }
      ]
    }
  ]
}
*/
const dom2json = function(domTree) {
  // create an obj
  let obj = {}
  // get the tag name
  obj.tag = domTree.tagName
  // setup array for children
  obj.children = []
  // iterate each child node
  domTree.childNodes.forEach((child) => {
    // dfs, it will return json of this child
    obj.children.push(dom2json(child))
  })
  return obj
}
```

# 21. 实现 json to dom

React 把虚拟DOM转换成真实DOM

```js
// const vdom = {
//   tag: 'DIV',
//   attrs:{
//   id:'app'
//   },
//   children: [
//     {
//       tag: 'SPAN',
//       children: [
//         { tag: 'A', children: [] }
//       ]
//     },
//     {
//       tag: 'SPAN',
//       children: [
//         { tag: 'A', children: [] },
//         { tag: 'A', children: [] }
//       ]
//     }
//   ]
// }
/*
// 把上诉虚拟Dom转化成下方真实Dom
<div id="app">
  <span>
    <a></a>
  </span>
  <span>
    <a></a>
    <a></a>
  </span>
</div>
*/

const vdomToRdom = function(vdom) {
  let tag = vdom.tag.toLowerCase()
  let dom = document.createElement(tag)

  if (vdom.attrs) {
    for (let key in vdom.attrs) {
      let val = vdom.attrs[key]
      dom.setAttribute(key, val)
    }
  }

  for (let child of vdom.children) {
    let childNode = vdomToRdom(child)
    dom.appendChild(childNode)
  }

  return dom
}
console.log(vdomToRdom(vdom))
```

# 22. 树转扁平结构 

把一个树转化成list

```js
const treeToList = function(tree) {
  let list = []
  treeToListHelper(tree, list)
  list.sort((a, b) => a.id - b.id)
  return list
}

const treeToListHelper = function(tree, list) {
  if (!tree) return

  for (let item of tree) {
    let id = item.id
    let name = item.name
    let parentId = item.parentId
    list.push({ id, name, parentId })
    treeToListHelper(item.children, list)
  }
}

let tree = [
  {
    id: 1,
    name: '部门A',
    parentId: 0,
    children: [
      {
        id: 3,
        name: '部门C',
        parentId: 1,
        children: [
          {
            id: 6,
            name: '部门F',
            parentId: 3
          }
        ]
      },
      {
        id: 4,
        name: '部门D',
        parentId: 1,
        children: [
          {
            id: 8,
            name: '部门H',
            parentId: 4
          }
        ]
      }
    ]
  },
  {
    id: 2,
    name: '部门B',
    parentId: 0,
    children: [
      {
        id: 5,
        name: '部门E',
        parentId: 2
      },
      {
        id: 7,
        name: '部门G',
        parentId: 2
      }
    ]
  }  
];

console.log(treeToList(tree))
```

# 23. 扁平转树结构  列表转成树

深度优先遍历

```js
const treeToList=(tree)=>{
    const list=[]
    treeToListHelper(tree, list)
    list.sort((a,b)=>a.id-b-id)
    return list;
}
const treeToListHelper=(tree, list)=>{
    if(!tree) return
    for(let item of tree){
        let id = item.id, pid=item.pid,name=item.name;
        list.push({id, pid, name})
        treeToListHelper(item.children, list)    
    }
}
let list = [
  {id:1, name:'部门A', parentId:0},
  {id:2, name:'部门B', parentId:0},
  {id:3, name:'部门C', parentId:1},
  {id:4, name:'部门D', parentId:1},
  {id:5, name:'部门E', parentId:2},
  {id:6, name:'部门F', parentId:3},
  {id:7, name:'部门G', parentId:2},
  {id:8, name:'部门H', parentId:4}
];
console.log(listToTree(list))
```
哈希map
```js
function listToTree(data) {
  // 使用对象重新存储数据, 空间换时间
  let map = {};
  // treeData存储最后结果
  let treeData = [];
  // 遍历原始数据data，存到map中，id为key，值为数据
  for (let i = 0; i < data.length; i++) {
    map[data[i].id] = data[i];
  }
  // 遍历对象
  for (let i in map) {
    // 根据 parentId 找到的是父节点
    if (map[i].parentId) {
      if (!map[map[i].parentId].children) {
        map[map[i].parentId].children = [];
      }
      // 将子节点放到父节点的 children中
      map[map[i].parentId].children.push(map[i]);
    } else {
      // parentId 找不到对应值，说明是根结点，直接插到根数组中
      treeData.push(map[i]);
    }
  }
  return treeData;
}
```

# 24. 实现 path to object

手写一个可以转换 path 数组到对象的方法

```js
const pathToObjData = {
  'a.b': 1,
  'a.c': 2,
  'a.d.e': 5,
  'c': 3
}
/* 
返回结果
{ a: { b: 1, c: 2, d: { e: 5 } }, c: 3 }
*/

const pathToObj = function(pathList) {
  let res = {}
  for (let path in pathList) {
    let pathArr = path.split('.')
    pathToObjHelper(pathArr, pathList[path], res)
  }
  return res
}
const pathToObjHelper = function(pathArr, val, res) {
  if (pathArr.length === 0) {
    return val
  }

  let key = pathArr.shift()
  let obj = res[key] ? res[key] : {}
  res[key] = pathToObjHelper(pathArr, val, obj)

  return res
}
console.log(pathToObj(pathToObjData))
```

# 25. 实现 obj to path

手写一个可以转换对象到 path 数组的方法

```js
const objToPathData = {
  a: {
    b: 1,
    c: 2,
    d: {e: 5}
  },
  b: [1, 3, {a: 2, b: 3}],
  c: 3
} 
/* 
返回结果
{
  'a.b': 1,
  'a.c': 2,
  'a.d.e': 5,
  'b[0]': 1,
  'b[1]': 3,
  'b[2].a': 2,
  'b[2].b': 3,
  c: 3
}
*/
const objToPath = function(obj) {
  let res = {} 
  objToPathHelper(obj, '', res)
  return res
}
const objToPathHelper = function(obj, path, res) {
  if (!obj) return

  if (Array.isArray(obj)) {
    for (let key in obj) {
      const pathKey = path ? `${path}[${key}]` : `${path}${key}`
      objToPathHelper(obj[key], pathKey, res)
    }
  } else if (typeof obj === 'object') {
    for (let key in obj) {
      const pathKey = path ? `${path}.${key}` : `${path}${key}`
      objToPathHelper(obj[key], pathKey, res)
    }
  } else {
    res[path] = obj
  }
}
console.log(objToPath(objToPathData))
```

# 26. 实现数组扁平化

手写一个扁平化数组的方法

```js
// deep初始值为1
Array.prototype.myFlat = function(deep = 1) {
  let arr = this;
  // deep为0则返回，递归结束
  if (deep == 0) return arr;
  // 使用reduce作为累加器
  return arr.reduce((pre, cur) => {
    // cur为数组，继续递归，deep-1
    if (Array.isArray(cur)) {
      return [...pre, ...cur.myFlat(deep - 1)];
    } else {
      return [...pre, cur];
    }
  }, []);
};
console.log([1, 2, 3, [4, [5, [6]]]].myFlat(2)); // [1, 2, 3, 4, 5, [6]]
```

# 27. 实现数组去重

实现数组去重，可以使用Set去重，也可以尝试其它方法。

```js
const dedupArray = function(array) {
  new Set(array)
  return [...new Set(array)]
}
console.log(dedupArray([12, 1, 2, 3, 3, 2, 4, 4, 3, 4, 2]))
```

# 28. 实现大数相加

输入两个类型为字符串的数字，相加之后返回字符串结果。从后往前加，注意最后一个carry。

```js
function add(a ,b){
  let indexa = a.length - 1
  let indexb = b.length - 1
  let carry = 0
  let res = ``

  while (indexa >= 0 || indexb >= 0) {
    let numa = indexa >= 0 ? a.charAt(indexa) : 0
    let numb = indexb >= 0 ? b.charAt(indexb) : 0

    let sum = parseInt(numa) + parseInt(numb) + carry
    carry = sum >= 10 ? 1 : 0
    sum = sum >= 10 ? sum - 10 : sum
    res = `${sum}${res}`

    indexa--
    indexb--
  }
    
  // 最后如果剩下一个carry
  if (carry !== 0) {
    res = `1${res}`
  }

  return res
}
let a = "9007199254740991";
let b = "1234567899999999999";
console.log(add(a, b))
```

# 29. 抢红包

手写一个类似微信红包的方法。

```js
const redenvelope = function(people, amount) {
  let randSum = 0
  let randList = []
  let res = []

  for (let i = 0; i < people; i++) {
    let rand = Math.random()
    randList.push(rand)
    randSum += rand
  }

  randList.forEach((rand) => {
    // 转成保留2位小数
    const numSum = Number(((amount * rand / randSum).toFixed(2)))
    res.push(numSum)
  })

  return res
}
const redenvelopeRes = redenvelope(13, 200)
const sum= redenvelopeRes.reduce((acc,val) => {
  return acc + val 
}, 0)
console.log('redenvelopeRes', redenvelopeRes, sum)
```

# 30. 实现 LazyMan

实现一个LazyMan，可以按照以下方式调用:

```js
LazyMan(“Hank”)
输出 
Hi! This is Hank!

LazyMan(“Hank”).sleep(10).eat(“dinner”)
输出 
Hi! This is Hank!
等待10秒..
Wake up after 10
Eat dinner~

LazyMan(“Hank”).eat(“dinner”).eat(“supper”)
输出
Hi This is Hank!
Eat dinner~
Eat supper~

LazyMan(“Hank”).eat(“supper”).sleepFirst(5)
输出
等待5秒
Wake up after 5
Hi This is Hank!
Eat supper
```

```js
class LazyMan {
  constructor(name) {
    this.tasks = []

    // 按照顺序推入task队列
    this.tasks.push(() => {
      setTimeout(() => {
        console.log(`Hi This is ${name}!`)
        this.next()
      }, 0)
    })

    // 关键不然不会执行，首次执行，但是希望在同步任务之后执行
    setTimeout(() => {
      this.next()
    }, 0)
  }

  // 每次执行完一个任务，执行next，来执行下一个任务
  next() {
    let task = this.tasks.shift()
    task && task()
  }

  sleep(sec) {
    // 按照顺序推入task队列
    this.tasks.push(() => {
      setTimeout(() => {
        console.log(`Wake up after ${sec}`)
        this.next()
      }, sec*1000)
    })

    // 返回this，继续执行lazy man的方法
    return this
  }

  eat(meal) {
    // 按照顺序推入task队列
    this.tasks.push(() => {
      setTimeout(() => {
        console.log(`Eat ${meal}~`)
        this.next()
      }, 0)
    })

    return this
  }

  sleepFirst(sec) {
    // 推入task首部执行
    this.tasks.unshift(() => {
      setTimeout(() => {
        console.log(`Wake up after ${sec}`)
        this.next()
      }, sec*1000)
    })

    return this
  }
}

new LazyMan("Hank")
new LazyMan("Hank").sleep(10).eat("dinner")
new LazyMan("Hank").eat("dinner").eat("supper")
new LazyMan("Hank").eat("supper").sleepFirst(5)
```

# 31. 每隔一秒打印一个数字，用setTimeout来实现

var 定义的变量在 for 循环之外是可以访问到的，也就是说，在执行 setTimeout 这个类似异步的操作之前，循环就已经结束了。这时的 i 已经为 10，所以最后打印出来的也就是 10 个 10 了。所以需要使用 let 替换 var 解决这个问题。

```js
const printNumber = function(n) {
  // 因为使用var，会打印 10 的 10 次
  // for (var i = 0; i < n; i++) {
  //   setTimeout(() => {
  //     console.log(i)
  //   }, i * 1000)
  // }

  // 因为使用let，会打印 0 到 9
  for (let i = 0; i < n; i++) {
    setTimeout(() => {
      console.log(i)
    }, i * 1000)
  }
}
printNumber(10)
```

# 32. 异步的执行顺序，看问题说答案

考察异步执行顺序是前端面试几乎必考的问题，一定要搞清楚异步执行顺序，也要理解其中的原理，并且解释出来。

先执行同步的代码：

1.  console.log
2.  promise中then之前的代码
3.  async中await前的代码，然后await代码

然后执行异步代码：

1.  一次事件循环执行一个then和一个await后面的代码
2.  setTimeout永远在最后

```js
console.log(1) // 1 同步

setTimeout(() => {
  console.log(2) // 7. 任务队列，timer 队列
}, 0)

setTimeout(() => {
  console.log(3) // 8. 任务队列，timer 队列
}, 0)

Promise.resolve()
.then(function() {
  console.log(4) // 4. 循环1
})
.then(function() {
  console.log(5) // 6 循环3
})

async function foo() {
  await bar() // 2 同步
  console.log(6) // 5 循环2
}
foo()

function bar() {
  console.log(7)
}
console.log(8) // 3 同步

/**
// 同步
1
7
8
// promise 比 await下面的优先
4
6
5
// setTimeout 优先最低
2
3
*/
```

# 33. this的指向问题，看问题说答案

考察对this指向的理解，这种问题在JS中也是非常重要的，面试前一定要搞明白this的指向规律等相关问题。

```js
// 第一组
var length = 10;
function fn() {
  return this.length + 1;
}
var obj1 = {
  length: 5,
  test1: function() {
    return fn()
  }
}

obj1.test2 = fn;
console.log(obj1.test1.call()) // 11
console.log(obj1.test1()) // 11
console.log(obj1.test2.call()) // 11
console.log(obj1.test2()) // 6

// 第二组
var name = "window";
var person = {
  name: "person",
  sayName: function () {
    console.log(this.name);
  }
};
function sayName() {
  var sss = person.sayName;
  sss(); // window
  person.sayName(); // person
  (person.sayName)(); // person
  (b = person.sayName)(); // window
}
sayName();

// 第三组
var name = 'window'
var person1 = {
  name: 'person1',
  foo1: function () {
    console.log(this.name)
  },
  foo2: () => console.log(this.name),
  foo3: function () {
    return function () {
      console.log(this.name)
    }
  },
  foo4: function () {
    return () => {
      console.log(this.name)
    }
  }
}
var person2 = { name: 'person2' }

// 隐式绑定，肯定是person1
person1.foo1(); // person1
// 隐式绑定和显示绑定的结合，显示绑定生效，所以是person2
person1.foo1.call(person2); // person2

// foo2()是一个箭头函数，不适用所有的规则
person1.foo2() // window
// foo2依然是箭头函数，不适用于显示绑定的规则
person1.foo2.call(person2) // window

// 获取到foo3，但是调用位置是全局作用于下，所以是默认绑定window
person1.foo3()() // window
// foo3显示绑定到person2中，但是拿到的返回函数依然是在全局下调用，所以依然是window
person1.foo3.call(person2)() // window
// 拿到foo3返回的函数，通过显示绑定到person2中，所以是person2
person1.foo3().call(person2) // person2

// foo4()的函数返回的是一个箭头函数，箭头函数的执行找上层作用域，是person1
person1.foo4()() // person1
// foo4()显示绑定到person2中，并且返回一个箭头函数，箭头函数找上层作用域，是person2
person1.foo4.call(person2)() // person2
// foo4返回的是箭头函数，箭头函数只看上层作用域
person1.foo4().call(person2) // person1

// 第四组
var name = 'window'
function Person (name) {
  this.name = name
  this.foo1 = function () {
    console.log(this.name)
  },
  this.foo2 = () => console.log(this.name),
  this.foo3 = function () {
    return function () {
      console.log(this.name)
    }
  },
  this.foo4 = function () {
    return () => {
      console.log(this.name)
    }
  }
}
var person1 = new Person('person1')
var person2 = new Person('person2')

// 隐式绑定
person1.foo1() // person1
// 显示绑定优先级大于隐式绑定
person1.foo1.call(person2) // person2

// foo是一个箭头函数，会找上层作用域中的this，那么就是person1
person1.foo2() // person1
// foo是一个箭头函数，使用call调用不会影响this的绑定，和上面一样向上层查找
person1.foo2.call(person2) // person1

// 调用位置是全局直接调用，所以依然是window（默认绑定）
person1.foo3()() // window
// 最终还是拿到了foo3返回的函数，在全局直接调用（默认绑定）
person1.foo3.call(person2)() // window
// 拿到foo3返回的函数后，通过call绑定到person2中进行了调用
person1.foo3().call(person2) // person2

// foo4返回了箭头函数，和自身绑定没有关系，上层找到person1
person1.foo4()() // person1
// foo4调用时绑定了person2，返回的函数是箭头函数，调用时，找到了上层绑定的person2
person1.foo4.call(person2)() // person2
// foo4调用返回的箭头函数，和call调用没有关系，找到上层的person1
person1.foo4().call(person2) // person1

// 第五组
var name = 'window'
function Person (name) {
  this.name = name
  this.obj = {
    name: 'obj',
    foo1: function () {
      return function () {
        console.log(this.name)
      }
    },
    foo2: function () {
      return () => {
        console.log(this.name)
      }
    }
  }
}
var person1 = new Person('person1')
var person2 = new Person('person2')

// obj.foo1()返回一个函数，这个函数在全局作用于下直接执行（默认绑定）
person1.obj.foo1()() // window
// 最终还是拿到一个返回的函数（虽然多了一步call的绑定），这个函数在全局作用于下直接执行（默认绑定）
person1.obj.foo1.call(person2)() // window
person1.obj.foo1().call(person2) // person2

// 拿到foo2()的返回值，是一个箭头函数，箭头函数在执行时找上层作用域下的this，就是obj
person1.obj.foo2()() // obj
// foo2()的返回值，依然是箭头函数，但是在执行foo2时绑定了person2，箭头函数在执行时找上层作用域下的this，找到的是person2
person1.obj.foo2.call(person2)() // person2
// foo2()的返回值，依然是箭头函数，箭头函数通过call调用是不会绑定this，所以找上层作用域下的this是obj
person1.obj.foo2().call(person2) // obj
```

# 34. 排列 

输入 [['a', 'b'], ['n', 'm'], ['0', '1']]

返回 ['an0', 'am0', 'an1', 'am1', 'bn0', 'bm0', 'bn1', 'bm0']

这个题目和 leetcode #17 类似，有递归和回溯的概念，需要多加练习


```js
const permutation = function(array) {
  let res = []
  permutationHelper(array, 0, [], res)
  return res
}
const permutationHelper = function(array, index, path, res) {
  if (array.length === index) {
    res.push(path.join(''))
    return
  }

  for (let i = 0; i < array[index].length; i++) {
    let char = array[index][i]
    permutationHelper(array, index + 1, [...path, char], res)
  }
}
console.log(permutation([['a', 'b'], ['n', 'm'], ['0', '1']]))
```

# 35. 版本号排序的方法

题目描述: 有一组版本号如下['0.1.1', '2.3.3', '0.302.1', '4.2', '4.3.5', '4.3.4.5']。现在需要对其进行排序，排序的结果为 [ '4.3.5', '4.3.4.5', '4.2', '2.3.3', '0.302.1', '0.1.1' ]

```js
const sortByVersion = function(versions) {
  versions.sort((a, b) => {
    let alist = a.split('.')
    let blist = b.split('.')
    let index = 0

    while (alist[index] && blist[index] && alist[index] === blist[index]) {
      index++
    }

    if (alist[index] && !blist[index]) return -1 // if a is longer, a should be larger
    else if (!alist[index] && blist[index]) return 1 // if b is longer, b should be larger
    else if (alist[index] !== blist[index]) return blist[index] - alist[index] // if a != b, return b - a 

    return 0 // a = b
  })

  return versions
}

console.log(sortByVersion(['0.1.1', '2.3.3', '0.302.1', '4.2', '4.3.5', '4.3.4.5', '4.3.5.1']))
// result [ '4.3.5.1', '4.3.5', '4.3.4.5', '4.2', '2.3.3',   '0.302.1', '0.1.1']

```

# 36. EventEmitter

题目描述: 实现一个发布订阅模式拥有 on emit once off 方法

```js
class EventEmitter {
  constructor() {
    this.events = {};
  }

  // 添加订阅
  // 事件是队列的形式
  on(type, handler) {
    let handlers = this.events[type] || []
    handlers.push(handler)
    this.events[type] = handlers
  }

  // 删除订阅
  // 删除事件队列中的其中一个
  off(type, handler) {
    let handlers = this.events[type] || []
    handlers = handlers.filter((item) => {
      return item !== handler
    })
    this.events[type] = handlers
  }

  // 触发事件
  emit(type, ...args) {
    const handlers = this.events[type]
    if (!handlers) return

    handlers.forEach((handler) => {
      handler.apply(this, args)
    })
  }

  // 只执行一次订阅事件
  // 需要使用到on and off
  once(type, callback) {
    let wrapper = function() {
      callback()
      this.off(type, wrapper)
    }
    this.on(type, wrapper)
  }
}

const event = new EventEmitter();
const handler = (...res) => {
  console.log(res);
};
event.on("click", handler);
event.emit("click", 1, 2, 3, 4);
event.off("click", handler);
event.emit("click", 1, 2);
event.once("dbClick", () => {
  console.log(123456);
});
event.emit("dbClick");
event.emit("dbClick");
```

# 37. JS中实现一个继承，寄生组合继承

ES6之前的继承是通过 原型链 来实现的，也就是每一个构造函数都会有一个prototype属性，然后如果我们调用一个实例的方法或者属性，首先会在自身寻找，然后在构造函数的prototype上寻找，而prototype本质上就是一个实例，因此如果prototype上还没有则会往prototype上的构造函数的prototype寻找，因此实现继承可以让构造函数的prototype是父级的一个实例就是以实现继承。

```js
// 寄生组合继承
function Parent(name) {
  this.name = name
  this.say = () => {
     console.log("111")
  }
}
function Child(name) {
  Parent.call(this, name) // step 1
  this.name = name
}
Child.prototype = Object.create(Parent.prototype) // step 2
Child.prototype.constructor = Child // step 3
Parent.prototype.play = () => {
  console.log("222")
}

let child = new Child("儿子");
console.log(child.name);
child.say();
```

# 38. 题目描述: 渲染百万条结构简单的大数据时 怎么使用分片思想优化渲染

这个题目涉及到 React Fiber 中的大数据量分片的概念。当浏览器有空闲时间的时候，React会执行任务，当没有时间的时候，React会暂停并且缓存暂停的位置，下次有时间了继续执行。

```js
let total = 10000
let current = 0
let max = 20 // create 20 items in one frame
let ul = document.getElementById('thelonglist')

const perform = function() {
  if (current >= total) return

  window.requestAnimationFrame(() => {
    // create and append list
    for (let i = 0; i < max && current < total; i++) {
      let li = document.createElement('li')
      li.innerText = `${current} ${new Date().getTime()}`
      ul.appendChild(li)
      current++
    }

    console.log('next', new Date().getTime())
    // 一个frame只运行一次，所以需要再继续注册
    perform()
  })
}

perform()

```

# 39. 写一个事件代理函数，需要判断child是parent的子节点

事件代理是利用事件冒泡的机制，对父节点绑定事件监听函数，避免对子节点的重复绑定。如果子节点是1000个li，那么如果绑定1000个事件会造成很大的内存浪费。绑定一个点击事件在父节点上，通过target来识别是哪个子节点的事件。

```js
<ul id="parent">
    <li>1</li>
    <li>2</li>
    <li>3</li>
</ul>

function proxyEvent(event, callback, parent, child) {
  let parentNode = document.querySelectorAll(parent)[0]

  const handler = (event) => {
    // target is the element triggered the event
    // currrent target is the element registred the event
    // 判断target 是否为 child
    if (event.target.matches(child)) {
      // 判断child是parent的子节点
      if (parentNode.contains(event.target)) {
        callback.call(this, event)
      }
    }
  }

  parentNode.addEventListener(event, handler)
}
proxyEvent('click', (e) => {
  console.log(e.target.innerText)
}, '#parent', 'li')
```

# 40. 组合总和

给定一个不含重复数字的数组array, 指定个数n, 目标和sum, 判断是否含有由n个不同数字相加得到sum的情况, leetcode 40 变种, 数字不得重复使用。

```js
function combinationSum(nums, n, sum) {
  let res = []
  nums.sort((a, b) => a - b)
  combinationSumHelper(nums, n, sum, 0, [], res)
  return res
}
function combinationSumHelper(nums, n, sum, index, path, res) {
  if (path.length === n && sum === 0) {
    res.push(path)
    return
  }
  if (sum < 0 || path.length > n) {
    return
  }

  let set = new Set()
  for (let i = index; i < nums.length; i++) {
    let current = nums[i]
    if (set.has(current)) continue
    set.add(current)
    combinationSumHelper(nums, n, sum - current, i + 1, [...path, current], res)
  }
}
console.log(combinationSum([10,1,2,7,6,1,5], 3, 8))
```

# 41. 实现一个request最大并发控制机

function request(urls, maxNumber, callback) 要求编写函数实现，根据urls数组内的url地址进行并发网络请求，最大并发数maxNumber，当所有请求完毕后调用callback函数(已知请求网络的方法可以使用fetch api)。和上面的promise scheduler类似。

```js
function request(urls, maxNumber, callback) {
  let queue = []
  let currentJobs = 0
  let results = []
  const request = require('request');

  const run = function() {
    if (queue.length === 0 || currentJobs >= maxNumber) return

    currentJobs++
    const url = queue.shift()
    console.log('started', url)
    request(url, (error, response, body) => {
      console.log('finshed', url)
      currentJobs--
      if (error) {
        results.push({ error, time: new Date()})
      } else {
        results.push({ res: body, time: new Date()})
      }

      if (results.length === urls.length) {
        callback(results)
        return
      }
      run()
    })
  }

  urls.forEach((url) => {
    queue.push(url)
    run(url)
  })
}

const urls = [
  "https://www.timeapi.io/api/Time/current/zone?timeZone=Europe/Amsterdam",
  "https://www.timeapi.io/api/Time/current/coordinate?latitude=38.9&longitude=-77.03",
  "https://www.timeapi.io/api/Time/current/ip?ipAddress=237.71.232.203",
  "https://www.timeapi.io/api/TimeZone/zone?timeZone=Europe/Amsterdam",
  "https://www.timeapi.io/api/Time/current/zone?timeZone=Europe/Amsterdam",
  "https://www.timeapi.io/api/Time/current/coordinate?latitude=38.9&longitude=-77.03",
  "https://www.timeapi.io/api/Time/current/ip?ipAddress=237.71.232.203",
  "https://www.timeapi.io/api/TimeZone/zone?timeZone=Europe/Amsterdam",
  "https://www.timeapi.io/api/Time/current/zone?timeZone=Europe/Amsterdam",
  "https://www.timeapi.io/api/Time/current/coordinate?latitude=38.9&longitude=-77.03",
  "https://www.timeapi.io/api/Time/current/ip?ipAddress=237.71.232.203",
  "https://www.timeapi.io/api/TimeZone/zone?timeZone=Europe/Amsterdam",
]

console.log(request(urls, 3, (res) => {
  console.log(res)
}))
```

# 42. 手写代码：写个单例模式

这里是用 ES6 Class 来实现的单列模式，使用 ES5 Function 实现会比较复杂，有兴趣的也可以尝试。

```js
// es6 class
class SingleClass {
  constructor() {
    this.instance = null
  }

  static getInstance(name) {
    if (this.instance) return this.instance

    this.instance = new SingleClass(name)
    return this.instance
  }
}
let Jack = SingleClass.getInstance('Jack');
let Tom = SingleClass.getInstance('Tom');
console.log( Jack === Tom ); // true

```

# 43. 实现抽奖函数

实现抽奖函数rand，保证随机性，输入为表示对象数组，对象有属性n表示人名，w表示权重，随机返回一个中奖人名，中奖概率和w成正比。和微信抢红包类似。

```js
let people = [
  { n: 'p1', w: 1 }, // 0 - 1
  { n: 'p2', w: 100 }, // 1 - 101
  { n: 'p3', w: 100 } // 101 - 201
];

let rand = function (p) {
  const totalWeight = p.reduce(function (pre, cur, index) {
    // 1. get the total weight, create a range for each person
    cur.startW = pre;
    return cur.endW = pre + cur.w
  }, 0)
  // 1. get a random number between the total weight
  let random = Math.ceil(Math.random() * totalWeight)
  // console.log(totalWeight, p, random)

  // use array.find method to choose the person who has the random number
  let selectPeople = p.find(people => people.startW < random && people.endW > random)
  return selectPeople.n
};

console.log(rand(people))
```

# 44. 实现这个u，打印出结果

这个题目和LazyMan类似，这些题目考验的是候选人对异步执行的理解。

```js
u.console('breakfast').setTimeout(3000).console('lunch').setTimeout(3000).console('dinner')

class U {
  constructor() {
    this.tasks = []

    // 关键不然不会执行，首次执行，但是希望在同步任务之后执行
      setTimeout(() => {
        this.next()
      }, 0)
  }

  console(name) {
    this.tasks.push(() => {
      setTimeout(() => {
        console.log(name)
        this.next()
      }, 0)
    })
    return this
  }
  setTimeout(time) {
    this.tasks.push(() => {
      setTimeout(() => {
        console.log(time)
        this.next()
      }, time)
    })
    return this
  }
  next() {
    let task = this.tasks.shift()
    if (task) task()
  }
}

const u = new U()
u.console('breakfast').setTimeout(3000).console('lunch').setTimeout(3000).console('dinner')

```

# 45. 获取目标数值

题目描述：getPathValue({a:{b:[1,2,3]}}, 'a.b[0]') => 返回 1

```js
const getPathValue = function(map, path) {
  return getPathValueHelper(map, path, '')
}
const getPathValueHelper = function(map, path, currentPath) {
  if (path === currentPath) return map

  if (Object.prototype.toString.call(map) === '[object Object]') {
    for (let key in map) {
      let val = map[key]
      let nextPath = currentPath ? `${currentPath}.${key}` : `${currentPath}${key}`
      let res = getPathValueHelper(val, path, nextPath)
      if (res) return res
    }
  } else if (Object.prototype.toString.call(map) === '[object Array]') {
    for (let key in map) {
      let val = map[key]
      let nextPath = currentPath ? `${currentPath}[${key}]` : `${currentPath}${key}`
      let res = getPathValueHelper(val, path, nextPath)
      if (res) return res
    }
  }
}
console.log(getPathValue({a:{b:[1,2,3]}}, 'a.b[1]'))
```

# 46. 实现千分位格式化函数

输入一个很大的数字，返回千分位格式化的字符串。比如输入 11112312312，然后返回 11,112,312,312

```js
const toThousands = function(num) {
  let array = num.toString().split('')
  let count = 0
  let res = ``

  for (let i = array.length - 1; i >= 0; i--) {
    if (count && count % 3 === 0) {
      res = `${array[i]},${res}`
    } else {
      res = `${array[i]}${res}`
    }
    count++
  }

  return res
}
console.log(toThousands(11112312312))
```

# 47. 给数组中的字符串编号

题目：f(['ab', 'c', 'd', 'ab', 'c']) => ['ab1', 'c1', 'd', 'ab2', 'c2']

```js
const label = function(list) {
  let map = new Map()
  let res = []

  for (let i = 0; i < list.length; i++) {
    let val = list[i]
    if (map.has(val)) {
      let count = map.get(val) || 0
      if (count === 1) {
        let index = res.indexOf(val)
        res[index] = `${val}1`
      }
      count++
      map.set(val, count)
      res.push(`${val}${count}`)
    } else {
      map.set(val, 1)
      res.push(`${val}`)
    }
  }

  return res
}

console.log(label(['ab', 'c', 'd', 'ab', 'c']))
```

# 48. 实现一个sum，执行asyncAdd

假设有一台本地机器，无法做加减乘除运算（包括位运算），因此无法执行 a + b = 1 这样的 JS 代码，然后我们提供一个服务器端的 HTTP API，可以传两个数字类型的参数，响应结果是这两个参数的和，这个 HTTP API 的 JS SDK（在本地机器上运行）的使用方法如下:

```js
asyncAdd(3, 5, (err, result) => {
    console.log(result); // 8
});
```

```js
// 模拟 asyncAdd API
function asyncAdd(a, b, cb) {
    setTimeout(() => {
        cb(null, a + b);
    }, Math.floor(Math.random()*1000))
}

// 把 asyncAdd 封装成 promise
const asyncAddPro = function(a, b) {
    return new Promise((resolve, reject) => {
        asyncAdd(a, b, (err, result) => {
            resolve(result)
        });
    })
}

// 要求 sum 能在最短的时间里返回以上结果 
const sum = function(...args) {
    return new Promise((resolve, reject) => {
        // 并发执行
        // 最后的结果会在index 0，而且数组中只剩最后一个元素
        if (args.length === 1) {
            resolve(args[0])
            return
        }
        let promises = []
        let res = []
        for (let i = 0; i < args.length; i += 2) {
            // 单数 args，把最后一个推入res
            if (!args[i+1]) {
                res.push(args[i])
                continue
            } 
            let a = args[i]
            let b = args[i+1]
            promises.push(asyncAddPro(a, b))
        }
        // 计算promises中的结果
        let all = await Promise.all(promises)
        // 结果推入res，进行下一轮
        res = res.concat(all)
        resolve(await sum(...res))
    })
}

// 现在要求在本地机器上实现一个 sum 函数，支持以下用法：
(async () => {
    const result1 = await sum(1, 4, 6, 9, 2, 4);
    const result2 = await sum(3, 4, 9, 2, 5, 3, 2, 1, 7);
    const result3 = await sum(1, 6, 0, 5);
    console.log([result1, result2, result3]); // [26, 36, 12]
})();
```

```js
/**
 * 第一个不重复的字符
题目：输入一个字符串，找到第一个不重复字符的下标
输入：'abcabcde'
输出：6
 */
// 时间复杂度O(n)、 空间复杂度O(n)
function findOneStr(str) {
  if (!str) return -1;
  // 使用map存储每个字符出现的次数
  let map = {};
  let arr = str.split("");
  arr.forEach(item => {
    let val = map[item];
    // val为undefined时，表示未存储，map[item] = 1；否则map[item] = val + 1
    map[item] = val ? val + 1 : 1;
  });
  // 再遍历一遍找到出现1次的下标
  for (let i = 0; i < arr.length; i++) {
    if (map[arr[i]] == 1) {
      return i;
    }
  }
  return -1;
}
```
```js
/**
 * 字符串所有排列组合
 * 输入一个字符串，打印该字符串中，所有的字符排列组合
 * 输入:adc
 * 输出：['abc','acb','bac','bca','cab','cba']
 * 利用回溯算法，计算所有字符串的组合
 * @param {array} list - 字符串列表
 * @param {array} result - 最终的结果
 * @param {string} current - 当前的字符串
 * @param {string} temp - 当前固定的字符
 */
function stringGroup(list = [], result = [], current = "", temp = "") {
  current += temp;
  if (list.length === 0) {
    // 递归的出口，将对应结果添加到list中
    return result.push(current);
  }
  for (let i = 0; i < list.length; i++) {
    // 每次递归 固定第一个字符
    temp = list.shift();
    stringGroup(list, result, current, temp);
    // 将删除的temp重新添加到queue尾部，实现将数组反转的效果，如[a,b,c]反转为[c,b,a]
    list.push(temp);
  }
  // 这里去重是解决str中有重复的字母，比如str为'aacd'
  console.log([...new Set(result)])
  return [...new Set(result)];
}

stringGroup([], [], 'abc', '')
```
