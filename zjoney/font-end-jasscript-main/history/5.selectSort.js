function selectSort(arr) {
  let len = arr.len;
  let minIndex, temp;
  for (let i = 0; i < len - 1; i++) {
    minIndex = i;
    for (let j = i + 1; j < len; j++) {
      if (arr[minIndex] > arr[j]) {
        minIndex = j
      }
    }
    temp = arr[i]
    // 交换位置
    arr[i] = arr[minIndex];
    arr[minIndex] = temp;
  }
}
console.log(selectSort(arr))