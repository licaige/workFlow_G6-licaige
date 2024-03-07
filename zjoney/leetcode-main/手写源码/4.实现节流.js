/**
 * 连续触发事件但是在n秒中只执行一次函数
 * 场景有：
scroll滚动事件每隔一秒计算一次位置
浏览器播放事件，每隔一秒计算一次进度信息
input搜索展示下拉列表，每隔1秒发送一次请求
 * @param {*} fn 
 * @param {*} wait 
 * @returns 
 */
const throttle=(fn,wait)=>{
  let pre = 0;
  return function(...args){
      let now = Date.now();
      if( now - pre >= wait){
          fn.apply(this,args);
          pre = now;
      }
  }
}
const handle=(id)=>{ 
  console.log(id, Math.random()); 
}
const testThrottle = throttle((id)=>handle(id), 20);
testThrottle(15)
// setInterval(() => {
//   testThrottle(15)
// }, 50)