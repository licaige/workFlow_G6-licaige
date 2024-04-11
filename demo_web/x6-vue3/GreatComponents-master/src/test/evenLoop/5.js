setTimeout(() => {
  console.log('setTimeout')
}, 0)

const { port1, port2 } = new MessageChannel()
port2.onmessage = function () {
  console.log('MessageChannel')
}
port1.postMessage('ping')

requestAnimationFrame(() => {
  console.log('requestAnimationFrame')
})

requestIdleCallback(() => {
  console.log('requestIdleCallback')
})

Promise.resolve().then(() => {
  console.log('Promise')
})


// Promise requestAnimationFrame MessageChannel setTimeout

/**
 * 前面说过，MessageChannel是以DOM Event的形式发送消息，所以它是一个宏任务，会在下一个事件循环的开头执行。 ​
 * 至于为什么MessageChannel回调的执行时机会比setTimeout早，这里简单解释一下，浏览器的宏任务队列其实是一个有序集合，
 * 这意味着队列里到期的事件不一定会按入队的顺序执行，因为DOM Event的优先级比计时器高，所以会出现上面的打印结果。
 * */ 

// 实际浏览器测试： Promise setTimeout MessageChannel requestAnimationFrame requestIdleCallback