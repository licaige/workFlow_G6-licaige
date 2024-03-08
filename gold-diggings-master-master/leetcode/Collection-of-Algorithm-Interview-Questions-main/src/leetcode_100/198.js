/**
 * 打家劫舍HOT
 * https://leetcode.cn/problems/house-robber/description/
 * @param {*} nums
 */
var rob = function(nums) {
  // 动态规划，确定两种状态，偷或者不偷
  // 如果当前不偷的话，则前一个房间可以选择偷也可以选择不偷，取两者最大值，则dp[i][0] = Math.max(dp[i-1][0], dp[i-1][1])
  // 如果当前偷，则前一个只能选择不偷，这样偷盗的金额为 dp[i][1] = dp[i-1][0] + nums[i]
  const n = nums.length;
  // 初始化第一间房间选择偷或者不偷
  let dp0 = 0;
  let dp1 = nums[0];
  for (let i = 1; i < n; i++) {
    const newDp0 = Math.max(dp0, dp1);
    const newDp1 = dp0 + nums[i];
    // 把当前状态更新为下一次的状态
    dp0 = newDp0;
    dp1 = newDp1;
  }

  return Math.max(dp0, dp1);
}
