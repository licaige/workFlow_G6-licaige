
/**
 * 考察：动态规划
 * @difficulty中等
 * @desc 63. 不同路径 II
 * 一个机器人位于一个 m x n 网格的左上角 （起始点在下图中标记为 “Start” ）。
 * 机器人每次只能向下或者向右移动一步。机器人试图达到网格的右下角（在下图中标记为 “Finish”）。
 * 现在考虑网格中有障碍物。那么从左上角到右下角将会有多少条不同的路径？
 * 网格中的障碍物和空位置分别用 1 和 0 来表示。
 * 如图：images/4.different_pathsII.jpg
 * 
 * 输入：obstacleGrid = [[0,0,0],[0,1,0],[0,0,0]]
 * 输出：2
 * 解释：3x3 网格的正中间有一个障碍物。
 * 从左上角到右下角一共有 2 条不同的路径：
 * 1. 向右 -> 向右 -> 向下 -> 向下
 * 2. 向下 -> 向下 -> 向右 -> 向右
 * 题目理解:
 * 动态规划，初始化二维数组
 * 定义最左边，最上边为1，遇到障碍为0,这个位置往后的位置都是0
 * 
 */
var uniquePathsWithObstacles = function (obstacleGrid) {
  const m = obstacleGrid.length;
  const n = obstacleGrid[0].length;
  const dp = Array(m)
      .fill()
      .map((item) => Array(n).fill(0)); //初始状态数组

  for (let i = 0; i < m && obstacleGrid[i][0] === 0; ++i) {
      dp[i][0] = 1;//初始状态数组第一列
  }

  for (let i = 0; i < n && obstacleGrid[0][i] === 0; ++i) {
      dp[0][i] = 1;//初始状态数组第一行
  }

  for (let i = 1; i < m; ++i) {
      for (let j = 1; j < n; ++j) {
          dp[i][j] = obstacleGrid[i][j] === 1 ? 0 : dp[i - 1][j] + dp[i][j - 1];//遇到障碍物的情况
      }
  }

  return dp[m - 1][n - 1];
};
console.log(uniquePathsWithObstacles([[0, 0, 0], [0, 1, 0], [0, 0, 0]])); // 2