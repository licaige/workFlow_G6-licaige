/*
 * @lc app=leetcode.cn id=53 lang=javascript
 *
 * [53] 最大子数组和
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
// dp
// 状态方程为 一位数组
// 但是只用到 dp[i]
// 所以用 pre 来储存 dp[i]
// dp[i+1] = Math.max(dp[i]+nums[i+1],nums[i+1])
// 中心思想就是接力，如果到自己这一棒还没有自己好，那么就把自己本人接下去，如果比自己好，
// 就把整个团体继续接力，dp[i] 就是接力值
var maxSubArray = function (nums) {
  let max = nums[0];

  // dp[i]
  let pre = max;

  for (let i = 1; i < nums.length; i++) {
    // 求 dp[i+1]
    if (nums[i] + pre >= nums[i]) {
      pre = nums[i] + pre;
    } else {
      pre = nums[i];
    }
    max = Math.max(pre, max);
  }
  return max;
};
// @lc code=end
