import axios from "axios";
const fs = require('fs');

// 假设我们有一个返回大数据的 API 端点  
const apiUrl = '/water_resource/water/resource/amount/water/cover/region/list/groupForCover';  
  
axios({  
  method: 'post',
  url: apiUrl,
  data: {
    "waterCode": "A000000,B000000,C000000,D000000,E000000,F000000,G000000,H000000,J000000,K000000",
    "waterType": 1,
    "year": "1956,2016",
    "regionCode": "110000,120100,130000,140000,150000,210000,220000,230000,310000,320000,330000,340000,350000,360000,370000,410000,420000,430000,440000,450000,460000,500100,510000,520000,530000,540000,610000,620000,630000,640000,650000,911000,912000,913000",
    "regionType": 1
  },
  responseType: 'stream', // 对于大数据，建议使用流处理
  onDownloadProgress: function(progressEvent) {
    // 进度事件对象包含 loaded 和 total 属性
    // loaded 表示已接收的字节数，total 表示预期接收的总字节数
    // const percentCompleted = Math.floor((progressEvent.loaded * 100) / progressEvent.total);
    // console.log(`下载进度：${percentCompleted}%`);
    // 在这里，你可以将进度更新到 UI 或其他地方
    // console.log(progressEvent)
    const ar = progressEvent.currentTarget.response.split('{\"name\":')
    ar.shift()
    if (ar[ar.length - 1].lastIndexOf(']}') == -1) {
      console.log('没有')
      ar.pop()
    } else {
      console.log('有')
      ar[ar.length - 1] = ar[ar.length - 1].split(']}')[0] + ']},'
    }
    if (ar.length) {
      console.log(ar.map(item => JSON.parse('{\"name\":' + item.slice(0, -1))))
      // console.log('{\"name\":' + ar[ar.length - 1])
      // console.log(JSON.parse('{\"name\":' + ar[ar.length - 1]))
    }
  },
})  
.then(response => {  
  // 处理响应数据，例如，你可以将数据写入文件或进行其他操作  
  response.data.pipe(fs.createWriteStream('output.txt')); // 假设你使用了 fs 模块来写入文件
  console.log(response)
})  
.catch(error => {  
  console.error('请求失败：', error);  
});



/**
 * 学习备注：
 * 静态导入import axios from "axios"
 * 动态导入const axios = await import('axios')
 * 的区别和优劣
 * 
 * 静态导入：
 * 优点：代码清晰、静态分析、编译时优化、编译时确定模块依赖
 * 缺点：不能动态加载
 * 
 * 动态导入：
 * 优点：动态加载、代码分隔、更好的性能
 * 缺点：语法稍复杂、部分构建工具支持、运行时开销
 * 
 * 区别：如果你知道你的应用将始终需要某个模块，并且希望从编译时优化中受益，那么静态导入可能是更好的选择。
如果你需要根据运行时条件或用户交互动态加载模块，或者希望实现代码分割以提高性能，那么动态导入可能更合适。
*/