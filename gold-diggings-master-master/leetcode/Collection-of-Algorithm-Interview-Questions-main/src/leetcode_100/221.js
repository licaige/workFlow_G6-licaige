/**
 * 最大正方形HOT
 * https://leetcode.cn/problems/maximal-square/description/
 * @param {*} matrix
 * @returns
 */
var maximalSquare = function(matrix) {
  // 动态规划
  const m = matrix.length;
  const n = matrix[0].length;
  // dp[i][j]表示以[i,j]为正方形右下角的最大边长，这样得到的正方形面积也是最大的
  const dp = [...Array(m)].map(() => new Array(n).fill(0));
  // 记录最大面积
  let ans = 0;
  for (let i = 0; i < m; i++) {
      for (let j = 0; j < n; j++) {
          // 必须为1才能组成正方形
          if (matrix[i][j] === '1') {
              // 如果是矩阵的最左或者是最上方，能够构成的最大面积只能为1
              if (i === 0 || j === 0) {
                  dp[i][j] = 1;
              } else {
                  // 以[i,j]为正方形右下角，其最大边长受其左边，上边，以及左上角的边长影响
                  // 三个位置如果存在0，则无法构成正方形，根据木桶短板效应，取三者最小值+1，保证正方形都是1
                  // 左、上、左上三个位置的面积需要取最小值+1，则是[i,j]位置的最大边长
                  dp[i][j] = Math.min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]) + 1
              }
              // 动态规划得到的是最大的边长，因此需要平方以后和最大面积比较
              ans = Math.max(ans, dp[i][j] * dp[i][j]);
          }
      }
  }
  return ans;
};
