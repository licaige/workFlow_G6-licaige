/**
 * 最长回文子串HOT
 * https://leetcode-cn.com/problems/longest-palindromic-substring/
 * @param {*} s 
 */
// 1. 动态规划
var longestPalindrome = function(s) {
  const n = s.length;
  const dp = Array.from(new Array(n), () => new Array(n).fill(0));
  let ans = '';
  for(let l = 0; l < n; l++) {
    for(let i = 0; i + l < n; i++) {
      const j = i + l;
      // 表示i,j相等，那么从i到j得到的字符串长度为1，肯定是回文
      if (l === 0) {
        dp[i][j] = true;
      } else if (l === 1) {
        // 表示从i,i+1的长度为2的字符串，只有两个字符相等才是回文
        dp[i][j] = s[i] === s[j];
      } else {
        // 表示i+1,j-1范围的字符串，只有i，j下标的字符相等时，才是回文
        dp[i][j] = (s[i] === s[j]) && dp[i+1][j-1];
      }
      // 如果从i到j截取的字符比结果字符串ans的长度要长，并且是个回文串，那么更新结果字符串
      // 注意l+1就是从i截取到j的字符串的长度
      if (dp[i][j] && l + 1 > ans.length) {
        ans = s.slice(i, i + l + 1);
      }
    }
  }
  return ans;
};

// 2.中心扩展
// 以一个字符或者两个字符作为中心往外扩展
// 如果两边扩展的字符是相同的，那么继续扩展，否则不是回文，则停止扩展
var longestPalindrome = function(s) {
  const n = s.length;
  let start = 0, end = 0;

  const expandAround = (l, r) => {
      while (l >= 0 && r < n && s[l] === s[r]) {
          l--;
          r++;
      }
      // 扩展方法得到的l,r实际是不满足回文串以后的两边位置
      // 所以并不是r-l+1,而是r-l-1
      return r - l - 1;
  }

  for(let i = 0; i < n; i++) {
      const len1 = expandAround(i, i);
      const len2 = expandAround(i, i+1);
      const maxLen = Math.max(len1,len2);
      if (maxLen > end - start) {
          // 如果以两个字符为中心扩展的情况，如字符串cbb，以bb为中，得到长度为2,
          // 1-(2-1)/2 = 1 否则的话则变成1-2/2 = 0，结果就不正确
          start = i - Math.floor((maxLen - 1) / 2);
          end = i + Math.floor(maxLen / 2);
      }
  }
  return s.slice(start, end + 1);
};

console.log(longestPalindrome("babad"));
