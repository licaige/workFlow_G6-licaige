// https://leetcode.cn/problems/route-between-nodes-lcci/?envType=study-plan-v2&envId=cracking-the-coding-interview

// 节点间通路

// 节点间通路。给定有向图，设计一个算法，找出两个节点之间是否存在一条路径。

// 本质上和<课程表>没有区别

// <图的深度优先搜索>
// 标记经过的节点


// 注意  如果使用正序,会超时,这里需要使用逆序方法, 从target开始寻找
// 比如找到从 0-999的路径   从999开始  往后寻找


var findWhetherExistsPath = function (n, graph, start, target) {

    let res = false

    const bfs = (end) => {
        if (res) return
        for (let i = 0; i < graph.length; i++) {
            if (res) break

            // 找到符合入库且未访问过的节点
            if (graph[i][1] == end && graph[i][2] !== 0) {

                graph[i].push(0)  // 进行标记
                let next = graph[i][0]

                if (next == start) {
                    res = true
                    break
                }
                bfs(next)
            }
        }
    }


    bfs(target)

    return res
};


let n = 3,
    graph = [[0, 1], [0, 2], [1, 2], [1, 2]],
    start = 0,
    target = 2


findWhetherExistsPath(n, graph, start, target)