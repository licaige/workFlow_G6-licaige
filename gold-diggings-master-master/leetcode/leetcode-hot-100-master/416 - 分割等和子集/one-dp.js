/*
 * @lc app=leetcode.cn id=416 lang=javascript
 *
 * [416] 分割等和子集
 * // 背包问题
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canPartition = function(nums) {

    let sum = 0;
    for (let i = 0; i < nums.length; i++) {

        sum = sum+nums[i]
    }
    if(sum%2===1){
        return false
    }else {
        sum = sum/2
    }
    // 创建一维数组存储 dp，dp[i] 表示在 数组中是否找到 和问 i 的数的集合
    const dp = new Array(sum+1).fill(false);

    dp[0] = true

    for (let i = 0; i < nums.length; i++) {

        const num = nums[i];

        // 为什么 j 要从 sum 倒着来
        // 以 [1,2,5] 为例，在 i 为 1 的时候，
        // dp[2] 先为 true
        // 等到 dp[4] 的时候 会遇到 dp[4] === dp[2],这里
        // 2 实际上是算了 两次
        // 也就是说要先遍历 dp 高的，避免重复计算
        // 如果 j 小于 num，则不需要遍历
        for (let j = sum; j>=num; j--) {
            
            dp[j]  =  dp[j] || dp[j-num]
            if(dp[j]&&j===sum){
                return true
            }
        }
    }

    console.log(dp)

    return dp[sum]

};
// @lc code=end

// 1 2 5
//   0 1 2 3 4
// 0 1 1 0 0 0
// 1 1 1 1 1 0
// 2 1 1 1   0

