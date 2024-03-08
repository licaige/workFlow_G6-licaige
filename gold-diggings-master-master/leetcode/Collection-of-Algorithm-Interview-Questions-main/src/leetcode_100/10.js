/**
 * 正则表达式匹配HOT
 * https://leetcode-cn.com/problems/regular-expression-matching/
 * @param {*} s 
 * @param {*} p 
 * @returns 
 */
var isMatch = function(s, p) {
  if (s == null || p == null) return false;
  const m = s.length;
  const n = p.length;
  // 表示s从0到i和p从0到j是否匹配，默认填充false
  const dp = Array.from(new Array(m+1), item => new Array(n+1).fill(false));
  
  // 当s和p都是空串时肯定匹配的
  dp[0][0] = true;
  // s为空串，p只有最右侧为*号的情况下，去掉第j-2个字符
  for(let j = 1; j <= n; j++) {
      if (p[j-1] === '*') dp[0][j] = dp[0][j-2];
  }

  for(let i = 1; i <= m; i++) {
      for(let j = 1; j <= n; j++) {
          // 匹配s和p都是从最后一位往前去匹配，这样根据前一个状态得到当前状态
          // 如果s和p的前一个字符相等或者是p的前一个字符是"."
          if (s[i-1] === p[j-1] || p[j-1] === '.') {
              dp[i][j] = dp[i-1][j-1];
          } else if (p[j-1] === '*') {
              if (s[i-1] === p[j-2] || p[j-2] === '.') {
                  dp[i][j] = dp[i][j-2] || dp[i-1][j-2] || dp[i-1][j];
              } else {
                  dp[i][j] = dp[i][j-2];
              }
          }
      }
  }
  return dp[m][n];
};