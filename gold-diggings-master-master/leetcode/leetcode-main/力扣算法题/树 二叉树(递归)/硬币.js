
// 面试题 08.11. 硬币
// 硬币。给定数量不限的硬币，币值为25分、10分、5分和1分，编写代码计算n分有几种表示法。


// 输入: n = 5
// 输出：2
// 解释: 有两种方式可以凑成总金额:
// 5=5
// 5=1+1+1+1+1






// 方案一: 建立四叉树进行递归(栈溢出)
// 树的每层需要保证递增  如


//    1            5           10
// 1 5 10        5  10         10

// 方案二: 动态规划
// 


// j记录上一层的idx
var waysToChange = function (n) {
    let count = 0
    let coins = [1, 5, 10, 25]


    const dfs = (res, idx) => {
        if (res == n) {
            count++
            return
        }
        if (res > n) return

        for (let i = idx; i < coins.length; i++) {
            dfs(res + coins[i], i)
        }
    }

    dfs(0, 0)
    
    return count
};

// BFS式进行递归 超时
var waysToChange2 = function (n) {
    let count = 0
    let coins = [1, 5, 10, 25]
    let queue = [{ sum: 0, idx: 0 }]

    while (queue.length > 0) {
        let { sum, idx } = queue.shift()

        if (sum == n) {
            count++
            continue
        }

        if (sum > n) continue

        for (let i = idx; i < coins.length; i++) {
            queue.push({ sum: sum + coins[i], idx: i })
        }
    }
    debugger
    return count
};

// 一维DP法
let waysToChange3 = (n)=> {
    let dp = new Array(n+1).fill(1)
    let coins = [1,5,10,25]
    for(let i=1; i<4; i++){
        for(let j=1; j<=n; j++){
            if(j-coins[i]>=0){
                dp[j] = (dp[j]+dp[j-coins[i]]) % (1e9+7)
            } 
        }
    }
    return dp[n]
};


console.log(waysToChange(900));
console.log(waysToChange3(900));