// 冒泡排序
function bubbleSort(arr) {
  const len = arr.length;
  for (let i = 0; i < len - 1; i++) {
    // 开始交换位置
    for (let j = 0; j < len - 1-i; j++) {
      if(arr[j]>arr[j+1]){
        [arr[j], arr[j+1]] = [arr[j+1], arr[j]]
      }
    }
  }
  return arr;
}

// test
const arr = [3, 1, 2, 5, 4]
console.log(bubbleSort(arr)) // [1, 2, 3, 4, 5]
