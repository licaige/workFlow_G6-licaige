/**
 * 快速排序的最坏运行情况是 O(n²)，平均状况下要 Ο(nlogn)
 */
function partition(arr, low, high) {
  let pivot = arr[low]; // 称为 “基准”
  while (low < high) { // 满足条件就可以多次循环
    while (low < high && arr[high] > pivot) {
      --high;
    }
    arr[low] = arr[high];
    while (low < high && arr[low] <= pivot) {
      ++low;
    }
    arr[high] = arr[low];
  }
  arr[low] = pivot;
  return low;
}
// 重复数组的前五个元素作为基准，然后对前五个元素进行9次快速排序


function quickSort(arr, low, high) {
  if (low < high) {
    let pivot = partition(arr, low, high);
    quickSort(arr, low, pivot - 1);
    quickSort(arr, pivot + 1, high);
  }
  return arr;
}
const arr = [9, 8, 7, 6, 5, 0, 1, 2, 3, 4];
// console.log(quickSort(arr, 0, arr.length - 1))

// 计算两个日期之间的差距
function getDiffDays(date1, date2) {
  let diff = date2.getTime() - date1.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

// 计算两个日期之间的最小时间差
function getMinutesDiff(date1, date2) {
  let diff = date2.getTime() - date1.getTime();
  return Math.floor(diff / (1000 * 60));
}

// 将日期转换成字符串
function dateToString(date) { 
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let hour = date.getHours();
  let minute = date.getMinutes();
  let second = date.getSeconds();
  return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
}
// 实现手写sort方法
function mySort(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  return arr;
}

// 实现手写抢红包算法
function redArrow(numItems, numColors) {
  let result = [];
  for (let i = 0; i < numItems; i++) {
    let color = Math.floor(Math.random() * numColors);
    result.push(color);
  }
  return result;
}
console.log('123', redArrow(10, 3));

// leecode题目 两数之和
var twoSum = function(nums, target) {
  let map = new Map();
  for (let i = 0; i < nums.length; i++) {
    let diff = target - nums[i];
    if (map.has(diff)) {
      return [map.get(diff), i];
    }
    map.set(nums[i], i);
  }
  return [];
}
// 传入两个参数相加之和
function add(a, b) {
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw new Error('Both arguments must be numbers');
  }

  return a + b;
}
console.log(add(1, 2));