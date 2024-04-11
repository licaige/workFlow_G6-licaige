function runMicroTask (callback) {
  // 判断node环境
  if (process && process.nextTick) {
    process.nextTick(callback)
  }
  // 判断浏览器环境
  else if (MutationObserver) {
    const p = document.createElement('p')
    const observer = new MutationObserver(callback)
    observer.observe(p, {
      childList: true, // 观察该元素内部的变化
    })
    p.innerHTML = '1'
  }
  else {
    // 宏队列
    setTimeout(callback)
  }
}