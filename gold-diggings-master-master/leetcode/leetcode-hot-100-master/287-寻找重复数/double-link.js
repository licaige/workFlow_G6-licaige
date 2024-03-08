/*
 * @lc app=leetcode.cn id=287 lang=javascript
 *
 * [287] 寻找重复数
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */

//https://leetcode.cn/problems/find-the-duplicate-number/solution/kuai-man-zhi-zhen-de-jie-shi-cong-damien_undoxie-d/
// 快慢指针
//
var findDuplicate = function (nums) {
  let left = 1;
  let right = nums.length - 1;

  while (left < right) {
    let count = 0;
    let mid = (left + right) / 2;

    for (let i = 0; i < nums.length; i++) {
      if (nums[i] <= mid) {
        count++;
      }
    }
    if (count > mid) {
      right = Math.floor(mid);
    } else {
      left = Math.ceil(mid);
    }
  }
  return left;
};
findDuplicate();

// 1 4 2.5
// 1 2 1.5
// 2 3 2.5
// @lc code=end
