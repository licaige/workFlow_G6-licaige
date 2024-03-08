/*
 * @lc app=leetcode.cn id=64 lang=javascript
 *
 * [64] 最小路径和
 */

// 动态规划
// 方程：dp[i][j] =(Math.min(dp[i - 1][j], dp[i][j - 1]) + grid[i][j]
// @lc code=start
/**
 * @param {number[][]} grid
 * @return {number}
 */
var minPathSum = function (grid) {
  const m = grid.length;
  const n = grid[0].length;
  const dp = [];

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (i === 0 && j === 0) {
        dp.push([grid[0][0]]);
      } else if (i === 0) {
        dp[0].push(dp[0][j - 1] + grid[0][j]);
      } else if (j === 0) {
        dp.push([dp[i - 1][0] + grid[i][0]]);
      } else {
        dp[i].push(Math.min(dp[i - 1][j], dp[i][j - 1]) + grid[i][j]);
      }
    }
  }

  return dp[m - 1][n - 1];
};

minPathSum;
// @lc code=end
