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


    

    // 如果有股票也有冷冻期，那么将会有 4 种状态
    // 这里的有股票只有一种状态


    // 0 代表有股票
    // 1 代表没有股票且不出于冷冻期
    // 2 代表没有股票且出于冷冻期


    // 因为 dp[i] 只用到了 dp[i-1] 所以用迭代法

    let f0 = -prices[0];
    let f1 = 0;
    let f2 = 0;

    let f3 = null

    let f4= null;

    let f5 =null;


    



    for (let i = 1; i < prices.length; i++) {

        f3 = Math.max(f0,f1-prices[i]);
        f4 = Math.max(f1,f2);
        f5 = f0+prices[i];


        f0 = f3;
        f1 = f4;
        f2 = f5
       
        
    }



    return Math.max(f1,f2);

};
// @lc code=end

