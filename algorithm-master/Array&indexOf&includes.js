/*
  JS数组元素匹配性能比较
  在长度为100万的数组种匹配指定元素性能比较：
  indexOf  0.875ms     No.2
  includes  0.666ms     No.1
*/
const arr = []
for (let i = 0; i < 1000000; i++) {
  arr[i] = i
}
console.log('arr:', arr)
console.time('indexOf')
console.log('indexOf:', arr.indexOf(900000))
console.timeEnd('indexOf') // 0.875ms
console.time('includes')
console.log('includes:', arr.includes(900000))
console.timeEnd('includes') // 0.666ms
