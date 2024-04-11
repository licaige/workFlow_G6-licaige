// WebWorker、MessageChannel实现任务分片


// 创建一个MessageChannel
const { port1, port2 } = new MessageChannel();
 
// 创建一个用于分片处理的worker
const worker = new Worker('worker.js');

// 将worker绑定到MessageChannel的port上
worker.postMessage({}, [port2]);
 
// 分片任务函数
async function processTask(task, workerChunkSize) {
  let id = 0;
  for (let i = 0; i < task.length; i += workerChunkSize) {
    // 切分任务并发送给worker
    const chunk = task.slice(i, i + workerChunkSize);
    port1.postMessage({ id, chunk });
    id++;
  }
  
  // 等待所有分片处理完毕
  const results = [];
  for (let i = 0; i < id; i++) {
    const data = await new Promise(resolve => {
      port1.onmessage = ({ data }) => {
        if (data.id === i) {
          resolve(data);
        }
      };
    });
    results.push(data.result);
  }
  
  // 处理完毕，关闭worker
  worker.terminate();
  // 将所有分片结果合并
  return results.join('')
}
 
// 使用分片任务函数处理一个大任务
const largeTask = new Array(10000).fill('任务内容');
const chunkSize = 1000; // 每个分片的大小
processTask(largeTask, chunkSize).then(result => {
  console.log(result); // 处理完毕的结果
});