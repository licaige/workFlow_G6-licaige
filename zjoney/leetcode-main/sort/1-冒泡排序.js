/**
 * https://www.runoob.com/w3cnote/bubble-sort.html
 * 比较两个相邻的数据大小，大的就下沉
 * 时间复杂度O(n²) 
 * @param {*} arr 
 * @returns 
 * 1.基本的排序算法：冒泡排序（Bubble Sort）、插入排序（Insertion Sort）
2.常考的排序算法: 归并排序（Merge Sort）、快速排序（Quick Sort）
3.其他排序算法：堆排序（Heap Sort）、桶排序（Bucket Sort)
 */
function bubbleSort(arr) {
  var len = arr.length;
  for (var i = 0; i < len - 1; i++) {
      for (var j = 0; j < len - 1 - i; j++) {
          if (arr[j] > arr[j+1]) {        // 相邻元素两两对比
              var temp = arr[j+1];        // 元素交换
              arr[j+1] = arr[j];
              arr[j] = temp;
          }
      }
  }
  console.log(arr);
  return arr;
}
const arr = [4, 65, 2, -31, 0, 99, 83, 782, 1,]
bubbleSort(arr);