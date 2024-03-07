/**
 * 考察：队列、分治、优先队列
 * @difficulty 中等
 * @summary 347. 前 K 个高频元素
 * 给你一个整数数组 nums 和一个整数 k ，
 * 请你返回其中出现频率前 k 高的元素。你可以按 任意顺序 返回答案。
 * 示例 1:

输入: nums = [1,1,1,2,2,3], k = 2
输出: [1,2]
 */
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var topKFrequent = function(nums, k) {
  let result = [];
  let map = new Map();
  //保存nums数组的元素和记录元素的次数
  for (let num of nums) {
      if (map.has(num)) {
          map.set(num, map.get(num) + 1);
      } else {
          map.set(num, 1);
      }
  }
};