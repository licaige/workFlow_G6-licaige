/*
 * @lc app=leetcode.cn id=121 lang=javascript
 *
 * [121] 买卖股票的最佳时机
 */

// @lc code=start
/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {

    let min = prices[0]
    let maxPrice = 0;

    for (let i = 1; i < prices.length; i++) {
        
        if(prices[i]< min){
            min = prices[i]
        }else {
            maxPrice = Math.max(maxPrice,prices[i] - min)
        }
        
    }

    return maxPrice

};
// @lc code=end

