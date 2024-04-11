// const worker1 = new Worker('./worker1.js');
// worker1.postMessage({ command: 'connect' });
// worker1.onmessage = function (e) {
//   console.log('receive a message from worker1', e.data); // { message: 'connected' }
// };

// 当有两个worker线程：worker1，worker2时，比较直接的做法是将主线程作为桥梁，worker1和worker2的消息都通过主线程转发给对方。
// 另一个思路是利用MessageChannel实现两个worker的直接通信。

// index.js
const { port1, port2 } = new MessageChannel();
const worker1 = new Worker('./worker1.js');
const worker2 = new Worker('./worker2.js');

port1.onmessage = function (e) {
  console.log('port1在主线程收到消息：', e.data); // 不会打印
};

// 向worker1发送connect的信息
worker1.postMessage(
  {
    command: 'connect',
  },
  [port1]
);

// 向worker2发送connect的信息
worker2.postMessage(
  {
    command: 'connect',
  },
  [port2]
);

// 向worker1发送forward的消息
worker1.postMessage({
  command: 'forward',
  message: 'ping',
});

// 1. 在index.js中
// [worker1/worker2].[postMessage/onmessage] 主线程和worker1/worker2通讯
// 2. 在worker1.js / worker2.js中
// a. self.[postMessage/onmessage] 主线程和worker1/worker2通讯
// b. [port1/port2].[postMessage/onmessage] worker1和worker2通讯

// command: connect 建立worker1 worker2链接，即将port传入
// command: forward 转发，主线程-> worker1 -> worker2
// default: worker1 worker2直接通讯