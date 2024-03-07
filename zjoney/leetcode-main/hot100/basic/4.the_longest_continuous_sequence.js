/**
 * 考察: 哈希集/数组
 * @difficulty中等
 * @summary:128. 最长连续序列
 * 给定一个未排序的整数数组 nums ，找出数字连续的最长序列（不要求序列元素在原数组中连续）的长度。
 * 请你设计并实现时间复杂度为 O(n) 的算法解决此问题。
 * 示例 1：s
 * 输入：nums = [100,4,200,1,3,2] 
 * 输出：4
 * 解释：最长数字连续序列是 [1, 2, 3, 4]。它的长度为 4。
 * 题目理解：
 * 使用Set结构，方便查找与删除；
 * 同一段连续序列内的数值，他们的最长连续序列长度是一样的，所以剩余的都删除；
 * 计数，同时也可计算长度 cur - value -1；

 */
var longestConsecutive = function (nums) {
   debugger;
  //  把题目中数组的数字全部放入set中，一来去重，二来方便快速查找；
  let num_set = new Set();
  for (const num of nums) {
    num_set.add(num);
  }

  let longestStreak = 0;

  for (const num of num_set) {
    // 没有左邻居，是序列的起点
    if (!num_set.has(num - 1)) {
      let currentNum = num;
      let currentStreak = 1;
      // 有右邻居，看连续的右邻居有多少个
      while (num_set.has(currentNum + 1)) {
        currentNum += 1;
        currentStreak += 1;
      }
      // 存放最大的连续邻居的值
      longestStreak = Math.max(longestStreak, currentStreak);
    }
  }
  return longestStreak;
}
const nums = [100, 4, 200, 3, 2];
console.log(longestConsecutive(nums)); // 3
// longestConsecutive(nums)