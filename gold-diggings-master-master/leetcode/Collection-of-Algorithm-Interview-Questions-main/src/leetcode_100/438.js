/**
 * 找到字符串中所有字母异位词
 * https://leetcode-cn.com/problems/find-all-anagrams-in-a-string/
 * @param {*} s 
 * @param {*} p 
 * @returns 
 */
var findAnagrams = function(s, p) {
  /**
      滑动窗口
      i = 0,j = 2,len = 3
      如果当前窗口中存在不属于p的字符，直接跳过
   */
  const m = s.length;
  const n = p.length;

  if (m < n) return [];

  // 使用26个字母记录当前字符的位置，0表示当前位置的字符个数
  const sCount = new Array(26).fill(0);
  const pCount = new Array(26).fill(0);

  const ans = [];

  // 先判断n个字符是否匹配
  for (let i = 0; i < n; i++) {
      ++sCount[s[i].charCodeAt() - 'a'.charCodeAt()];
      ++pCount[p[i].charCodeAt() - 'a'.charCodeAt()];
  }

  if (sCount.toString() === pCount.toString()) {
      ans.push(0);
  }

  for (let i = 0; i < m - n; i++) {
      // 移动窗口，取消上一步记录的字符个数
      --sCount[s[i].charCodeAt() - 'a'.charCodeAt()];
      // 判断前n个后的字符是否匹配
      ++sCount[s[i + n].charCodeAt() - 'a'.charCodeAt()];

      if (sCount.toString() === pCount.toString()) {
          ans.push(i + 1);
      }
  }

  return ans;
};

console.log(findAnagrams('cbaebabacd','abc'));
