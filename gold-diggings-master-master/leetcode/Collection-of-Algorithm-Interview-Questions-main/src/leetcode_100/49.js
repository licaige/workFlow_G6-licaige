/**
 * 字母异位词分组HOT
 * https://leetcode-cn.com/problems/group-anagrams/
 * @param {*} strs 
 */
var groupAnagrams = function(strs) {
  const memo = {};
  for (let str of strs) {
    const key = str.split('').sort().join('');
    memo[key] ? memo[key].push(str) : (memo[key] = [str]);
  }
  return Object.values(memo);
};

// 使用26个字母计数
var groupAnagrams = function(strs) {
  const memo = {};
  for (let s of strs) {
    // 使用每个字符在ascii表中的位置来作为hash表的key
    const count = new Array(26).fill(0);
    for (let ch of s) {
      count[ch.charCodeAt() - 'a'.charCodeAt()]++;
    }
    memo[count] ? memo[count].push(s) : memo[count] = [s];
  }
  return Object.values(memo);
}

const data = ["eat","tea","tan","ate","nat","bat"];
console.log(groupAnagrams(data));
