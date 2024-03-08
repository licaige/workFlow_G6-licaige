// 迷路的机器人
// 设想有个机器人坐在一个网格的左上角，网格 r 行 c 列。机器人只能向下或向右移动，但不能走到一些被禁止的网格（有障碍物）。
// 设计一种算法，寻找机器人从左上角移动到右下角的路径。

var pathWithObstacles = function (obstacleGrid) {
    // 两种方式走  向下或者向右

    const next = (forword, x, y, path) => {

        if (obstacleGrid[y]?.[x] !== 0) return

        path.push([y, x])

        if (forword == "down") {
            if (obstacleGrid[y + 1]?.[x] == 0) {
                next("down", x, y + 1, path)
            } else {
                next("right", x + 1, y, path)
            }
        }
        else if (forword == "right") {
            if (obstacleGrid[y]?.[x + 1] == 0) {
                next("right", x + 1, y, path)
            } else {
                next("down", x, y + 1, path)
            }
        }

        return path
    }


    let res = null
    const p1 = next("down", 0, 0, [])
    const p2 = next("right", 0, 0, [])
    debugger
    return path
};


let grid = [
    [0, 0, 0],
    [0, 1, 0],
    [0, 0, 0]
]

pathWithObstacles(grid)