/**
 * 考察：数组 哈希表
 * @difficulty简单
 * @summary: 1.两数之和
 * 给定一个整数数组 nums 和一个整数目标值 target，请你在该数组中找出 和为目标值 target 的那两个整数，
 * 并返回它们的数组下标。
 * 你可以假设每种输入只会对应一个答案。但是，数组中同一个元素在答案里不能重复出现。
 * 你可以按任意顺序返回答案。
 * 示例：
 * 输入：nums = [3,2,4], target = 6
 * 输出：[1,2]
 * 题目理解：
 * 循环数组nums,拿到当前的值
 * 拿到的值存入obj变量里，如果当前的值不在Obj,那么就存obj[target-当前值] = 当前索引，
 * 当前值在obj里，返回数组即[返回之前的索引，当前索引]
 */
// var twoSum = function (nums, target) {
//   let obj = {};
//   for (let i = 0; i < nums.length; i++) {
//     let num = nums[i]
//     if (num in obj) {
//       return [obj[num], i]
//     } else {
//       obj[target - num] = i
//     }
//   }
// };
// const nums = [2, 7, 11, 15], target = 9;
// console.log(twoSum(nums, target));// [0, 1]

const twoSum = (nums, target) => {
  const obj = {};                    // 存储出现过的数字，和对应的索引               

  for (let i = 0; i < nums.length; i++) {       // 遍历元素   
    const num = nums[i];                     // 当前元素   
    const targetNum = target - num;          // 满足要求的目标元素   
    const targetNumIndex = obj[targetNum]; // 在prevNums中获取目标元素的索引
    if (targetNumIndex !== undefined) {         // 如果存在，直接返回 [目标元素的索引,当前索引]
      return [targetNumIndex, i];
    } else {                                    // 如果不存在，说明之前没出现过目标元素
      obj[num] = i;                     // 存入当前的元素和对应的索引
    }
  }
}