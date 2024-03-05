// 2352. 相等行列对
// https://leetcode.cn/problems/equal-row-and-column-pairs/?envType=study-plan-v2&envId=leetcode-75




// 使用哈希表存储行列对
var equalPairs = function (grid) {

    let n = grid.length
    // 准备行列数组
    let row = new Array(n).fill("")
    let line = new Array(n).fill("")

    // 遍历  同时给数组补充元素
    for (let x = 0; x < grid.length; x++) {
        for (let y = 0; y < grid.length; y++) {
            row[x] += grid[y][x]
            line[y] += grid[y][x]
        }
    }

    let res = 0

    row.forEach(r => {
        line.forEach(l => {
            r == l && res++
        })
    })

    return res
};


equalPairs([[3, 1, 2, 2], [1, 4, 4, 5], [2, 4, 2, 2], [2, 4, 2, 2]])