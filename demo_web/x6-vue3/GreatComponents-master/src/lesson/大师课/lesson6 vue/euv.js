function observe(obj) {
  if (Object.isFrozen(obj)) return
  for (const key in obj) {
    let internalValue = obj[key]
    // 依赖收集存储项，set去重
    // let funcs = new Set()
    let funcs = []
    Object.defineProperty(obj, key, {
      get: function () {
        if (window.__func && !funcs.includes(window.__func)) {
          func.push(window.__func)
        }
        return internalValue
      },
      set: function (val) {
        internalValue = val
        // 派发更新：自动调用依赖该属性的函数？？
        for (let i = 0; i < funcs.length; i++) {
          funcs[i]()
        }
      }
    })
  }
}

/**
 * 任何函数交给autorun来执行
 * 依赖收集：记录调用该属性的函数
 * funcs.push(abc) // 这个abc是什么？
 * 在一个固定空间window.__func中存储依赖的函数，看其是否在闭包funcs中存储过
*/
function autorun(func) {
  // 每次调用函数前，先存入这个固定空间中
  window.__func = func
  // 在函数执行中触发get，判断是哪些变量的依赖项
  func()
  // 清空这个空间
  window.__func = null
}