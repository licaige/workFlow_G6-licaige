/**
 * 任意一个 promise 变成了兑现状态，那么由该方法所返回的 promise 就会变成兑现状态
 * 并且它的兑现值就是首先兑现的 promise 的兑现值
 * 实验阶段【TC39 第四阶段草案（Stage 4）】
 * @param {*} promise 
 * @returns 
 */
Promise.myany = function (promise) {
  return new Promise((resolve, reject) => {
    if (typeof promise[Symbol.iterator] !== 'function') {
      reject('TypeError: promise is not iterable!')
    }
    const len = promise.length;
    let count = 0;
    for(let i = 0; i<len; i++){
      Promise.resolve(promise[i]).then(resolve, (err)=>{
        count +=1;
        if(count === len){
          reject(new Error('所有promise失败'))
        }
      })
    }
  })
}

/**
 * 
 * @returns 
 */
// test
function p1() {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, 1000, 1);
  })
}
function p2() {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, 1000, 2);
  })
}
Promise.myany([p1(), p2()]).then(res => {
  console.log(res); // 2
})