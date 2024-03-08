/*
 * @lc app=leetcode.cn id=128 lang=javascript
 *
 * [128] 最长连续序列
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var longestConsecutive = function(nums) {
    if(!nums.length){
        return 0
    }
    let set = new Set()
    let maxLength = 1;

    // 首先先把数组所有数字都放进 hash
    for (let i = 0; i < nums.length; i++) {
        set.add(nums[i])
    }

    let currentLong = 1;

    // 再次遍历数组
    for (let i = 0; i < nums.length; i++) {

        // 如果不是断层的第一个数就不遍历，只有像 12 4567 里面的 1 和 4 才会遍历
        if(!set.has(nums[i]-1)){

            while(set.has(nums[i]+currentLong)){
                currentLong++;
            }
            maxLength = Math.max(maxLength,currentLong)
            currentLong = 1;

        }
        
    }

    return maxLength
};
// @lc code=end

