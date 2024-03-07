// 找出数组中的最大元素
// 前提保证这个数组是一个纯数值型的数组
let arr = [100, 200, 2, 1, 5, 1, 300, 52, 1000];
console.log(Math.max.apply(null, arr))

// 计算数组元素的平均值
console.log((arr.reduce((acc, cur) => acc += cur, 0) / arr.length).toFixed(0))

// 复制数组 以下这个方法会改变原数组
console.log(arr.copyWithin());

// 此方法不会改变原数组
const arrCopy = [...arr];
console.log(arrCopy);

// 颠倒数组元素顺序
console.log(arr.reverse());
