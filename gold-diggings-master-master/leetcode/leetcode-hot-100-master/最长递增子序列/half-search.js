/*
 * @lc app=leetcode.cn id=300 lang=javascript
 *
 * [300] 最长递增子序列
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var lengthOfLIS = function(nums) {

    const stack = [nums[0]];
    let left = 0;
    let right = 0;
    let index = -1

    let mid = 0;

    for (let i = 1; i < nums.length; i++) {
        left = 0;
        right = stack.length-1

        // 二分查找第一个大于等于 nums[i] 的数，如果有就返回坐标，没有就返回 -1
        while(left<=right){
            // == 表示现在只有一个数字
            mid = (left+right)>>1;
            if(stack[mid]<nums[i]){
                left = mid+1
            }else if(stack[mid] === nums[i]){
                if(left === right){
                    // 防止陷入循环
                    left = mid
                    break
                }else {
                    // 如果是找到了 和 nums 相等的数，就往左查找
                    right = mid
                }
                
            }else {
                right = mid -1
            }
        }
        
        if(stack[left]>=nums[i]){
            index = left
        }

        if(index!==-1){
            stack[index] = nums[i]
            index = -1
        }else if(nums[i]>stack[stack.length-1]) {
            stack.push(nums[i])
        }
    }

    return stack.length

};
// @lc code=end



// 2 5 6   5 

// 4 10 4 

