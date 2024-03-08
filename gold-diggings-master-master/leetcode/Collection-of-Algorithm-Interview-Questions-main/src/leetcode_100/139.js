/**
 * 单词拆分HOT
 * https://leetcode-cn.com/problems/word-break/
 * @param {*} s 
 * @param {*} wordDict 
 * @returns 
 */
var wordBreak = function(s, wordDict) {
  // 使用动态规划解法
  const memo = new Set(wordDict);
  const n = s.length;
  // 定义数组，数组每一项表示到当前索引的字符串，也就是[0,当前位置]的字符串在字典中
  const dp = new Array(n+1).fill(false);
  dp[0] = true;
  for (let i = 1; i <= n; i++) {
    for (let j = 0; j < i; j++) {
      // 把0,i的字符串在j位置进行分割，如果[0,j]和[j,i]两部分的字符串都在字典中，那么拼接出来的字符串也符合要求
      if (dp[j] && memo.has(s.slice(j, i))) {
        dp[i] = true;
        break;
      }
    }
  }
  return dp[n];
};

console.log(wordBreak("l", ["leet", "code"]));

moduLe.exports = wordBreak;
