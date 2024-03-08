/*
 * @lc app=leetcode.cn id=560 lang=javascript
 *
 * [560] 和为 K 的子数组
 */

// 前缀和匹配

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var subarraySum = function (nums, k) {
  let sum = 0;
  let count = 0;
  let target = 0;
  const hash = new Map();
  hash.set(0, 1);
  for (let i = 0; i < nums.length; i++) {
    sum = sum + nums[i];
    target = hash.get(sum - k) || 0;
    if (target) {
      count = count + target;
    }

    // 记录每一个 sum 出现的个数
    hash.set(sum, (hash.get(sum) || 0) + 1);
  }

  return count;
};

subarraySum();
// @lc code=end

// -1 1
// 0 1
