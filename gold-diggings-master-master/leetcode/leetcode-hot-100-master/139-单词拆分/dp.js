/*
 * @lc app=leetcode.cn id=139 lang=javascript
 *
 * [139] 单词拆分
 */

// @lc code=start
/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 */

// 动态规划
// 判断细小单词是否在字典里
// 如果在则去判断 rest 是否在词典
// 最重要的是保存每一次的状态
var wordBreak = function (s, wordDict) {
  const wordSets = new Set(wordDict);
  const n = s.length;
  const dp = new Array(n + 1).fill(false);
  dp[0] = true;

  for (let i = 1; i < n + 1; i++) {
    for (let j = 0; j < i; j++) {
      if (dp[j] && wordSets.has(s.slice(j, i))) {
        dp[i] = true;
      }
    }
  }

  return dp[n];
};
// @lc code=end
