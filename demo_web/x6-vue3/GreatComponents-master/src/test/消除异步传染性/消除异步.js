// 删除所有async/await，不修改getUser、m1、m2、m3,在main函数中拿到user数据
function getUser() {
  return fetch('https://my-json-server.typicode.com/typicode/demo/profile')
}
function m1() {
  return getUser()
}
function m2() {
  return m1()
}
function m3() {
  return m2()
}
function main() {
  const user = m3()
  console.log(user)
}

function run(func) {
  let cache = []
  let i = 0
  const originFetch = window.fetch
  window.fetch = (...args) => {
    if (cache[i]) {
      if (cache[i].status === 'fulfilled') {
        return cache[i].data
      } else if (cache[i].status === 'rejected') {
        throw cache[i].err
      }
    }
    const result = {
      status: 'pending',
      data: null,
      err: null
    }
    cache[i++] = result
    // 发送请求
    const prom = originFetch(...args)
      .then(resp => resp.json())
      .then(
        resp => {
          result.status = 'fulfilled'
          result.data = resp
        },
        err => {
          result.status = 'rejected'
          result.err = err
        })
    // 报错
    throw prom
  }
  try {
    func()
  } catch(err) {
    if (err instanceof Promise) {
      const reRun = () => {
        i = 0
        func()
      }
      err.then(reRun, reRun)
    }
  }
}

run(main)