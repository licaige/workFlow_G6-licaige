/**
 * 考察：二分查找法
 * @difficulty 中等
 * @summary:34. 在排序数组中查找元素的第一个和最后一个位置
 * 给你一个按照非递减顺序排列的整数数组 nums，和一个目标值 target。请你找出给定目标值在数组中的开始位置和结束位置。
 * 如果数组中不存在目标值 target，返回 [-1, -1]。
 * 你必须设计并实现时间复杂度为 O(log n) 的算法解决此问题。

示例1：
输入：nums = [5,7,7,8,8,10], target = 8
输出：[3,4]
 */
var searchRange = function (nums, target) {
  debugger
  let left = 0, right = nums.length - 1, mid;
  while (left <= right) {//二分查找target
    mid = (left + right) >> 1;
    if (nums[mid] === target) break;
    if (nums[mid] > target) right = mid - 1;
    else left = mid + 1;
  }
  if (left > right) return [-1, -1];debugger
  let i = mid, j = mid;
  while (nums[i] === nums[i - 1]) i--;//向左尝试找相同的元素
  while (nums[j] === nums[j + 1]) j++;//向右尝试找相同的元素
  return [i, j];
};
const nums = [5,7,7,8,8,10], target = 8
const result = searchRange(nums, target);
console.log(result);//[3,4]
