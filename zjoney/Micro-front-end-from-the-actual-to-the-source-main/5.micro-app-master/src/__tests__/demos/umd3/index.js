
let mount, unmount

//抛出错误的 mount 和 unmount 函数
if (window.specialUmdMode === 'error-hook') {
  mount = function () {
    throw new Error('mount2')
  }

  unmount = function () {
    throw new Error('unmount2')
  }

  // 抛出错误Promise的 mount 和 unmount 函数
} else if (window.specialUmdMode === 'error-promise-hook') {
  mount = function () {
    return Promise.reject('mount1')
  }

  unmount = function () {
    return Promise.reject('unmount1')
  }
} else {
  mount = function () {
    return Promise.resolve('mount1')
  }

  unmount = function () {
    return Promise.resolve('unmount1')
  }

}

window['umd-app3'] = { mount, unmount }
