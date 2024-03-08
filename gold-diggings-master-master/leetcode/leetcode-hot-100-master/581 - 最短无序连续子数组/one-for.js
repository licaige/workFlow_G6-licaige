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

    // 假设有 a b c 三个序列
    // a 的最大值 小于 b c 的最小值大于 b

    // 从左至右依次记录最大值，如果遇到小于最大值的，说明需要改变顺序，直到再也遇不到比这个值小的
    // 从右边记录最小值，如果遇到比这个值大的，就说明需要改变顺序，直到遇到的都是比自己小的

    let left = nums.length-1;
    let right = 0
    let min = nums[left];
    let max = nums[right]


    for (let i = 1; i < nums.length; i++) {
        
        if(nums[nums.length-i-1]<= min){
            min = nums[nums.length-i-1]
        }else {
            left = nums.length-i-1
        }

        if(nums[i]>=max){
            max = nums[i]
        }else {
            right = i
        }
       
    }

    if(left>=right){
        return 0
    }
    return right-left+1
    
   
};
// @lc code=end

