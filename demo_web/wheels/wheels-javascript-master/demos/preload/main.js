(function () {
  const util = {
    extend: function (target) {
      for (let i = 0, len = arguments.length; i < len; i++) {
        for (let prop in arguments[i]) {
          if (arguments[i].hasOwnProperty(prop)) {
            target[prop] = arguments[i][prop]
          }
        }
      }
      return target
    },
    isArray: function (arr) {
      return Array.isArray ? Array.isArray(arr) : Object.prototype.toString.call(arr) === '[object Array]'
    },
    isValidListener: function (listener) {
      if (typeof listener === 'function') {
        return true
      } else if (typeof listener === 'object') {
        return util.isValidListener(listener.listener)
      } else {
        return false
      }
    },
    indexOf: function (array, item) {
      if (array.indexOf) {
        return array.indexOf(item)
      } else {
        let result = -1
        for (let i = 0, len = array.length; i < len; i++) {
          if (array[i] === item) {
            result = i
            break
          }
        }
        return result
      }
    }
  }

  function Preload(pics, options) {
    if (!util.isArray(pics)) {
      throw new Error('pics must be an array type')
    }
    this.pics = pics
    this.options = util.extend({}, this.constructor.defaultOptions, options)
    this.index = this.failNum = 0
    this.init()
  }

  Preload.defaultOptions = {
    complete: function () {
    },
    progress: function () {
    }
  }
  let proto = Preload.prototype
  proto.init = function () {
    for (let i = 0; i < this.pics.length; i++) {
      this.loadImg(pics[i])
    }
  }
  proto.loadImg = function (src) {
    let self = this
    let img = new Image()
    img.onload = function () {
      img.onload = null
      self.progress(src, 'success')
    }
    img.onerror = function () {
      self.progress(src, 'fail')
    }
    img.src = src
  }
  proto.progress = function (src, type) {
    if (type === 'fail') this.failNum++
    this.index++
    this.options.progress(this.index, this.pics.length, type)
    if (this.index === this.pics.length) {
      this.options.complete(this.pics.length - this.failNum, this.failNum)
    }
  }
  let root =window
  root.Preload=Preload
})()

