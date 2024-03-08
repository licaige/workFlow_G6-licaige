/*
 * @lc app=leetcode.cn id=11 lang=javascript
 *
 * [11] 盛最多水的容器
 */

// @lc code=start
/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function (height) {
  let max = 0;

  // 建立两个指针，一前一后
  let i = 0;
  let j = height.length - 1;

  // 如果 j<=i 就退出
  while (i < j) {
    if (height[i] >= height[j]) {
      max = Math.max(max, height[j] * (j - i));
      // 如果右边小，就左移
      j--;
    } else {
      max = Math.max(max, height[i] * (j - i));
      // 如果左边边小，就右移
      i++;
    }
  }

  return max;
};
maxArea;
// @lc code=end
