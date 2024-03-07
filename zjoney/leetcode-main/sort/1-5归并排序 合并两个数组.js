/**
 * 时间复杂度o(n*logn)
 * 采用分治法
 * 实现由两种方法：
1、自上而下的递归（所有递归的方法都可以用迭代重写，所以就有了第 2 种方法）；
2、自下而上的迭代；
 */
function mergeSort(arr) {
  const len = arr.length;
  if (len <= 1) {
      return arr;
  }
  const mid = len >> 1;
  console.log('mid', mid, len)
  const leftArr = arr.slice(0, mid);
  const rightArr = arr.slice(mid);
  const leftMergedArr = mergeSort(leftArr);
  const rightMergedArr = mergeSort(rightArr);
  return merge(leftMergedArr, rightMergedArr);
}

function merge(leftArr, rightArr) {
  let result = [];
  while (leftArr.length && rightArr.length) {
      if (leftArr[0] < rightArr[0]) {
          result.push(leftArr.shift());
      } else {
          result.push(rightArr.shift());
      }
  }
  while (leftArr.length) {
      result.push(leftArr.shift())
  }
  while (rightArr.length) {
      result.push(rightArr.shift())
  }
  return result;
}

console.log(mergeSort([5,8,3,12,1]))