
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