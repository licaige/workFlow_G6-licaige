/*
 * @lc app=leetcode.cn id=46 lang=javascript
 *
 * [46] 全排列
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
// 递归方法，将当前的元素与 rest 再结合
var permute = function (nums) {
  if (nums.length === 1) {
    return [[...nums]];
  }
  const res = [];
  for (let i = 0; i < nums.length; i++) {
    permute([...nums.slice(0, i), ...nums.slice(i + 1)]).forEach((_) => {
      res.push([nums[i], ..._]);
    });
  }
  return res;
};
// @lc code=end
