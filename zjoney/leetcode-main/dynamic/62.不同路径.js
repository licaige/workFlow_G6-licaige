
/**
 * 考察：动态规划
 * @difficulty中等
 * @summary: 62. 不同路径
 * 一个机器人位于一个 m x n 网格的左上角 （起始点在下图中标记为 “Start” ）。
   机器人每次只能向下或者向右移动一步。机器人试图达到网格的右下角（在下图中标记为 “Finish” ）。
   问总共有多少条不同的路径
   如图：images/1.different_paths.png
 * 输入：m = 3, n = 7
 * 输出：28
 * 题目理解:
 * 满足动态规划方程dp[m-1][n-1]
 * i和j的范围分别是 [0, m] 和 [0, n]
 * 每一步只能从向下或者向右移动一步,因此就是 (i-1, j)或者从(i, j-1)走过来
 * 因此得出dp[i,j]=dp[i−1,j]+dp[i,j−1]
 * 
 */
 var uniquePaths = function(m, n){
  // 1定义数组含义
  debugger
  let dp = new Array(m).fill(0).map(() => new Array(n).fill(0));
  // 2 找出关系数组元素间的关系式
  for (let j = 0; j < n; j++) dp[0][j] = 1;
  for (let i = 0; i < m; i++) dp[i][0] = 1;
  // 3找出初始值
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
    }
  }
  return dp[m - 1][n - 1];
}
console.log(uniquePaths(3, 7)) // 28