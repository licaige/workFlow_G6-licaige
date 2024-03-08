function findApple(m, n) {
    const dp = new Array(m+1).fill(new Array(n+1).fill(1));
    for (let i = 2; i <=m; i++) {
        for (let j = 2; j <= n; j++) {
            // j 盘子
            // i 苹果
            if(j>i){
                dp[i][j] = dp[i][i]
            }else {
                for (let k = 1; k <=j; k++) {
                    // k 表示现在苹果占了几个盘子
                    dp[i][j] = dp[i][j] + dp[i-k][k]
                }
            }

            
        }
        
    }
    return dp[m][n]
}

// 