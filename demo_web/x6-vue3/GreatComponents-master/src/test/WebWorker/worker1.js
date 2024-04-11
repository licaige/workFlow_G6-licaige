// self.onmessage = function (e) {
//   console.log('receive a message from main window', e.data); // { command: 'connect' }
//   if (e.data.command === 'connect') {
//     self.postMessage({ message: 'connected' });
//   }
// };
// 多个worker传参时
// worker1.js
let port1;
// 监听来自主线程的消息
self.onmessage = function (event) {
  switch (event.data.command) {
    case 'connect':
      // MessageChannel的port1
      port1 = event.ports[0];
      // 监听来自port2的消息
      port1.onmessage = function (event) {
        console.log('worker1收到来自worker2的消息: ', event.data); // pong
      };
      break;
    case 'forward':
      // 消息转发给port2
      port1.postMessage(event.data.message);
      break;
    default:
      console.log('worker1收到来自主线程的消息：', event.data);
  }
};