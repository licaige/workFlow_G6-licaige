/*
  执行1百万个1相加的操作
  五种循环执行效率比较：
  for...  3.181ms     No.2
  for...in  66.05ms     No.5
  for...of  24.619ms     No.4
  forEach  7.406ms     No.3
  while  2.333ms     No.1
*/
const arr = new Array(1000000).fill(1)
// console.log('arr:', arr)
const len = arr.length
console.log('len:', len)
console.time('for')
var sum = 0
for (let i = 0; i < len; i++) {
  sum+=arr[i]
}
console.log('sum:', sum)
console.timeEnd('for') // 1.8ms
console.time('for in')
var sum = 0
for (let n in arr) {
  sum+=arr[n]
}
console.log('sum:', sum)
console.timeEnd('for in') // 9ms
console.time('for of')
var sum = 0
for (let n of arr) {
  sum+=n
}
console.log('sum:', sum)
console.timeEnd('for of') // 4ms
console.time('forEach')
var sum = 0
arr.forEach(n => {
  sum+=n
})
console.log('sum:', sum)
console.timeEnd('forEach') // 1.6ms
console.time('while')
var sum = 0
let k = 0
while (k < len) {
  sum+=arr[k]
  k++
}
console.log('sum:', sum)
console.timeEnd('while') // 1.4ms