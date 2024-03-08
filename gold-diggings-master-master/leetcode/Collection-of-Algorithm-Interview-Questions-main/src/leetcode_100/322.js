/**
 * 零钱兑换HOT
 * https://leetcode.cn/problems/coin-change/description/
 * @param {*} coins
 * @param {*} amount
 */
var coinChange = function(coins, amount) {
  // 动态规划
  // 以金额作为状态转移的记录
  const n = coins.length;
  const max = amount + 1;
  const dp = new Array(max).fill(max);
  // 表示金额为0时，无法凑出硬币
  dp[0] = 0;
  for (let i = 1; i <= amount; i++) {
    for (let j = 0; j < n; j++) {
      // 如果当前硬币的面值小于当前金额
      if (coins[j] <= i) {
        // 取所有硬币取法当中使用硬币最少的那个
        dp[i] = Math.min(dp[i], dp[i - coins[j]] + 1);
      }
    }
  }

  return dp[amount] > amount ? -1 : dp[amount];
}
