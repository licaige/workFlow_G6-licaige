/**
 * 实现单例的2种方式
 * 1. 函数实现
 * 2. es6 class类
 * 
 * 单例应用 创建弹框
 * 思路1: 默认创建隐藏弹框，点击按钮显示弹框（首屏加载慢，浪费性能）
 * 思路2: 点击按钮的时候创建弹框（会重复生成弹框，需用单例解决）
*/

// 1. 函数实现

// 闭包实现单例
var getSingle = (function () {
  var result
  return function (fn) {
    return result || (result = fn)
  }
})()
// 单例应用
var createLayer = function () {
  var div = document.createElement('div')
  div.innerHTML = 'createLayer'
  div.style.display = 'none'
  return div
}
var btn = document.createElement('button') // 实际应用 document.getElementById('btn')
btn.onclick = function () {
  var layer = getSingle(createLayer)
  layer.style.display = 'block'
}

// 2. es6 class类实现
// 第一种
class Single {
  constructor (a, b, c) {
    if (!Single.instance) {
      this.a = a
      this.b = b
      this.c = c
      Single.instance = this
    }
    return Single.instance
  }
}
let a = new Single(1,2,3)
let b = new Single(4,5,6)
a===b // true


// 第二种
class SingleStatic {
  constructor (a, b, c) {
    this.a = a
    this.b = b
    this.c = c
  }
  static getInstance (a, b, c) {
    if (!this.instance) {
      this.instance = new SingleStatic(a, b, c)
    }
    return this.instance
  }
}

let c = SingleStatic.getInstance(1,2,3)
let d = SingleStatic.getInstance(4,5,6)
c===d // true