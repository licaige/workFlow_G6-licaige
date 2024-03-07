/**
 * 手写一个类似 Array.reduce 的方法
 * @param {*} fn 
 * @param {*} initialValue 
 * @returns 
 */
Array.prototype.myReduce = function(fn, initialValue) {
  let nums = this
  let res = 0
  if (initialValue) res = initialValue

  for (let i = 0; i < nums.length; i++) {
    res = fn(res, nums[i])
  }

  return res
}
let arr = [1,2,3,4,3,1]
let myReduceRes = arr.myReduce((a, b) => {
  return a + b
})
let reduceRes = arr.reduce((a, b) => {
  return a + b
})
console.log('myReduce', myReduceRes)
console.log('reduce', reduceRes)