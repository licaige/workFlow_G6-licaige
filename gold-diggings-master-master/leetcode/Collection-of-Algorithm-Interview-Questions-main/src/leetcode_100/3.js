/**
 * 无重复字符的最长子串HOT
 * https://leetcode-cn.com/problems/longest-substring-without-repeating-characters/
 * @param {*} s 
 */
// 滑动窗口
var lengthOfLongestSubstring = function(s) {
  // 设置窗口右边的指针，左边指针是每次循环的遍历i
  let rp = -1, maxLen = 0;
  const len = s.length;
  // 利用Set结构判断字符是否重复
  const memo = new Set();
  for(let i = 0; i < len; i++) {
    // 每次窗口往右移动，那么则将窗口左边的移除窗口
    // 第一次遍历不需要移动窗口，所以排除i !== 0的情况
    if (i !== 0) {
      memo.delete(s[i - 1]);
    }
    // 窗口长度扩大条件就是窗口中不含重复的值
    while (rp + 1 < len && !memo.has(s[rp + 1])) {
      memo.add(s[rp + 1]);
      rp++;
    }
    maxLen = Math.max(maxLen, rp - i + 1);
  }
  return maxLen;
};

console.log(lengthOfLongestSubstring('abcabcbb'));
