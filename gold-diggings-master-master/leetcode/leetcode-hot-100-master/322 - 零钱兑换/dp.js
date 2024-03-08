/*
 * @lc app=leetcode.cn id=322 lang=javascript
 *
 * [322] 零钱兑换
 */

// @lc code=start
/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function(coins, amount) {



    const dp = new Array(amount+1).fill(-1);
    dp[0] =0

    // min 来记录合成最小的
    let min = 0;

    for (let i = 1; i <=amount; i++) {
        
        min = -1;

        for (let j = 0; j<coins.length; j++) {
            if(coins[j]>i){
                continue
            }

            // 这是一个硬币就可以兑换的
            if(dp[i-coins[j]]===0){
                min = 1
            // 这是要多个硬币
            }else if(dp[i-coins[j]]>0){
                // 如果以前没有计算出 dp
                if(min===-1){
                    min = dp[i-coins[j]]+1
                }else {
                    // 如果 算出来了，取最小值
                    min = Math.min(min,dp[i-coins[j]]+1)
                }
            }


        }

        dp[i] = min
    }


    return dp[amount]

};
// @lc code=end

