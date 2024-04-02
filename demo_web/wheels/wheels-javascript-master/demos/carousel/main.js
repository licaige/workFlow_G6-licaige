window.onload = function () {
  let prev = document.querySelector('#prev')
  let next = document.querySelector('#next')
  let list = document.querySelector('.list')
  console.log(list, 'list')
  let buttons = document.querySelector('.buttons').getElementsByTagName('span')
  let container = document.querySelector('.container')
  let index = 1
  let timer
  let animated = false

  function shownButton() {
    for (let i = 0, len = buttons.length; i < len; i++) {
      if (buttons[i].className === 'on') {
        buttons[i].className = ''
        break
      }
    }
    buttons[index - 1].className = 'on'
  }

  function animate(offset) {
    let interval = 10
    let time = 300
    let speed = offset / (time / interval)
    let newLeft = parseInt(list.style.left, 10) + offset
    animated = true

    function go() {
      if ((speed > 0 && parseInt(list.style.left, 10) < newLeft) || (speed < 0 && parseInt(list.style.left, 10) > newLeft)) {
        list.style.left = parseInt(list.style.left, 10) + speed + 'px'
        setTimeout(go, interval)
      } else {
        animated = false
        if (newLeft > -600) {
          list.style.left = -3000 + 'px'
        }
        if (newLeft < -3000) {
          list.style.left = -600 + 'px'
        }
      }
    }

    go()
  }

  for (let i = 0, len = buttons.length; i < len; i++) {
    buttons[i].onclick = function () {
      if (this.className === 'on') {
        return
      }
      let myIndex = parseInt(this.getAttribute('index'))
      let offset = -600 * (myIndex - index)
      if (!animated) {
        animate(offset)
      }
      index = myIndex
      shownButton()
    }
  }

  // function ()

  prev.onclick = function () {
    if (!animated) {
      if (index === 1) {
        index = 5
      } else {
        index -= 1
      }
      shownButton()
      animate(600)
    }
  }
  next.onclick = function () {
    if (!animated) {
      if (index === 5) {
        index = 1
      } else {
        index += 1
      }
      shownButton()
      animate(-600)
    }
  }

  function play() {
    timer = setInterval(() => {
      next.onclick()
    }, 2000)
  }

  function stop() {
    clearInterval(timer)
  }

  play()
  container.onmouseover = stop
  container.onmouseout = play
}