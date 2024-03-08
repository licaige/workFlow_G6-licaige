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

// 迭代法
// 从左至右依次遍历
// 每次保存子集结果给下次使用
// why? 迭代没有递归好
var subsets = function (nums) {
  if (!nums.length) {
    return [[]];
  }
  const res = [[]];
  let temp = res;

  for (let i = 0; i < nums.length; i++) {
    temp.forEach((_) => {
      res.push([..._, nums[i]]);
    });
    temp = res;
  }

  return res;
};
// @lc code=end
