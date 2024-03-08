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

    // 记录能跳的最远距离
    let maxIndex = 0;

    for (let i = 0; i < nums.length; i++) {



        // 如果当前的坐标比最远距离大，则不可抵达
        if (i > maxIndex) {
            return false
        }

        maxIndex = Math.max(maxIndex, i + nums[i]);

    }



    // 最后拿最远距离和 坐标做对比
    return maxIndex >= nums.length - 1

};
// @lc code=end

