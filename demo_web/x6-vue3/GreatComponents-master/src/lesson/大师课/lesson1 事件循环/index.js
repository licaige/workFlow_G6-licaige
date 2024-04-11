// 事件循环
function a () {
  console.log(1)
  Promise.resolve().then(function () {
    console.log(2)
  })

}
setTimeout(function () {
  console.log(3)
}, 0)

Promise.resolve().then(a)
console.log(5)

// 5,1,2,3

