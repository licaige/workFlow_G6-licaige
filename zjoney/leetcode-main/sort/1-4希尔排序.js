/**
 * 希尔排序，也称递减增量排序算法，是插入排序的一种更高效的改进版本。但希尔排序是非稳定排序算法
 */
function shellSort(arr) {
  var len = arr.length,
      temp,
      gap = 1;
  while(gap < len/3) {          //动态定义间隔序列
      gap =gap*3+1;
  }
  for (gap; gap > 0; gap = Math.floor(gap/3)) {
      for (var i = gap; i < len; i++) {
          temp = arr[i];
          for (var j = i-gap; j >= 0 && arr[j] > temp; j-=gap) {
              arr[j+gap] = arr[j];
          }
          arr[j+gap] = temp;
      }
  }
  console.log(arr)
  return arr;
}

var arr = [4, 65, 2, -31, 0, 99, 2, 83, 782, 1];
shellSort(arr);
