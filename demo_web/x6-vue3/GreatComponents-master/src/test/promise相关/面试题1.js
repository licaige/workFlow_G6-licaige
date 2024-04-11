Promise.resolve().then(() => {
  console.log(0)
  return Promise.resolve(4)
}).then((res) => {
  console.log(res)
})

Promise.resolve().then(() => {
  console.log(1)
}).then(() => {
  console.log(2)
}).then(() => {
  console.log(3)
}).then(() => {
  console.log(5)
}).then(() => {
  console.log(6)
})

// 解析：
/**
 * 事件循环：
 * pr1: F 将p0放入微队列
 * p0: P
 * pres: P
 * pr2: F 将p1放入微队列
 * p1: P
 * p2: P
 * p3: P
 * p5: P
 * p6: P
 * 
*/
/**
 * 微队列：
 * 0 当p0.then的回调里返回的是promise时：将p4.then(()=>将p0改成fulfilled)放入微队列
 * 1 将p0改成fulfilled(后面省略)，将p2放入微队列
 * p4.then(()=>将p0改成fulfilled)
 * 2 将p2改成fulfilled
 * 将p0改成fulfilled
 * 3
 * 4 将pres改成fulfilled
 * 5
 * 6
*/