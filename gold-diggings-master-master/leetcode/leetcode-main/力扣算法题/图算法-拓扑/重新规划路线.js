
// 1466. 重新规划路线
// https://leetcode.cn/problems/reorder-routes-to-make-all-paths-lead-to-the-city-zero/?envType=study-plan-v2&envId=leetcode-75



// 方案   构建路径树

// 检查0的子节点   将所有子节点到0的路径转为正向
// 然后遍历子节点,重复上述步骤, 

// 依然是BFS

var minReorder = function (n, connections) {

    //  收集每个城市的路径
    const citys = {}

    for (let i = 0; i < connections.length; i++) {
        let c1 = connections[i][0]
        let c2 = connections[i][1]

        const node = {
            start: c1,   // 路径起点
            end: c2,     // 路径终点
            done: false  // 使用标记记录是否已经处理过该路径
        }

        if (!citys[c1]) {
            citys[c1] = [node]
        } else {
            citys[c1].push(node)
        }

        if (!citys[c2]) {
            citys[c2] = [node]
        } else {
            citys[c2].push(node)
        }
    }

    // 从0城市开始检索
    const queue = [0]
    let res = 0

    for (let i = 0; i < queue.length; i++) {
        let city = queue[i]
        let paths = citys[city]

        // 检查该节点的方向是否正确,不正确则交换
        for (let j = 0; j < paths.length; j++) {
            // 处理过的节点则跳过
            if (paths[j].done) continue

            const start = paths[j].start
            const end = paths[j].end
            // 进行交换
            if (end != city) {
                paths[j].start = end
                paths[j].end = start
                res++
            }

            paths[j].done = true

            // 子节点推入队列
            let nextCity = start == city ? end : start
            queue.push(nextCity)
        }

    }

    return res
};

let n = 6, connections = [[0, 1], [1, 3], [2, 3], [4, 0], [4, 5]]

minReorder(n, connections)
