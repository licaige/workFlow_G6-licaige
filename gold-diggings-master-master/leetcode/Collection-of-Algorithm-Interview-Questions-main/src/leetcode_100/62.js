/**
 * 不同路径HOT
 * https://leetcode.cn/problems/unique-paths/
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
 var uniquePaths = function(m, n) {
  /**
      分析：
      1. 动态规划的思路
      2. 设dp[i][j]为到[i,j]点的总路径数
      3. 递推公式：dp[i][j] = dp[i-1][j] + dp[i][j-1];
      4. 基本条件：dp[0][0] = 0, dp[0][j] = 1, dp[i][0] = 1，即矩阵的边长位置作为终点时，路径数量都是1
   */
  const dp = new Array(m).fill(0).map(() => new Array(n));
  dp[0][0] = 0;
  // 第一行上的点为终点时，路径数量为1
  for (let j = 0; j < n; j++) {
      dp[0][j] = 1;
  }
  // 第一列上的点为终点时，路径数量为1
  for (let i = 0; i < m; i++) {
      dp[i][0] = 1;
  }
  for (let i = 1; i < m; i++) {
      for (let j = 1; j < n; j++) {
          dp[i][j] = dp[i-1][j] + dp[i][j-1];
      }
  }
  return dp[m-1][n-1];
};

// 组合数学
var uniquePaths = function(m, n) {
  let ans = 1;
  for (let x = n, y = 1; y < m; ++x, ++y) {
      ans = Math.floor(ans * x / y);
  }
  return ans;
};
