console.log(1 + 'true') // '1true'
console.log(1 + true) // 2
console.log(1 + undefined) // NaN
console.log(1 + null) // 1 + Number(null) = 1

// 如果比较运算符两边有一边为Number，则另一边也会转成Number Number('2') > 10
console.log('2' > 10) // false

// 字符串比较会从左到右依次比较
console.log('2' > '10') // true
console.log('abc' > 'b') // false
console.log('abc' > 'aad') // true
console.log(undefined == undefined) // true
console.log(undefined == null) // true
console.log(null == null) // true
console.log(NaN == NaN) // false

// 关系运算符，当有一方是Number，或者只能转成Number进行比较时，适用下面两条规则：
//  1. 将其他数据类型转成数字
// Number([].valueOf().toString()) == 0 
console.log([] == 0) // true
//  2. 逻辑非运算符会将其他运算符转成Boolean
// !Boolean([]) == 0
// 除了以下6个值转成false，其他都为true
// 0，undefined，null，''，NaN，false
console.log(![] == 0) // true
console.log([] == ![]) // true
// 不适用上面规则，因为两边都不需要转成Number
console.log([] == []) // false
// ({}).valueOf().toString() == '[object Object]'
console.log({} == !{}) // false
// 不适用上面规则，因为两边都不需要转成Number
console.log({} == {}) // false