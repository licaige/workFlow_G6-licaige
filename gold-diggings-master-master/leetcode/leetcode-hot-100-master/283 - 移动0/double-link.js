/*
 * @lc app=leetcode.cn id=283 lang=javascript
 *
 * [283] 移动零
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = function(nums) {

    // left 是把 非 0 的记录
    let left = 0;
    let right = 0;

    while(right<nums.length){

        if(nums[right]){
            // 找到非 0 ，给 left 填充上
            nums[left] = nums[right];
            left++
        }
        right++
    }
    // 遍历完一次，剩下的都是 0 了

    while(left<nums.length){
        nums[left] = 0
        left++
    }





};
// @lc code=end

