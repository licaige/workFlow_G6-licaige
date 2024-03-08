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

    // 用 map 存储每一个数的数量，记录出现最多的
    const map = new Map();
    let max = 1
    let ans = nums[0]

    for (let i = 0; i < nums.length; i++) {
        
        if(map.has(nums[i])){
            const num = map.get(nums[i]);
            map.set(nums[i],num+1);
            if(num+1>max){
                max = num+1
                ans = nums[i]
            }
        }else {
            map.set(nums[i],1)
        }

    }

    return ans

};
// @lc code=end

