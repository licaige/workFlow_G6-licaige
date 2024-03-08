/**
 * 最小路径和HOT
 * https://leetcode.cn/problems/minimum-path-sum/
 * @param {number[][]} grid
 * @return {number}
 */
 var minPathSum = function(grid) {
  /**
      分析：
      1。动态规划的思路：到右下角的最小值取决于右下角的上方的路径和右下角的左边的值，取两者最小
      2. 递推公式：dp[i][j] = Math.min(dp[i-1][j],dp[i][j-1]) + grid[i][j];
      3. 基础条件：dp[0][0] = grid[0][0];
      4. 第一行的路径最小值：dp[0][j] = dp[0][j-1] + grid[0][j];
      5. 第一列的路径最小值：dp[i][0] = dp[i-1][0] + grid[i][0];
   */
  const m = grid.length;
  const n = grid[0].length;
  const dp = new Array(m).fill(0).map(() => new Array(n).fill(0));
  dp[0][0] = grid[0][0];
  // 第一行的最小路径和
  for (let j = 1; j < n; j++) {
      dp[0][j] = dp[0][j-1] + grid[0][j];
  }
  // 第一列的最小路径和
  for (let i = 1; i < m; i++) {
      dp[i][0] = dp[i-1][0] + grid[i][0];
  }
  for (let i = 1; i < m; i++) {
      for (let j = 1; j < n; j++) {
          dp[i][j] = Math.min(dp[i-1][j], dp[i][j-1]) + grid[i][j];
      }
  }
  return dp[m-1][n-1];
};
