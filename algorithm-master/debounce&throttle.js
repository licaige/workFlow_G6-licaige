/*
  防抖（debounce）：对于短时间内连续触发的事件（上面的滚动事件），
  防抖就是让某个时间期限（如上面的1000毫秒）内，事件处理函数只执行一次。
*/
function debounce (fn, delay){
  let timer = null //借助闭包
  return function () {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(fn, delay)
  }
}
function showTop  () {
  var scrollTop = document.body.scrollTop || document.documentElement.scrollTop
  console.log('滚动条位置：' + scrollTop)
}
window.onscroll = debounce(showTop, 300)

/*
  节流（throttle）：如果短时间内大量触发同一事件，那么在函数执行一次之后，
  该函数在指定的时间期限内不再工作，直至过了这段时间才重新生效。
*/
var throttle = function (fn, delay) {
  var valid = true
  return function () {
    if (valid) {
      valid = false // 将函数置为无效
      setTimeout(() => {
        fn()
        valid = true
      }, delay)
    }
    return false // valid为false时，函数不执行
  }
}
function showTop  () {
  var scrollTop = document.body.scrollTop || document.documentElement.scrollTop
  console.log('滚动条位置：' + scrollTop)
}
window.onscroll = throttle(showTop, 1000)