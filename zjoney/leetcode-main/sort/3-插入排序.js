/**
 * 在有序的情况下，每个未排序区间元素只需要比较1次，时间复杂度是O(n)。 在逆序，时间复杂度为O(n^2)
 * 工作原理是通过构建有序序列
 * 插入排序和冒泡排序一样，也有一种优化算法，叫做拆半插入。
 */
function insertionSort(arr) {
  var len = arr.length;
  var preIndex, current;
  for (var i = 1; i < len; i++) {
      preIndex = i - 1;
      current = arr[i];
      while(preIndex >= 0 && arr[preIndex] > current) {
          arr[preIndex+1] = arr[preIndex];
          preIndex--;
      }
      arr[preIndex+1] = current;
  }
  console.log(arr)
  return arr;
}
insertionSort(['a', 'c', 'e', 'g', 'i', 'k', 'p', 't'])