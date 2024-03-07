/**
 * 考察：动态规划
 * @difficulty困难
 * @summary:312. 戳气球
 * 有 n 个气球，编号为0 到 n - 1，每个气球上都标有一个数字，这些数字存在数组 nums 中。
 * 现在要求你戳破所有的气球。戳破第 i 个气球，你可以获得 nums[i - 1] * nums[i] * nums[i + 1] 枚硬币。 
 * 这里的 i - 1 和 i + 1 代表和 i 相邻的两个气球的序号。如果 i - 1或 i + 1 超出了数组的边界，
 * 那么就当它是一个数字为 1 的气球。求所能获得硬币的最大数量。
 * 
 * 示例一：
 * 输入：nums = [3,1,5,8]
 * 输出：167
 * 解释：
 * nums = [3,1,5,8] --> [3,5,8] --> [3,8] --> [8] --> []
 * coins =  3*1*5    +   3*5*8   +  1*3*8  + 1*8*1 = 167
 */

/**方法二
 * @param {number[]} nums
 * @return {number}
 */
 var maxCoins = function (nums) {
  let n = nums.length;
  // 添加两侧的虚拟气球
  let points = new Array(n + 2);
  points[0] = points[n + 1] = 1;
  for (let i = 1; i <= n; i++) {
    points[i] = nums[i - 1];
  }
  debugger
  // base case 已经都被初始化为 0
  let dp = new Array(n + 2).fill(0).map(() => new Array(n + 2).fill(0));
  // 开始状态转移
  // i 应该从下往上
  for (let i = n; i >= 0; i--) {
    // j 应该从左往右
    for (let j = i + 1; j < n + 2; j++) {
      // 最后戳破的气球是哪个？
      for (let k = i + 1; k < j; k++) {
        // 择优做选择
        dp[i][j] = Math.max(
          dp[i][j],
          dp[i][k] + dp[k][j] + points[i] * points[j] * points[k]
        );
      }
    }
  }
  return dp[0][n + 1];
};

/**
 * 方法一
 * @param {*} nums 
 * @returns 
 */
var maxCoins = function (nums) {
  debugger
  const n = nums.length;
  let points = [1, ...nums, 1]; //在数组添加虚拟气球 *1还是本身
  const dp = Array.from(Array(n + 2), () => Array(n + 2).fill(0)); //初始化状态数组
  //循环i，j
  for (let i = n; i >= 0; i--) {
    for (let j = i + 1; j < n + 2; j++) {
      for (let k = i + 1; k < j; k++) {
        //枚举k在i和j中的所有可能
        //i-j能获得的最大数量的金币等于 戳破当前的气球获得的金钱加上之前i-k,k-j区间中已经获得的金币
        dp[i][j] = Math.max(
          //用最大值更新dp[i][j]
          dp[i][j],
          dp[i][k] + dp[k][j] + points[j] * points[k] * points[i]
        );
      }
    }
  }
  return dp[0][n + 1];
};
