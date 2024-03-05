

// https://leetcode.cn/problems/paths-with-sum-lcci/?envType=study-plan-v2&envId=cracking-the-coding-interview
// 面试题 04.12. 求和路径


// 设计一个算法，打印节点数值总和等于某个给定值的所有路径的数量。


// 方案  递归遍历,记录走过的路径,
// 从当前遍历的节点沿路径往上计算 


// 注意  由于可以存在负数节点 和0节点  不能提前退出计算
var pathSum = function (root, sum) {

    if (!root) return 0

    let res = 0

    const dfs = (root, paths) => {

        let newPaths = [...paths, root.val]
        let s = 0

        for (let i = newPaths.length - 1; i >= 0; i--) {
            s += newPaths[i]

            if (s === sum) {
                res++
            }
        }

        root.left && dfs(root.left, newPaths)
        root.right && dfs(root.right, newPaths)
    }

    dfs(root, [])

    return res
};
