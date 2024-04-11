onmessage = function({ data, ports }) {
  const port = ports[0]
  port.onmessage = ({data}) => {
    const { id, chunk } = data;
    // 处理分片任务的逻辑...
    port.postMessage({ id, result: chunk.join('') }); // 处理完毕后发送结果
  }
};