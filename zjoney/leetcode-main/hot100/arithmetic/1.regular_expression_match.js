/**
 * 考察：动态规划
 * @difficulty困难
 * @summary:10.正则表达式匹配
 * 给你一个字符串 s 和一个字符规律 p，请你来实现一个支持 '.' 和 '*' 的正则表达式匹配。'.' 匹配任意
 * 单个字符, '*' 匹配零个或多个前面的那一个元素。所谓匹配，是要涵盖 整个 字符串 s的，而不是部分字符串。
 * 示例：
 * 输入：s = "aa", p = "a"
 * 输出：false
 * 解释："a" 无法匹配 "aa" 整个字符串。
情况1：s[i-1]s[i−1] == p[j-1]p[j−1] 是匹配的，考察dp[i][j] = dp[i - 1][j - 1];
情况2：s[i-1]s[i−1] 和 p[j-1]p[j−1] 是不匹配的
p[j-1]p[j−1] 是星号，p[j - 1] == "*"，不匹配不算数
  p[j−1]=="∗"，且 s[i-1]s[i−1] 和 p[j-2]p[j−2] 匹配，
    、、、*让p-2重复0次得出dp[i][j - 2] 
    、、、*让p-2重复1次得出dp[i - 1][j - 2] || 
    、、、*让p-2重复>=2次得出dp[i - 1][j]
  p[j−1]=="∗"，但 s[i-1]s[i−1] 和 p[j-2]p[j−2] 不匹配， 得出dp[i][j] = dp[i][j - 2]; 
p[j-1]p[j−1] 不是星号，那就真的不匹配了
 
 */
const isMatch = (s, p) => {
  if (s == null || p == null) return false;
  debugger
  const sLen = s.length, pLen = p.length;

  const dp = new Array(sLen + 1);
  for (let i = 0; i < dp.length; i++) {
    dp[i] = new Array(pLen + 1).fill(false); // 将项默认为false
  }
  // base case
  dp[0][0] = true;
  for (let j = 1; j < pLen + 1; j++) {
    if (p[j - 1] == "*") dp[0][j] = dp[0][j - 2];
  }
  // 迭代
  for (let i = 1; i < sLen + 1; i++) {
    for (let j = 1; j < pLen + 1; j++) {

      if (s[i - 1] == p[j - 1] || p[j - 1] == ".") {
        dp[i][j] = dp[i - 1][j - 1];
      } else if (p[j - 1] == "*") {
        if (s[i - 1] == p[j - 2] || p[j - 2] == ".") {
          dp[i][j] = dp[i][j - 2] || dp[i - 1][j - 2] || dp[i - 1][j];
        } else {
          dp[i][j] = dp[i][j - 2];
        }
      }
    }
  }
  return dp[sLen][pLen]; // 长sLen的s串 是否匹配 长pLen的p串
};

const s = "aa", p = "a";
console.log(isMatch(s, p));