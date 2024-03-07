// 快速排序
function quickSort(arr) {
  let priot = arr.shift();
  const left = [], right = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < priot) {
      left.push(arr[i])
    } else {
      right.push(arrr[i])
    }
  }
  return quickSort(left).concat([priot]),
    quickSort(right)
}