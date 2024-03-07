/**
 * 排序
 * @param {*} arr 
 * @returns 
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