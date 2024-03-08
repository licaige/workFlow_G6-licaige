/*
 * @lc app=leetcode.cn id=136 lang=javascript
 *
 * [136] 只出现一次的数字
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function(nums) {


    // x 和 0 异或 = x；
    // x he x 异或 = 0；
    // 异或满足交换律

    let ans = nums[0];




    for (let i = 1; i < nums.length; i++) {
        
        ans =ans ^ nums[i]
        
    }

    return ans

};
// @lc code=end

