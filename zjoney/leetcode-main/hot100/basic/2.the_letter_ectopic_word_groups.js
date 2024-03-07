/**
 * 考察：字符串
 * @difficulty中等
 * @summary: 49.字母异位词分组
 * 给你一个字符串数组，请你将 字母异位词 组合在一起。可以按任意顺序返回结果列表。
 * 字母异位词 是由重新排列源单词的字母得到的一个新单词，所有源单词中的字母通常恰好只用一次。
 * 输入: strs = ["eat", "tea", "tan", "ate", "nat", "bat"]
 * 输出: [["bat"],["nat","tan"],["ate","eat","tea"]]
 * 题目理解：
 * 1、创建一个对象map
 * 2、循环传入的数组，取到的每一个值分别单独作为map的key、value
 * 3、给每一个key值升序转字符串，每一个value放在数组list
 */
var groupAnagrams = function (strs) {
  
  const map = new Map();debugger;
  for (let str of strs) {
    let array = Array.from(str);
    array.sort();
    let key = array.toString();
    let list = map.get(key) ? map.get(key) : new Array();
    list.push(str);
    map.set(key, list);
  }
  return Array.from(map.values());
}; 
const strs = ["tan", "bat", "nat"];
// console.log(groupAnagrams(strs));// [["tan", "nat"], ["bat"]]
groupAnagrams(strs) 
