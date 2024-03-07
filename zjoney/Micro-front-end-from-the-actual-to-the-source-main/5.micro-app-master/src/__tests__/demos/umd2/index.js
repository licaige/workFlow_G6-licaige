function handleWindowLoad () {}
window.addEventListener('load', handleWindowLoad, false)
window.removeEventListener('load', handleWindowLoad)

// coverage brach of effect listener?.__MICRO_MARK_OPTIONS__
let supportsPassive = false
try {
  const opts = Object.defineProperty({}, 'passive', {
    get: function () {
      supportsPassive = true
    }
  })
  window.addEventListener('test', null, opts)
} catch (e) {}

// 不要加document事件监听 --- 单测分支覆盖！！！

function mount () {
  const root = document.querySelector('#umd-root2')
  root.innerHTML = `
    <div class='container'>
      <span class='test-color'>text1</span>
      <span class='test-font'>text2</span>
    </div>
  `
}

function unmount () {
  const root = document.querySelector('#umd-root2')
  root && (root.innerHTML = '')
}

window['umd-app2'] = { mount, unmount }
