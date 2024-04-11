// 使用add2就行

// add(1)(2)()  // 3
// add(1)(2)(3)()  // 6
// add(1)(1)(1)(1)(1)(1)()  // 6

function add (n) {
  // 不用排除n==0的情况，还是需要排除，如果第一个数字传0会导致报错
  if (!n && n !== 0) return result
  result = n
  return function (n) {
    // 最后一次不传参的时候进入这里
    // result+undefined = NaN
    // add会返回相加之前的值
    return add(result + n)
  }
}

console.log(add(1)(2)()) // 3
// 问题：不声明result，会被存入window，如果调用add(1)(2)()之后再使用add()还是会返回上次记录
console.log(add()) // 3
console.log(add(1)(2)(3)()) // 6
console.log(add()) // 6
console.log(add(1)(1)(1)(1)(1)(1)()) // 6
console.log(add()) // 6


// 优化
function add2 (a, result = 0) {
  // 不用排除n==0的情况，还是需要排除，如果第一个数字传0会导致报错
  if (!a && a !== 0) return result;
  result += a
  return function (b) {
    return add2(b, result)
  }
}

console.log(add2()) // 0
console.log(add2(1)(2)()) // 3
console.log(add2(1)(2)(3)()) // 6
console.log(add2(1)(1)(1)(1)(1)(1)()) // 6
