// 994. 腐烂的橘子


// https://leetcode.cn/problems/rotting-oranges/?envType=study-plan-v2&envId=top-100-liked




// 图的广度优先遍历
// 矩阵图相当于四叉树  每层遍历就是经过了一分钟

// 记录橘子数量n   每次腐烂一个n-1
// 已经记录过腐烂的橘子设置为3


var orangesRotting = function (grid) {
    // 首次遍历记录橘子数量和起始根节点

    let roots = []
    let count = 0
    let deepCount = 0
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[0].length; x++) {
            if (grid[y][x] == 1) {
                count++
            } else if (grid[y][x] == 2) {
                roots.push([x, y])
            }
        }
    }
    // 边界判断
    if (count == 0) return 0
    if (roots.length == 0) return -1

    // BFS从根节点开始遍历
    // 使用层序遍历 数组传递  记录遍历层数
    const check = (x, y, results) => {
        if (grid?.[y]?.[x] == 1) {
            grid[y][x] = 2
            count--
            results.push([x, y])
        }
    }

    const deep = (arr) => {

        let nextArr = []
        // 检查四个方向  是橘子则腐烂  并推入下层结果
        for (let i = 0; i < arr.length; i++) {
            let x = arr[i][0]
            let y = arr[i][1]

            check(x, y - 1, nextArr)
            check(x, y + 1, nextArr)
            check(x - 1, y, nextArr)
            check(x + 1, y, nextArr)
        }

        if (nextArr.length > 0) {
            deepCount++
            deep(nextArr)
        }
    }

    deep(roots)

    return count == 0 ? deepCount : -1

};


orangesRotting(grid)