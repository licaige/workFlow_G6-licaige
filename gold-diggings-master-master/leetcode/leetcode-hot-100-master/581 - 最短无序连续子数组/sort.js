/*
 * @lc app=leetcode.cn id=581 lang=javascript
 *
 * [581] 最短无序连续子数组
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var findUnsortedSubarray = function (nums) {
    let newNums = [...nums];
    // 先排序，再两两比较不同
    newNums = newNums.sort((a,b)=>{
        return a-b
    })

    let left = 0;
    let right = nums.length-1;

    while(right>left&& (nums[left]===newNums[left] ||nums[right]===newNums[right] )){
        if(nums[left]===newNums[left]){
            left++
        }
        if(nums[right]===newNums[right]){
            right--
        }
        
    }
    if(right===left){
        return 0
    }


    return right - left +1
};
// @lc code=end

