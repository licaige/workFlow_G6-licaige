/*
 * @lc app=leetcode.cn id=238 lang=javascript
 *
 * [238] 除自身以外数组的乘积
 */

// 动态规划，[1,2,3,4,5] = [1,2] * [4,5]

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var productExceptSelf = function (nums) {
  const dp = [[nums[0]]];
  const res = [];

  for (let i = 1; i < nums.length; i++) {
    dp.push([]);
    dp[0][i] = dp[0][i - 1] * nums[i];
  }
  dp[nums.length - 1][nums.length - 1] = nums[nums.length - 1];
  for (let i = nums.length - 2; i > 0; i--) {
    dp[i][nums.length - 1] = dp[i + 1][nums.length - 1] * nums[i];
  }

  for (let i = 0; i < nums.length; i++) {
    if (i === 0) {
      res[i] = dp[i + 1][nums.length - 1];
    } else if (i === nums.length - 1) {
      res[i] = dp[0][i - 1];
    } else {
      res[i] = dp[0][i - 1] * dp[i + 1][nums.length - 1];
    }
  }

  return res;
};

productExceptSelf();
// @lc code=end
