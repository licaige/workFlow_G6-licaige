/**
 * 搜索旋转排序数组HOT
 * https://leetcode-cn.com/problems/search-in-rotated-sorted-array/
 * @param {*} nums 
 * @param {*} target 
 * @returns 
 */
var search = function (nums, target) {
  // 二分法
  const n = nums.length;
  if (n === 1) {
    return nums[0] === target ? 0 : -1;
  }
  let l = 0, r = n - 1;
  while (l <= r) {
    const mid = l + ((r - l) >> 1);
    if (nums[mid] === target) {
      return mid;
    }
    // 注意观察旋转数组，前半部分是有序的
    // 正常来说nums[0]肯定是小于它后面的数
    // mid位置所在的数小于0位置的数，说明[0,mid]位置是有序的，确定了二分法的上下界
    if (nums[0] <= nums[mid]) {
      // 判断如果target在[0,mid]范围内，缩小右边界，否则缩小左边界，注意=号
      if (nums[0] <= target && target < nums[mid]) {
        r = mid - 1;
      } else {
        l = mid + 1;
      }
    } else {
      if (nums[mid] < target && target <= nums[n - 1]) {
        l = mid + 1;
      } else {
        r = mid - 1;
      }
    }
  }
  return -1;
};
