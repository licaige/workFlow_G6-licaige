/*
 * @lc app=leetcode.cn id=198 lang=javascript
 *
 * [198] 打家劫舍
 */

/**
 * dp[i] =  Math.max(dp[i - 2] + nums[i], dp[i - 1]);
 *
 * 前两个+自己 或者就是前一个
 */
// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function (nums) {
  const dp = new Array(nums.length);
  dp[0] = nums[0];

  dp[1] = Math.max(dp[0], nums[1] || 0);
  let max = dp[1];

  for (let i = 2; i < nums.length; i++) {
    dp[i] = Math.max(dp[i - 2] + nums[i], dp[i - 1]);

    max = Math.max(max, dp[i]);
  }

  return max;
};

rob;
// @lc code=end
