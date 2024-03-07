
/**
 * 考察：哈希表Map
 * @difficulty中等
 * @summary:451. 根据字符出现频率排序
 * 给定一个字符串 s ，根据字符出现的 频率 对其进行 降序排序 。一个字符出现的 频率 是它出现在字符串中的次数。
 * 输入: s = "tree"
 * 输出: "eert"
解释: 'e'出现两次，'r'和't'都只出现一次。
因此'e'必须出现在'r'和't'之前。此外，"eetr"也是一个有效的答案。
题目理解：
可以使用哈希表记录每个字符出现的频率.
按照频率降序排序.
遍历列表中的每个字符, 按照频率拼接字符串.
 */
// function frequencySort(s) {
//   debugger
//   const map = new Map();
//   const length = s.length;
//   for (let i = 0; i < length; i++) {
//     const c = s[i];
//     const frequency = (map.get(c) || 0) + 1;
//     map.set(c, frequency);
//   }
//   const list = [...map.keys()];
//   list.sort((a, b) => map.get(b) - map.get(a));
//   const sb = [];
//   const size = list.length;
//   for (let i = 0; i < size; i++) {
//     const c = list[i];
//     const frequency = map.get(c);
//     for (let j = 0; j < frequency; j++) {
//       sb.push(c);
//     }
//   }
//   return sb.join('');
// };

var frequencySort = function(s) {
  debugger
  let map = new Map()
  let ans = ''
  for (let w of s) {
    map.set(w, (map.get(w) || 0) + 1)
  }
  map = new Map([...map].sort((a, b) => {
    return b[1] - a[1]
  }))
  for (let [k, v] of map) {
    for (let i = 0; i < v; i++) {
      ans += k
    }
  }
  return ans
};
let str = "abmmKBBt"
console.log(frequencySort(str)); //mmBBabKt