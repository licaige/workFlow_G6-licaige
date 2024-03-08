/*
 * @lc app=leetcode.cn id=3 lang=javascript
 *
 * [3] 无重复字符的最长子串
 */

// 滑动窗口 https://leetcode.cn/problems/longest-substring-without-repeating-characters/solution/hua-dong-chuang-kou-by-powcai/

// 遇到重复的就把重复之前的全部删除掉，继续移动
// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
  let count = 0;

  const stack = [];
  let l = 0;

  for (let i = 0; i < s.length; i++) {
    const ele = s[i];
    l = 0;
    while (l <= stack.length) {
      if (stack[l] === ele) {
        while (l >= 0) {
          stack.shift();
          l--;
        }
        break;
      }
      l++;
    }
    stack.push(ele);
    count = Math.max(count, stack.length);
  }
  return count;
};

lengthOfLongestSubstring();
// @lc code=end
