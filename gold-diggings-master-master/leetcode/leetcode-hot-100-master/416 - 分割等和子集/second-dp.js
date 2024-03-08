/*
 * @lc app=leetcode.cn id=416 lang=javascript
 *
 * [416] 分割等和子集
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
        return falseß
    }else {
        sum = sum/2
    }

    // 创建一个 二维数组保存 dp
    // dp[i][j] 表示 从 nums[0] - nums[1] 取数 可以等于 ===j
    // [1,2,3] 例如 dp[1][3] 表示从 1 和 2 或者 1 或者 2 或者不取 等于 3
    // 显然 dp[1][3] 为 true 所以
    // dp[2][3] 也为 true 

    // fill 方法里面的引用数据类型会填充每一个
    // 所以创建 二维 dp 的时候注意 引用问题

    const dp = new Array(nums.length).fill([]).map(()=>new Array(sum+1).fill(false))
    

    

    for (let i = 0; i < nums.length; i++) {
        dp[i][0] = true;
    }


    dp[0][nums[0]] = true



    for (let i = 1; i < nums.length; i++) {

        
        for (let j = 1; j <=sum; j++) {
            const num = nums[i]
            if(num>j){
                dp[i][j] = dp[i-1][j]
            }else {
                // 如果在下标 0 - i-1 存在等于 j 那么一定存在 0 - i 等于 j
                // 或者0 - i-1等于 j-num ，加上自己刚好等于
                dp[i][j] = dp[i-1][j] || dp[i-1][j-num]
            }
            
        }
    }

    return dp[nums.length-1][sum]

};
// @lc code=end

// 1 2 5
//   0 1 2 3 4
// 0 1 1 0 0 0
// 1 1 1 1 1 0
// 2 1 1 1   0

