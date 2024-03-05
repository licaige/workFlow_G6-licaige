/*
 * @Author: Luzy
 * @Date: 2023-08-09 10:40:34
 * @LastEditors: Luzy
 * @LastEditTime: 2023-08-09 18:29:21
 * @Description:
 */

// N皇后
// 如何将 N 个皇后放置在 N×N 的棋盘上，并且使皇后彼此之间不能相互攻击。
// 要求任何两个皇后都不能在同一行、同一列以及同一条斜线上 (国际象棋规则)


// 暴力回溯+优化
// 1. 使用一个数组记录每行放置的皇后的列下标
// 2. 依次在每一行放置一个皇后

// 遍历
// 遍历时检查列下标数组 , 不能放在已有数组的位置
// 1 0 0 0    1 0 0 0
// 1 0 0 0    0 1 0 0
// 1 0 0 0    1 0 0 0
// 1 0 0 0    1 0 0 0

// 判断两个点是否在一条斜线上
// 如 0,0 3,3   x与y之间差值相等 0-3 = 0-3
// 如 3,0 1,2   x+y值相等  3+0 = 1+2 

// 记录已放置的棋子, 每次放置检查列下标集合是否放置

var solveNQueens = function (n) {

    let res = []
    let curRes = []
    let rowSet = new Set()


    // 检查是否可放置 
    const canSetQueen = (row, line) => {
        // 检查列
        if (rowSet.has(row)) return false
        // 检查对角线

        let diaConflict = false
        for (let i = 0; i < curRes.length; i++) {
            let p1 = curRes[i]

            if ((p1[0] - row) == (p1[1] - line)) {
                diaConflict = true
                break
            }
            if ((p1[0] + p1[1]) == (row + line)) {
                diaConflict = true
                break
            }
        }

        return !diaConflict
    }

    debugger
    //todo  这里代码未完成 需要从0 1 2 3 四个位置下出第一步棋子
    for (let line = 0; line < n; line++) {
        for (let row = 0; row < n; row++) {

            // 检查是否可放置 
            if (canSetQueen(row, line)) {

                // 如果可放置则放置一个 
                curRes.push([row, line])
                rowSet.add(row)

                // 如果皇后放置完毕, 记录结果,继续检查
                if (rowSet.size == n) {
                    res.push([...curRes])
                    rowSet.clear()
                    curRes = []
                }

                break // 放置完直接下一行
            }

            // 如果列被占用 检查下一列
            else {
                continue
            }
        }
    }

};

solveNQueens(4)