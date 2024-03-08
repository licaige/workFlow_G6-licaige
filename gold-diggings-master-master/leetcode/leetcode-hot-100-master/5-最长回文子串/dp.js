/*
 * @lc app=leetcode.cn id=5 lang=javascript
 *
 * [5] 最长回文子串
 */

// @lc code=start
/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function (s) {
  // 这里创建一个 二维数组用来存储状态 ij 代表字符串的起始
  const dp = new Array(s.length);
  for (let i = 0; i < dp.length; i++) {
    dp[i] = new Array(s.length);
  }
  // 单个字母肯定是回文，先负值

  for (let i = 0; i < s.length; i++) {
    dp[i][i] = true;
  }

  let start = 0;
  let maxLength = 1;

  for (let i = 1; i < s.length; i++) {
    for (let j = 0; j < i; j++) {
      if (i - j === 1) {
        dp[j][i] = s[i] === s[j];
      } else {
        dp[j][i] = dp[j + 1][i - 1] && s[i] === s[j];
      }

      if (dp[j][i] && i - j + 1 > maxLength) {
        start = j;
        maxLength = i - j + 1;
      }
    }
  }

  return s.slice(start, start + maxLength);
};
// @lc code=end
