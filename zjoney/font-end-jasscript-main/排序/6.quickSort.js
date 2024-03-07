
// 
function quickSort(arr) {
  if (arr.length <= 1) return arr
  // 取第一个值作为初始值
  let priot = arr.shift();
  let left = [];
  let right = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < priot) {
      left.push(arr[i])
    } else {
      right.push(arr[i])
    }
  }
  // 递归处理，并把左中右三个数组拼接起来
  return quickSort(left).concat([priot], quickSort(right));
}
// test
const arr = [3, 1, 2, 5, 4];
console.log('quickSort', quickSort(arr)) // [1,2,3,4,5]