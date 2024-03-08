/**
 * 在排序数组中查找元素的第一个和最后一个位置HOT
 * https://leetcode.cn/problems/find-first-and-last-position-of-element-in-sorted-array/
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var searchRange = function (nums, target) {
  /**
      二分查找边界的问题
   */
  const binarySearch = (nums, left) => {
    const n = nums.length;
    let l = 0,
      r = n - 1;
    while (l <= r) {
      const mid = l + ((r - l) >> 1);
      // 求左边界，不断的缩小右边界，达到锁定左边界的问题
      if (nums[mid] < target || (left && (nums[mid] >= target))) {
        r = mid - 1;
      } else {
        l = mid + 1;
      }
    }
    const index = left ? l : l - 1;
    return nums[index] === target ? index : -1;
  };
  const leftBorder = binarySearch(nums, true);
  const rightBorder = binarySearch(nums, false);
  return [leftBorder, rightBorder];
};
