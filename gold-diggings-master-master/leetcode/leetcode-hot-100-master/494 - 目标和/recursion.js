/*
 * @lc app=leetcode.cn id=494 lang=javascript
 *
 * [494] 目标和
 */

// 依次递归
// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var findTargetSumWays = function (nums, target) {
  let count = 0;
  if (nums.length <= 1) {
    if (nums[0] === target) {
      count++;
    }
    if (-nums[0] === target) {
      count++;
    }
  } else {
    const rest = [...nums];
    const firstE = rest.shift();
    count = count + findTargetSumWays(rest, target - firstE);
    count = count + findTargetSumWays(rest, target + firstE);
  }
  return count;
};

findTargetSumWays();
// @lc code=end
