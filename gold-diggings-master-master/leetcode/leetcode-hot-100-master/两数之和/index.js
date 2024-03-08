/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 * https://leetcode.cn/problems/two-sum/
 *
 * 给定一个整数数组 nums 和一个整数目标值 target，请你在该数组中找出 和为目标值 target  的那 两个 整数，并返回它们的数组下标。
你可以假设每种输入只会对应一个答案。但是，数组中同一个元素在答案里不能重复出现。
你可以按任意顺序返回答案。

示例 1：

输入：nums = [2,7,11,15], target = 9
输出：[0,1]
解释：因为 nums[0] + nums[1] == 9 ，返回 [0, 1] 。

 */
var twoSum = function (nums, target) {
  const map = new Map();
  // 第一步构建 map
  for (let index = 0; index < nums.length; index++) {
    const element = nums[index];
    map.set(element, index);
  }
  // 第二步遍历，判断 target - el 是否在 map 中
  for (let index = 0; index < nums.length; index++) {
    const restIndex = map.get(target - nums[index]);
    if (restIndex && restIndex !== index) {
      return [index, restIndex];
    }
  }
  return [];
};
/**
 * 思路：
 * 1、a + b = target 构建 a b 的 map
 * 2、如果遍历到a 的时候能在 map 中找到 b 则证明 a + b = target
 */
