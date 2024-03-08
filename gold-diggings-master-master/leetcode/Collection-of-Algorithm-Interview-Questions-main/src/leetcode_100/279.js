/**
 * 完全平方数
 * https://leetcode-cn.com/problems/perfect-squares/
 * @param {*} n
 * @returns
 */
// 1.动态规划
var numSquares = function(n) {
  // dp[i] 表示和为i的完全平方数的最小个数
  // 对于j，有 1 <= j * j <= i，尝试从[1, i]枚举出和为i的最小完全平方数(Σ(1,i)dp[i-j*j])+1
  const dp = new Array(n + 1).fill(0);
  dp[0] = 0;
  for (let i = 1; i <= n; i++) {
      // 假设当前和为i时，需要的个数为最多的情况
      dp[i] = Number.MAX_SAFE_INTEGER;
      for (let j = 1; j * j <= i; j++) {
          dp[i] = Math.min(dp[i], dp[i-j*j] + 1);
      }
  }
  return dp[n];
};

// 2. 数学公式推导：四平方和定理
var numSquares = function(n) {
  // 判断是否是完美平方数
  const isPerfectNum = x => {
    const y = Math.floor(Math.sqrt(x));
    return y * y === x;
  };

  // 判断是否满足公式4^k * (8m + 7)
  const isCheck4 = x => {
    while (x % 4 === 0) {
      x /= 4;
    }
    return x % 8 === 7;
  };

  if (isPerfectNum(n)) return 1;
  if (isCheck4(n)) return 4;
  for (let i = 1; i * i <= n; i++) {
    let j = n - i * i;
    if (isPerfectNum(j)) return 2;
  }
  return 3;
};
