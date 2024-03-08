/*
 * @lc app=leetcode.cn id=279 lang=javascript
 *
 * [279] 完全平方数
 */

// @lc code=start
/**
 * @param {number} n
 * @return {number}
 */
var numSquares = function(n) {
    const dp = new Array(n+1);
    dp[0]=0;
    dp[1]=1;
    let min = Number.POSITIVE_INFINITY;
    for (let i = 2; i <=n; i++) {
        let j = 1
        while(j*j<=i){
            min = Math.min(dp[i-j*j],min)
            j++
        }
        dp[i] = min + 1;
        min = Number.POSITIVE_INFINITY;
    }

    return dp[n]

};
// @lc code=end

