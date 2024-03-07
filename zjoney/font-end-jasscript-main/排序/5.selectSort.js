
// 
function selectSort(arr) {
  let len = arr.length;
  let minIndex, temp;
  for (let i = 0; i < len - 1; i++) {
    minIndex = i;
    for (let j = i + 1; j < len; j++) {
      if (arr[minIndex] > arr[j]) {
        minIndex = j
      }
    }
    temp = arr[i]
    // 最小值和第一个交换位置
    arr[i] = arr[minIndex];
    arr[minIndex] = temp;
  }
  return arr;
}
// test
const arr = [3, 1, 2, 5, 4]
console.log(selectSort(arr)) // [1, 2, 3, 4, 5]
