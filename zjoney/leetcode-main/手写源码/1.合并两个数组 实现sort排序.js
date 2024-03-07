/**
 * 归并排序
 * @param {*} arr 
 * @returns 
 */
function mergeSort(arr) {
  const len = arr.length
  if (len <= 1) return arr;
  let mid = len >> 1;
  let leftArr = arr.slice(0, mid)
  let rightArr = arr.slice(mid);
  let mergeL = mergeSort(leftArr)
  let mergeR = mergeSort(rightArr)
  // console.log('@', mergeL, mergeR)
  return merge(mergeL, mergeR)
}

function merge(leftArr, rightArr) {
  let result = [];
  while (leftArr.length && rightArr.length) {
    if (leftArr[0] < rightArr[0]) {
      result.push(leftArr.shift());
    }else {
      result.push(rightArr.shift());
    }
  }
  while (leftArr.length) {
    result.push(leftArr.shift())
  }
  while (rightArr.length) {
    result.push(rightArr.shift())
  }
  // console.log(result)
  return result;
}
const arr = [4, 5, 1, -6, 3, 7, 2, 0, 8, -1];
mergeSort(arr)