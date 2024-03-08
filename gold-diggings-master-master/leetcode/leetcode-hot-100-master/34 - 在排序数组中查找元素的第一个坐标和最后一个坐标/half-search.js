/*
 * @lc app=leetcode.cn id=34 lang=javascript
 *
 * [34] 在排序数组中查找元素的第一个和最后一个位置
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var searchRange = function (nums, target) {
  const n = nums.length;

  const dfs = (i, j) => {
    if (j < i) {
      return -1;
    }
    const mid = parseInt((i + j) / 2);

    if (nums[mid] < target) {
      return dfs(mid + 1, j);
    } else if (nums[mid] > target) {
      return dfs(i, mid - 1);
    } else {
      return mid;
    }
  };

  let ans = dfs(0, n - 1);
  if (ans === -1) {
    return [-1, -1];
  }
  console.log(ans);
  let i = ans;
  let j = ans;
  while (nums[i - 1] === target || nums[j + 1] === target) {
    if (nums[i - 1] === target) {
      i--;
    }
    if (nums[j + 1] === target) {
      j++;
    }
  }
  return [i, j];
};
searchRange;
// @lc code=end
