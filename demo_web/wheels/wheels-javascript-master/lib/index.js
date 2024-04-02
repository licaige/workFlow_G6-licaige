let dom = {
  on: function (element, eventType, selector, fn) {
    element.addEventListener(eventType, e => {
      let el = e.target
      while (!el.matches(selector)) {
        if (element === el) {
          el = null
          break
        }
        el = el.parentNode
      }
      el && fn.call(el, e, el)
    })
    return element
  },
  onSwipe: function (element, fn) {
    let x0, y0
    element.addEventListener('touchstart', function (e) {
      x0 = e.touches[0].clientX
      y0 = e.touches[0].clientY
    })
    element.addEventListener('touchmove', function (e) {
      if (!x0 || !y0) {
        return
      }
      let xDiff = e.touches[0].clientX - x0
      let yDiff = e.touches[0].clientY - y0
      if (Math.abs(xDiff) > Math.abs(yDiff)) {
        if (xDiff > 0) {
          fn.call(element, e, 'right')
        } else {
          fn.call(element, e, 'left')
        }
      } else {
        if (yDiff > 0) {
          fn.call(element, e, 'down')
        } else {
          fn.call(element, e, 'up')
        }
      }
      x0 = undefined
      y0 = undefined
    })
  },
  index: function (element) {
    let siblings = element.parentNode.children
    for (let index = 0; index < siblings.length; index++) {
      if (siblings[index] === element) {
        return index
      }
    }
    return -1
  },
  uniqueClass: function (element, className) {
    dom.every(element.parentNode.children, el => {
      el.classList.remove(className)
    })
    element.classList.add(className)
    return element
  },
  every: function (nodeList, fn) {
    for (let i = 0; i < nodeList.length; i++) {
      fn.call(null, nodeList[i], i)
    }
    return nodeList
  },
  create: function (html, children) {
    let template = document.createElement('template')
    template.innerHTML = html.trim()
    let node = template.content.firstChild
    if (children) {
      dom.append(node, children)
    }
    return node
  },
  append: function (parent, children) {
    if (children.length === undefined) {
      children = [children]
    }
    for (let i = 0; i < children.length; i++) {
      parent.appendChild(children[i])
    }
    return parent
  },
  extend: function (target) {
    for (let i = 1, len = target.length; i < len; i++) {
      for (let prop in arguments[i]) {
        if (arguments[i].hasOwnProperty(prop)) {
          target[prop] = arguments[i][prop]
        }
      }
    }
    return target
  },
  addEvent: function (element, type, fn) {
    element.addEventListener(type, fn, false)
    return fn
  },
  removeEvent: function (element, type, fn) {
    element.removeEventListener(type, fn, false)
  },
  isValidListener: function (listener) {
    if (typeof listener === 'function') {
      return true
    } else if (listener && typeof listener === 'object') {
     return  dom.isValidListener(listener.listener)
    } else {
      return false
    }
  }
}