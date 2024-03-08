/*
 * @lc app=leetcode.cn id=300 lang=javascript
 *
 * [300] 最长递增子序列
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var lengthOfLIS = function (nums) {
  const n = nums.length;
  if (n === 1) {
    return 1;
  }
  const dp = [1];
  let maxl = 1;

  for (let i = 1; i < nums.length; i++) {
    // 每一次往前循环记录最大的子串值
    let temp = 1;
    for (let j = 0; j < i; j++) {
      if (nums[i] > nums[j]) {
        // 这里 + 1是关键
        temp = Math.max(temp, dp[j] + 1);
      }
    }
    // 存放当前最长子串长度给后续循环使用
    dp[i] = temp;
    //
    maxl = Math.max(maxl, dp[i]);
  }

  return maxl;
};
// @lc code=end
