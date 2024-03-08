/**
 * 爬楼梯HOT
 * https://leetcode.cn/problems/climbing-stairs/
 * @param {number} n
 * @return {number}
 */
 var climbStairs = function(n) {
  /**
      分析：
      1. 典型的动态规划思路
      2. 当前n个台阶的为dp[n]，那么最后一步走2个台阶为dp[n-1]，走一个台阶则为dp[n-2];
      3. 所以dp[n]的走法从dp[n-1]或者dp[n-2]转移而来，走法就是两者的和
      4. 基础条件：台阶为1，走法只有1种，为2，为2种
   */
  let p = 0, q = 0, r = 1;
  for (let i = 1; i <= n; i++) {
      p = q;
      q = r;
      r = p + q;
  }
  return r;
};
