/*
 * @lc app=leetcode.cn id=55 lang=javascript
 *
 * [55] 跳跃游戏
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canJump = function (nums) {

    const dp = new Array(nums.length).fill(false);

    dp[0] = true;


    for (let i = 1; i < nums.length; i++) {


        for (let j = 0; j < i; j++) {
            if (dp[j] && nums[j] >= i - j) {
                dp[i] = true;
                break
            }
        }

    }



    return dp[dp.length - 1]

};
// @lc code=end

