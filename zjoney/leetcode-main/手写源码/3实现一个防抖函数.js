/**
 * 触发事件后n秒后才能执行函数，如果在n秒内触发了事件，则会重新计算执行时间
 * @param {*} fn 
 * @param {*} timeout 
 * @returns 
 */
const debounce = function(fn, timeout = 300) {
  let timer = null

  return function(...args) {
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, timeout)
  }
}
function saveInput(id){
  console.log('Saving data', id);
}
const testDebounce = debounce((id) => saveInput(id),250);
testDebounce(12)
