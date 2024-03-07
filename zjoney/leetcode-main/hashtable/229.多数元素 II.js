
/** 
 * 考察：哈希表
 * @difficulty中等
 * @summary:229. 多数元素 II
 * 给定一个大小为 n 的整数数组，找出其中所有出现超过 ⌊ n/3 ⌋ 次的元素。
示例 1：
输入：nums = [3,2,3]
输出：[3]

题目理解:先遍历数组每一项，存储至Map中。
不存在，则该项置为1，存在，获取该项的值，且加1。
求出操作边界值seperateLine，数组 nums除以3，并用 Math.floor 求整。
遍历Map，使用entries方法，遍历每一项，如果 value > seperateLine；将对应的值放到结果数组中。
返回结果数组中。
 */
// var majorityElement = function(nums) {
//   const cnt = new Map();

//   for (let i = 0; i < nums.length; i++) {
//       if (cnt.has(nums[i])) {
//           cnt.set(nums[i], cnt.get(nums[i]) + 1);
//       } else {
//           cnt.set(nums[i], 1);
//       }
//   }
//   const ans = [];
//   for (const x of cnt.keys()) {
//       if (cnt.get(x) > Math.floor(nums.length / 3)) {
//           ans.push(x);
//       }
//   }

//   return ans;
// };

/**
 * 方法2
 * @param {*} nums 
 */
var majorityElement = function (nums) {
  let map = new Map();
  let len = nums.length;

  for (let i = 0; i < len; i++) {
    map.set(nums[i], map.has(nums[i]) ? map.get(nums[i]) + 1 : 1)
  }
  let seperateLine = Math.floor(len / 3)
  const res = [];
  for (let [key, value] of map.entries()) {
    if (value > seperateLine) {
      res.push(key)
    }
  }

  return res;
};
console.log(majorityElement([3, 2, 3])); //3