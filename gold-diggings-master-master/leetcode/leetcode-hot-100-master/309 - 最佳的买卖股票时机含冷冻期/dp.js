/*
 * @lc app=leetcode.cn id=309 lang=javascript
 *
 * [309] 最佳买卖股票时机含冷冻期
 */

// @lc code=start
/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {


    const dp = new Array(prices.length).fill(1).map(_=>[0,0,0]);

    // 如果有股票也有冷冻期，那么将会有 4 种状态
    // 这里的有股票只有一种状态


    // 0 代表有股票
    // 1 代表没有股票且不出于冷冻期
    // 2 代表没有股票且出于冷冻期
    dp[0][0] = -prices[0];
    dp[0][1]=0;
    dp[0][2]=0;


    



    for (let i = 1; i < prices.length; i++) {

        dp[i][0] = Math.max(dp[i-1][0],dp[i-1][1]-prices[i]);

        dp[i][1]= Math.max(dp[i-1][1],dp[i-1][2])

        dp[i][2] = dp[i-1][0]+prices[i]
        
    }



    return Math.max(dp[prices.length-1][1],dp[prices.length-1][2]);

};
// @lc code=end

