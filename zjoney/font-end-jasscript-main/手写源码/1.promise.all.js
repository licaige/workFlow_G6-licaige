
// Promise.all
Promise.myall = function (promise) {
  return new Promise((resolve, reject) => {
    if (typeof promise[Symbol.iterator] !== 'function') {
      reject('TypeError: promise is not iterable')
    }
    if (promise.length === 0) {
      resolve([])
    } else {
      const res = [];
      const len = promise.length;
      let count = 0;
      for (let i = 0; i < len; i++) {
        Promise.resolve(promise[i]).then(data => {
          res[i] = data;
          count += 1;
          if (count === len) resolve(res);
        }).catch(err => {
          reject(err);
        })
      }
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
Promise.myall([p1(), p2()]).then(res => {
  console.log(res); // [1, 2]
})

