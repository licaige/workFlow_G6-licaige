/*
 * @lc app=leetcode.cn id=122 lang=javascript
 *
 * [122] 买卖股票的最佳时机 II
 */

// @lc code=start
/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {


    const dp = new Array(prices.length+1).fill(new Array(2).fill(0));
    dp[0][0] = 0;
    dp[0][1] = 0;

    dp[1][0] = 0;
    dp[1][1] = -prices[0];



    for (let i = 2; i <= prices.length; i++) {
        
        // 到第 i 天没有股票的最大值，dp[i-1][1] 已经是包含了买股票的钱 -x 然后 + prices[i-1]
        dp[i][0] = Math.max(dp[i-1][0],dp[i-1][1]+prices[i-1]);
        // 到第 i 天有股票的最大值，前一天没有股票，然后在第 i 天买了股票
        dp[i][1] = Math.max(dp[i-1][1],dp[i-1][0]-prices[i-1])
        
    }

    return Math.max(dp[prices.length][0],dp[prices.length][1])


};
// @lc code=end

