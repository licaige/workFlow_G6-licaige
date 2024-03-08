/*
 * @lc app=leetcode.cn id=62 lang=javascript
 *
 * [62] 不同路径
 */

// @lc code=start
/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var uniquePaths = function (m, n) {
  // 先把数组设置为 m+1 * n+1 为 1
  const dp = new Array(m + 1).fill(new Array(n + 1).fill(1));

  // 从 2 开始计算
  for (let i = 2; i <= m; i++) {
    for (let j = 2; j <= n; j++) {
      dp[i][j] = (dp[i - 1][j] || 1) + (dp[i][j - 1] || 1);
    }
  }

  return dp[m][n];
};
uniquePaths;
// @lc code=end
