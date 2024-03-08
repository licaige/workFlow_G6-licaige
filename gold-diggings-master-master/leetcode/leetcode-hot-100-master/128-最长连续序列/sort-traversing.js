/*
 * @lc app=leetcode.cn id=128 lang=javascript
 *
 * [128] 最长连续序列
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */

// 先从小到大排序再遍历
var longestConsecutive = function (nums) {
  nums = nums.sort((pre, next) => pre - next);
  let stack = [];
  let max = 0;

  for (let i = 0; i < nums.length; i++) {
    if (!stack.length) {
      stack.push(nums[i]);
    } else {
      if (stack[stack.length - 1] + 1 === nums[i]) {
        stack.push(nums[i]);
      } else if (stack[stack.length - 1] === nums[i]) {
        continue;
      } else {
        stack = [nums[i]];
      }
    }
    max = Math.max(max, stack.length);
  }
  return max;
};
// @lc code=end
