/**
 * https://www.runoob.com/w3cnote/bubble-sort.html
 * 无论什么数据进去都是 O(n²) 的时间复杂度
 * 不占用额外的内存空间
 */
function selectionSort(arr) {
  var len = arr.length;
  var minIndex, temp;
  for (var i = 0; i < len - 1; i++) {
      minIndex = i;
      for (var j = i + 1; j < len; j++) {
          if (arr[j] < arr[minIndex]) {     // 寻找最小的数
              minIndex = j;                 // 将最小数的索引保存
          }
      }
      temp = arr[i];
      arr[i] = arr[minIndex];
      arr[minIndex] = temp;
  }
  console.log(arr)
  return arr;
}
selectionSort([4, 65, 2, -31, 0, 99, 2, 83, 782, 1]);