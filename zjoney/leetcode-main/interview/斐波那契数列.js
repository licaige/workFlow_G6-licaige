/**
 * 斐波那契数列
 * 从第3项开始，当前项等于前两项之和：1 1 2 3 5 8 13 21 ……，计算第n项的值
 * 输入10输出89
 */
function fib(n) {
  // 使用dp数组，将之前计算的结果存起来，防止栈溢出
  if (n < 2) return 1;
  let dp = [1, 1];
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }
  return dp[n];
}
console.log(fib(10));