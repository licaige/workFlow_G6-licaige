/*
 * @lc app=leetcode.cn id=152 lang=javascript
 *
 * [152] 乘积最大子数组
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxProduct = function (nums) {


    // 存储当前下标最大值
    const dpMax = new Array(nums.length);


    // 存储当前下标最小值
    const dpMin = new Array(nums.length);


    dpMax[0] = nums[0];
    dpMin[0] = nums[0];

    let ans = nums[0];

    for (let i = 1; i < nums.length; i++) {

        // 有可能当前下标是负数
        // 有可能是正数
        dpMax[i] = Math.max(dpMax[i - 1] * nums[i], Math.max(nums[i], dpMin[i - 1] * nums[i]));

        dpMin[i] = Math.min(dpMin[i - 1] * nums[i], Math.min(nums[i], dpMax[i - 1] * nums[i]));

        ans = Math.max(ans, dpMax[i])

    }

    return ans
};
// @lc code=end

