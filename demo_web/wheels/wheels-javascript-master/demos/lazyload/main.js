(function () {
  const root = window

  function Lazy(options) {
    this.options = {...this.constructor.defaultOptions, ...options}
    this.init()
  }

  Lazy.defaultOptions = {
    delay: 250,
    useDebounce: false
  }
  let proto = Lazy.prototype;
  proto.init = function () {
    this.calulateView()
    this.bindScrollEvent()
  }
  proto.calulateView = function () {
    this.view = {
      top: 0,
      bottom: root.innerHeight || 0,
      left: 0,
      right: root.innerWidth || 0
    }
  }
  proto.bindScrollEvent = function () {
    let scrollEvent = dom.addEvent(root, 'scroll', this.handleLazyLoad.bind(this))
    let loadEvent = dom.addEvent(root, 'load', this.handleLazyLoad.bind(this))
    this.event = {
      scrollEvent, loadEvent
    }
  }
  let timer = null
  proto.handleLazyLoad = function () {
    let self = this
    if (!this.options.useDebounce && !!timer) {
      return
    }
    clearTimeout(timer)
    timer = setTimeout(() => {
      timer = null
      self.render()
    }, this.options.delay)
  }
  proto.isHidden = function (element) {
    return element.offsetParent === null
  }
  proto.checkInView = function (element) {
    if (this.isHidden(element)) {
      return false
    }
    let rect = element.getBoundingClientRect()

    return (
      rect.right >= this.view.left && rect.bottom >= this.view.top && rect.left <= this.view.right && rect.top <= this.view.bottom
    )
  }
  proto.render = function () {
    let nodes = document.querySelectorAll('[data-lazy-src]')
    let length = nodes.length
    let src, element;
    for (let i = 0; i < length; i++) {
      element = nodes[i]
      if (this.checkInView(element)) {
        if (element.src !== (src = element.getAttribute('data-lazy-src'))) {
          element.src = src
        }
        element.removeAttribute('data-lazy-src')
      }
    }
    if (!length) {
      this.unbindScrollEvent()
    }
  }
  proto.unbindScrollEvent = function () {
    dom.removeEvent(root, 'scroll', this.event.scrollEvent)
    dom.removeEvent(root, 'load', this.event.loadEvent)
  }
  root.Lazy=Lazy
})()