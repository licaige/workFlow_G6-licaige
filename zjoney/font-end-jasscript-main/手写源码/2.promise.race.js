
Promise.myRace = function (promise) {
  return new Promise((resolve, reject) => {
    if (typeof promise[Symbol.iterator] !== 'function') {
      reject('TypeError: promise is not iterable!')
    }
    for (const item of promise) {
      Promise.resolve(item).then(resolve, reject);
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
Promise.myRace([p1(), p2()]).then(res => {
  console.log(res); // 1
})
