/**
 * 回文子川HOT
 * https://leetcode.cn/problems/palindromic-substrings
 * @param {string} s
 * @return {number}
 */
/* SOLUTION 中心拓展法 */ 
 var countSubstrings = function(s) {
  /**
      aaba为例
      0 0 0 0/2=0 0+0%2=0
      1 0 1 1/2=0 0+1%2=1
      2 1 1 2/2=1 1+2%2=0
      3 1 2 3/2=1 1+3%2=1
      4 2 2
      5 2 3
      6 3 3
      所以总共就是2*4-1=7
   */
  const n = s.length;
  let ans = 0;

  // 考虑中心存在1个字符或者两个字符的情况，那么总共就会有2n-1种中心的情况
  for (let i = 0; i < 2 * n - 1; i++) {
      // 左右中心节点的边界如上计算可得
      let l = Math.floor(i / 2);
      let r = l + i % 2;
      while (l >= 0 && r < n && s[l] === s[r]) {
          l--;
          r++;
          ans++;
      }
  }
  return ans;
};

console.log(countSubstrings('aaba'));
