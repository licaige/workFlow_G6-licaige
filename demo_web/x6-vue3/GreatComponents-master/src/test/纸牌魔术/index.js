const card = document.querySelector('.card')

function debounce (fn, delay) {
  let timer = null
  delay = delay ? delay : 300;
  return function() {
      let self = this;
      let args = arguments;
      clearTimeout(timer);
      timer = setTimeout(() => {
          fn.apply(self, args);
          timer = null;
      }, delay);
  };
}

const screen = {}

function barHeight() {
  return window.outerHeight - window.innerHeight
}

// 视口坐标 -》 屏幕坐标
function clientToScreen(x, y) {
  screen.x = x + window.screenX
  screen.y = y + window.screenY + barHeight()
  console.log(screen, 'move')
  return [screen.x, screen.y]
}

// 屏幕坐标 -》 视口坐标
function screenToClient(x, y) {
  screen.x = x
  screen.y = y
  const clientX = x - window.screenX
  const clientY = y - window.screenY - barHeight()
  return [clientX, clientY]
}

const channel = new BroadcastChannel('card')
channel.onmessage = (e) => {
  const clientPoints = screenToClient(...e.data)
  card.style.left = clientPoints[0] + 'px'
  card.style.top = clientPoints[1] + 'px'
}

card.onmousedown = (e) => {
  let x = e.pageX - card.offsetLeft
  let y = e.pageY - card.offsetTop
  window.onmousemove = (e) => {
    const cx = e.pageX - x
    const cy = e.pageY - y
    card.style.left = cx + 'px'
    card.style.top = cy + 'px'
    const screenPoints = clientToScreen(cx, cy)
    channel.postMessage(screenPoints)
  }
  window.onmouseup = () => {
    window.onmousemove = null
    window.onmouseup = null
  }
}

window.onresize = debounce((e) => {
  if (document.body.style.zoom != 1 / (window.devicePixelRatio)) {
    document.body.style.zoom = 1 / (window.devicePixelRatio)
  } else {
    console.log(screen, 'resize')
    const clientPoints = screenToClient(screen.x, screen.y)
    card.style.left = clientPoints[0] + 'px'
    card.style.top = clientPoints[1] + 'px'
  }
})

function init() {
  const url = new URL(location.href)
  const type = url.searchParams.get('type') || 'J'
  card.src = `./img/${type}.png`
}

init()

