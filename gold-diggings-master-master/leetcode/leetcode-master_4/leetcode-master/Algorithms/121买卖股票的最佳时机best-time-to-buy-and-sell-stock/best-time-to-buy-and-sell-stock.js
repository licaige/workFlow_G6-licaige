/* leetcode　121买卖股票的最佳时机best-time-to-buy-and-sell-stock JavaScript实现　*/

var maxProfit = function(prices) {
    var n = prices.length;
    var maxProfit = 0;
    if (n < 2) {
        return maxProfit;
    }
    var min = prices[0];
    for (var i = 1; i < n; i++) {
        var item = prices[i];
        if (item <= min) {
            min = item;
        } else {
            maxProfit = Math.max(item - min, maxProfit);
        }
    }
    return maxProfit;
};