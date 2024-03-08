/*
 * @lc app=leetcode.cn id=78 lang=javascript
 *
 * [78] 子集
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[][]}
 */

// 1、递归
// 2、[1,2,3] 的子集等于 [1,2]子集 + [1,2]子集每一项 & 3
var subsets = function (nums) {
  if (!nums.length) {
    return [[]];
  }
  const res = [];
  const last = subsets(nums.slice(0, nums.length - 1));
  last.forEach((_) => {
    res.push(_);
    res.push([..._, nums[nums.length - 1]]);
  });
  return res;
};
// @lc code=end
