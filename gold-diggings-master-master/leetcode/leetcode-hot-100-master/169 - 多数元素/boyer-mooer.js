/*
 * @lc app=leetcode.cn id=169 lang=javascript
 *
 * [169] 多数元素
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var majorityElement = function(nums) {

    

    // 设最多的数为 1
    // 非最多的数为 -1
    // 先假设一个数为 最多的数
    // count = 0 就假设当前遍历的值为最多数
    // 最后 的 ans 就是最多数
    let ans = null
    let count = 0;
 
    for (let i = 0; i < nums.length; i++) {
     
     if(count===0){
         ans = nums[i]
         count =1
     }else {
         if(ans === nums[i]){
             count++
         }else {
             count--
         }
     }
     
    }
    return ans
 
 };
 // @lc code=end
 
 