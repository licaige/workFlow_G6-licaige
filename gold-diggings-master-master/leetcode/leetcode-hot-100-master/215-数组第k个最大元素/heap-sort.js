/*
 * @lc app=leetcode.cn id=215 lang=javascript
 *
 * [215] 数组中的第K个最大元素
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findKthLargest = function (nums, k) {
  const addHeap = (i, arr, len) => {
    let k = 2 * i + 1;
    while (k < len) {
      if (k + 1 < len && arr[k + 1] > arr[k]) {
        k = k + 1;
      }
      if (arr[k] > arr[i]) {
        swap(arr, k, i);
        i = k;
        k = 2 * k + 1;
      } else {
        break;
      }
    }
  };
  const swap = (arr, i, j) => {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  };

  for (let i = parseInt(nums.length / 2) - 1; i >= 0; i--) {
    addHeap(i, nums, nums.length);
  }

  let res = null;
  let i = 1;

  // 堆排序，再依次把堆顶弹出
  while (k--) {
    swap(nums, 0, nums.length - i);
    res = nums[nums.length - i];
    addHeap(0, nums, nums.length - i);
    i++;
  }
  console.log(nums);

  return res;
};

findKthLargest;
// @lc code=end
