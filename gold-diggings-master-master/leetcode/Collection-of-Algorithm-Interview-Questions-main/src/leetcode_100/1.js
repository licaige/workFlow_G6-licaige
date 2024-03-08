/**
 * 两数之和HOT
 * https://leetcode-cn.com/problems/two-sum/
 * @param {*} nums 
 * @param {*} target 
 * @returns 
 */
var twoSum = function(nums, target) {
  // 1. hash表，备忘录
  const memo = new Map();
  for(let i = 0; i < nums.length; i++) {
    // 判断目标值减去当前项得到的差值是否在备忘录中
    const remaining = target - nums[i];
    if (memo.get(remaining)) {
      return [memo.get(remaining), i];
    }
    // 如果不在备忘录中，记录当前项的值以及索引
    memo.set(nums[i], i);
  }
  return [];
}

// 2. 暴力遍历

module.exports = twoSum;
