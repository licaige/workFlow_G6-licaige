/**
 * 第一个不重复的字符串
 * @param {*} str 
 * @returns 
 * 题目：输入一个字符串，找到第一个不重复字符的下标
输入：'abcabcde'
输出：6
 */
function findOneStr(str) {
  if (!str) return -1;
  // 使用map存储每个字符出现的次数
  let map = {};
  let arr = str.split("");
  arr.forEach(item => {
    let val = map[item];
    // val为undefined时，表示未存储，map[item] = 1；否则map[item] = val + 1
    map[item] = val ? val + 1 : 1;
  });
  // 再遍历一遍找到出现1次的下标
  for (let i = 0; i < arr.length; i++) {
    console.log(map, arr[i], map[arr[i]])
    if (map[arr[i]] == 1) {
      return i;
    }
  }
  return -1;
}
const str = 'abcabcde';
console.log(findOneStr(str))// 6