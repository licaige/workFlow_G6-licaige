
// 120. 三角形最小路径和
// https://leetcode.cn/problems/triangle/?envType=study-plan-v2&envId=top-interview-150


//! 一般这种都需要使用 自底向上进行递推的方案

// dp[i][j] 表示从点 (i,j) 到底边的最小路径和。

//               下一个点的最小路径和     当前点
// dp[i][j]=min(dp[i+1][j],dp[i+1][j+1])+triangle[i][j]



var minimumTotal = function (triangle) {


    // 初始化dp
    const dp = []
    triangle.forEach(() => { dp.push([]) })

    // 由底向上  计算每个点
    for (let i = triangle.length - 1; i >= 0; i--) {
        for (let j = 0; j <= i; j++) {
            let a = dp[i + 1]?.[j] || 0
            let b = dp[i + 1]?.[j + 1] || 0
            dp[i][j] = Math.min(a, b) + triangle[i][j]
        }
    }


    return dp[0][0]
};


minimumTotal(triangle)