(function () {
  function EventEmitter() {
    this.__events = {}
  }

  EventEmitter.prototype.on = function (eventName, listener) {
    if (!eventName || !listener) return
    if (!dom.isValidListener(listener)) {
      throw new Error('listener must be a function')
    }
    let events = this.__events
    let listeners = (events[eventName] = events[eventName] || [])
    let listenerIsWrapped = typeof listener === 'object'

    if (listeners.indexOf(listener) === -1) {
      listeners.push(
        listenerIsWrapped ? listener : {listener: listener, once: false}
      )
    }
  }
  EventEmitter.prototype.once = function (eventName, listener) {
    return this.on(eventName, {listener: listener, once: true})
  }
  EventEmitter.prototype.off = function (eventName, listener) {
    let listeners = this.__events[eventName]
    if (!listeners) return
    let index
    for (let i = 0, len = listeners.length; i < len; i++) {
      if (listeners[i] && listeners[i].listener === listener) {
        index = i
        break
      }
    }
    if (typeof index !== 'undefined') {
      listeners.splice(index, 1, null)
    }
    return this
  }
  EventEmitter.prototype.emit = function (eventName, args) {
    let listeners = this.__events[eventName]
    if (!listeners) return

    for (let i = 0, len = listeners.length; i < len; i++) {
      let listener = listeners[i]
      if (listener) {
        listener.listener.apply(this, args || [])
        if (listener.once) {
          this.off(eventName, listener.listener)
        }
      }
    }
    return this
  }

  function WaterFall(opts) {
    EventEmitter.call(this)
    this.opts = Object.assign({}, this.constructor.defaultopts, opts)
    this._container = typeof this.opts.container === 'string' ? document.querySelector(this.opts.container) : this.opts.container
    this._pins = typeof this.opts.pins === "string" ? document.querySelectorAll(this.opts.pins) : this.opts.pins
    this._loader = typeof this.opts.loader === 'string' ? document.querySelector(this.opts.loader) : this.opts.loader
    this.init()
  }

  WaterFall.defaultopts = {
    gapHeight: 20,
    gapWidth: 20,
    pinWidth: 216,
    threshold: 100
  }
  let proto = (WaterFall.prototype = new EventEmitter())
  proto.constructor = WaterFall
  proto.init = function () {
    this.getColumnNum()
    this.setContainer()
    if (this._pins.length > 0) {
      this.setPosition(this._pins)
    }
    let self = this;
    // 设置瀑布流
    setTimeout(function () {
      self.setWaterFall();
    }, 0);
    // 绑定滚动事件
    this.bindScrollEvent();
  }
  proto.getColumnNum = function () {
    this._unitWidth = this.opts.pinWidth + this.opts.gapWidth
    this._viewPortWidth = window.innerWidth || document.documentElement.clientWidth
    this._viewPortHeight = window.innerHeight || document.documentElement.clientHeight
    this._num = Math.floor((this._viewPortWidth + this.opts.gapWidth) / this._unitWidth)

    this._columnHeightArr = []
    for (let i = 0; i < this._num; i++) {
      this._columnHeightArr[i] = 0
    }
  }
  proto.setContainer = function () {
    this._container.style.width = this._unitWidth * this._num - this.opts.gapWidth + 'px'
  }
  proto.getMin = function () {
    return Math.min.apply(null, this._columnHeightArr)
  }
  proto.getMax = function () {
    return Math.max.apply(null, this._columnHeightArr)
  }
  let load = false
  proto.appendPins = function () {
    if (load) return
    load = true
    if (this._loader) {
      this._loader.style.display = 'block'
      this._loader.style.top = this.getMax() + 50 + 'px'
      this._loader.style.left = '50%'
    }
    this.emit('load')
  }
  proto.append = function (html, selector) {
    this._checkResult = []
    this._newPins = []
    let div = document.createElement('div')
    div.innerHTML = html
    let children = div.querySelectorAll(this.opts.pins)
    let fragment = document.createDocumentFragment()
    for (let j = 0, len = children.length; j < len; j++) {
      fragment.appendChild(children[j])
      this._checkResult[j] = false
      this._newPins.push(children[j])
      this._checkImgHeight(children[j], selector, j)
    }
    this.isReadyAppend(fragment)
  }

  proto._checkImgHeight = function (childNode, selector, index) {
    let startTime = new Date().getTime()
    let img = childNode.querySelector(selector)
    let self = this
    img.onload = function () {
      if (img.getAttribute('height')) return
      img.setAttribute('height', Math.floor((img.height / img.width) * self.opts.pinWidth))
      self._checkResult[index] = true
      clearInterval(timer)
    }
    if (img.getAttribute('height')) return img
    let check = function () {
      if (img.width > 0 && img.height > 0) {
        img.setAttribute('height', Math.floor((img.height / img.width) * self.opts.pinWidth))
        self._checkResult[index] = true
        clearInterval(timer)
      }
    }
    let timer = setInterval(check, 40)
  }
  proto.isReadyAppend = function (fragment) {
    let self = this
    let checkAllHaveHeight = function () {
      if (self._checkResult.indexOf(false) === -1) {
        self._container.appendChild(fragment)
        load = false
        if (self._loader) {
          self._loader.style.display = 'none'
        }
        self.setPosition(self._newPins)
        clearTimeout(timer)
      } else {
        setTimeout(checkAllHaveHeight)
      }
    }
    let timer = setTimeout(checkAllHaveHeight, 40)
  }
  proto.setPosition = function (pins) {
    for (let i = 0, len = pins.length; i < len; i++) {
      let min = this.getMin()
      let index = this._columnHeightArr.indexOf(min)
      pins[i].style.left = this._unitWidth * index + 'px'
      pins[i].style.top = min + 'px'
      this._columnHeightArr[index] += pins[i].offsetHeight + this.opts.gapHeight
    }
    this._newPins = []
    this.setWaterFall()
  }
  proto.setWaterFall = function () {
    if (this.getMin() < this._viewPortHeight) {
      this.appendPins()
    }
  }
  proto.bindScrollEvent = function () {
    dom.addEvent(window, 'scroll', this.handleScroll.bind(this))
    dom.addEvent(window, 'resize', this.handleResize.bind(this))
  }
  let timer = null
  proto.handleResize = function () {
    let self = this
    clearTimeout(timer)
    timer = setTimeout(function () {
      self.resetPosition()
    }, 100)
  }
  proto.resetPosition = function () {
    this.getColumnNum()
    this.setContainer()
    this.setPosition(
      typeof this.opts.pins === 'string' ? document.querySelectorAll(this.opts.pins) : this.opts.pins
    )
  }
  proto.checkScroll = function () {
    return this.getMin() - (window.pageYOffset || document.documentElement.scrollTop) < this._viewPortHeight + this.opts.threshold;

  }
  proto.handleScroll = function () {
    let self = this
    if (self.checkScroll()) {
      self.appendPins()
    }
  }
  window.WaterFall = WaterFall
})()