// 初始化页面内容
const root = document.querySelector('#root')
root.innerHTML = `
  <div class='container'>
    <span class='test-color'>text1</span>
    <span class='test-font'>text2</span>
  </div>
`

const dynamicLink = document.createElement('link')
dynamicLink.setAttribute('rel', 'stylesheet')
dynamicLink.setAttribute('href', '/common/link2.css')
document.head.appendChild(dynamicLink)

const dynamicScript = document.createElement('script')
dynamicScript.setAttribute('src', './script2.js')
document.body.appendChild(dynamicScript)

// 主动卸载的document click
function handleDocClick () {
  console.log('document click1')
}
document.addEventListener('click', handleDocClick, false)
document.removeEventListener('click', handleDocClick)

// 主动卸载的window scroll
function handleWinEvent () {
  console.log('window scroll1')
}
window.addEventListener('scroll', handleWinEvent, false)
window.removeEventListener('scroll', handleWinEvent)
