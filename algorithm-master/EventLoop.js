// console.log('global')

// setTimeout(function () {
//    console.log('timeout1')
//    new Promise(function (resolve) {
//      console.log('timeout1_promise')
//        resolve()
//    }).then(function () {
//      console.log('timeout1_then')
//   })
// }, 2000)

// for (var i = 1; i <= 5; i ++) { // 执行完同步任务，即跳出循环时i=6
//   setTimeout(function () {
//     console.log(i)
//   }, i * 1000)
//   console.log(i)
// }

// new Promise(function (resolve) {
//   console.log('promise1')
//   resolve()
//  }).then(function () {
//   console.log('then1')
// })
// setTimeout(function () {
//   console.log('timeout2')
//   new Promise(function (resolve) {
//     console.log('timeout2_promise')
//     resolve()
//   }).then(function () {
//     console.log('timeout2_then')
//   })
// }, 1000)

// new Promise(function (resolve) {
//   console.log('promise2')
//   resolve()
// }).then(function () {
//   console.log('then2')
// })

/*
  global
  1
  2
  3
  4
  5
  promise1
  promise2
  then1
  then2
  6
  timeout2
  timeout2_promise
  timeout2_then
  timeout1
  timeout1_promise
  timeout1_then
  6
  6
  6
  6
*/

console.log('1') // 1
async function foo () {
  await bar()
  console.log('3') // v1
}
foo()
function bar () {
  console.log('5') // 2
}
async function too () {
  try {
    await Promise.reject('6')
  } catch (err) {
    console.log(err) // v2
  }
}
too()
Promise.resolve('4').then(res => {
  console.log(res) // v3
}).then(() => {
  console.log('9') // 进入微任务队列
}).then(
  console.log('2') // 3 立即执行
)
requestAnimationFrame(() =>{
  console.log('7')
  Promise.resolve().then(() => {
    console.log('8')
  })
})
console.log('10') // 4
// 1 5 2 10 3 6 4 9 7 8
