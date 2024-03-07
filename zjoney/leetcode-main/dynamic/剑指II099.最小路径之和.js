
/**
 * 考察：动态规划
 * @difficulty中等
 * @summary: 剑指 Offer II 099. 最小路径之和
 * 给定一个包含非负整数的 m x n 网格 grid ，请找出一条从左上角到右下角的路径，使得路径上的数字总和为最小。
说明：一个机器人每次只能向下或者向右移动一步。
如图：2.sum_of_minimum_path.jpg
输入：grid = [[1,3,1],[1,5,1],[4,2,1]]
输出：7
解释：因为路径 1→3→1→1→1 的总和最小。
题目理解：
路径的方向只能是向下或向右。
最小路径和主要是，其元素上方相邻元素、其元素左边相邻元素取两个元素最小值，加上当前元素
动态规划结果返回：dp[m-1][n-1]

 */
const minPathSum = function(arr){
  let m = arr.length;
  let n = arr[0].length;
  if (m <= 0 || n <= 0) return 0;
 debugger
  const dp = new Array(m).fill(0).map(() => new Array(0).fill(n)); // 
  // 初始化
  dp[0][0] = arr[0][0];
  // 初始化第一行、第一列
  for (let j = 1; j < n; j++) dp[0][j] = dp[0][j - 1] + arr[0][j];
  for (let i = 1; i < m; i++) dp[i][0] = dp[i - 1][0] + arr[i][0];
  // 推导出 dp[m-1][n-1]
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1]) + arr[i][j];
    }
  }
  return dp[m - 1][n - 1];
}

console.log(minPathSum([[1, 3, 1], [1, 5, 1], [4, 2, 1]])) // 7