/*
 * @lc app=leetcode.cn id=75 lang=javascript
 *
 * [75] 颜色分类
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var sortColors = function (nums) {
    let p0 = 0;
    let p1 = 0;
    let temp = null;

    for (let i = 0; i < nums.length; i++) {
        if (nums[i] === 1) {
            temp = nums[p1];
            nums[p1] = nums[i];
            nums[i] = temp;
            p1++;
        } else if (nums[i] === 0) {
            temp = nums[p0];
            nums[p0] = nums[i];
            nums[i] = temp;
            if (p1 > p0) {
                temp = nums[p1];
                nums[p1] = nums[i];
                nums[i] = temp;
            }
            p1++;
            p0++;
        }
    }
    return nums
};
sortColors;
// @lc code=end
// 0001111112220

