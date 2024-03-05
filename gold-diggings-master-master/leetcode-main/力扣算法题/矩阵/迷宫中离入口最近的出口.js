//1926 迷宫中离入口最近的出口

// https://leetcode.cn/problems/nearest-exit-from-entrance-in-maze/?envType=study-plan-v2&envId=leetcode-75




// 简单的矩阵BFS遍历题目

// 需要注意循环  绕圈圈  记录走过的点



var nearestExit = function (maze, entrance) {

    const sizeN = maze.length - 1
    const sizeX = maze[0].length - 1
    const res = []
    const passed = new Set()
    const deep = (x, y, step, from) => {

        // 撞墙
        if (maze?.[y]?.[x] !== ".") {
            return
        }
        // 走过的点
        if (passed.has(`${y},${x}`)) {
            return
        }
        // 记录步数
        if (maze[y][x] == ".") {
            debugger
            step++
            passed.add(`${y},${x}`)
        }
        // 边界
        if (from !== "entrance" && (x == 0 || y == 0 || x == sizeX || y == sizeN)) {
            res.push(step - 1) // 减去入口的步数
            return
        }

        // 继续下一步
        if (from == "entrance") {
            deep(x, y - 1, step, "down") // 上
            deep(x + 1, y, step, "left") // 右
            deep(x, y + 1, step, "up")   // 下
            deep(x - 1, y, step, "right")// 左
        }

        if (from == "down") {
            deep(x, y - 1, step, "down") // 上
            deep(x + 1, y, step, "left") // 右
            deep(x - 1, y, step, "right")// 左
        }

        if (from == "left") {
            deep(x, y - 1, step, "down") // 上
            deep(x + 1, y, step, "left") // 右
            deep(x, y + 1, step, "up")   // 下
        }

        if (from == "right") {
            deep(x, y - 1, step, "down") // 上
            deep(x, y + 1, step, "up")   // 下
            deep(x - 1, y, step, "right")// 左
        }

        if (from == "up") {
            deep(x + 1, y, step, "left") // 右
            deep(x, y + 1, step, "up")   // 下
            deep(x - 1, y, step, "right")// 左
        }

    }

    debugger
    deep(entrance[1], entrance[0], 0, "entrance")
    
    return res.length ? Math.min(...res) : -1
};


let maze = [["+", ".", "+", "+", "+", "+", "+"], ["+", ".", "+", ".", ".", ".", "+"], ["+", ".", "+", ".", "+", ".", "+"], ["+", ".", ".", ".", ".", ".", "+"], ["+", "+", "+", "+", ".", "+", "."]]
entrance = [0, 1]



nearestExit(maze, entrance)