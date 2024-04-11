// worker2.js
let port2;
// 监听来自主线程的消息
self.onmessage = function (event) {
  switch (event.data.command) {
    case 'connect':
      // MessageChannel的port2
      port2 = event.ports[0];
      // 监听来自port1的消息
      port2.onmessage = function (event) {
        console.log('worker2收到来自worker1的消息: ', event.data); // ping
      };
      port2.postMessage('pong');
      break;
    case 'forward':
      // 消息转发给port1
      port2.postMessage(event.data.message);
      break;
    default:
      console.log('worker2收到来自主线程的消息：', event.data);
  }
};