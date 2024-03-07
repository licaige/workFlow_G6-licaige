// 
function limitRequest(urls = [], limit = 4) {
  return new Promise((resolve, reject) => {
    const len = urls.length;
    let count = 0;
    while (limit > 0) {
      start();
      limit -= 1;
    }
    function start() {
      const originData = urls.shift();
      if (originData) {
        fetch(originData).then(res => {
          console.log(res)
        }).catch(e => {

        }).finally(() => {
          if (count === len - 1) {
            // 最后一个任务完成
            resolve();
          } else {
            // 完成之后 启动下一个任务
            count += 1;
            start()
          }
        })
      }
    }
  })
}

// test
const res = limitRequest(['http://xxa', 'http://xxb', 'http://xxc', 'http://xxd', 'http://xxe']);
console.log(res);


