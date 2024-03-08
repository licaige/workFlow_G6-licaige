/*
 * @lc app=leetcode.cn id=96 lang=javascript
 *
 * [96] 不同的二叉搜索树
 */

//  dp[i] = dp[i] + dp[j-1] * dp[i-j]


// 例如 7 的时候等于
//   1     2               7
// 0 * 6 1 * 5 。。。。。  6*0
// 因为自己作为根节点也会算一个

// @lc code=start
/**
 * @param {number} n
 * @return {number}
 */
var numTrees = function(n) {


    const dp = new Array(n+1).fill(0)
    dp[0] = 1;
    dp[1] = 1;

    for (let i = 2; i <= n; i++) {
       
       for (let j = 1; j <=i; j++) {
           dp[i] = dp[i] + dp[j-1] * dp[i-j]
       }
       
    }
    return dp[n]
};

numTrees;
// @lc code=end

