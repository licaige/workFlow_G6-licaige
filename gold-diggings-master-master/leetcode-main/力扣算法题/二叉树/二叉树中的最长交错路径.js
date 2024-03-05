// 1372. 二叉树中的最长交错路径

// https://leetcode.cn/problems/longest-zigzag-path-in-a-binary-tree/description/?envType=study-plan-v2&envId=leetcode-75



// 思路
// 记录当前结点是左/右孩子，即记录当前路径的方向
// 搜索其孩子时，根据上一条路径方向判断

//! 如果当前路径方向相反，路径长度+1，如果相同，路径长度置为1,结果推入数组
//! (即如果不同,则从当前节点开始重新计算)


// 简单暴力法,针对每个节点进行检测
var longestZigZag = function (root) {

    let resList = []

    const deep = (node, prevOp, count) => {
        // 因为外层已经传入了0  所以内部初始化count=1
        if (prevOp == "left") {
            if (node.right) {
                deep(node.right, "right", count + 1) // 继续向下 
            }
            else { // 否则记录结果
                resList.push(count)
            }
            node.left && deep(node.left, "left", 1) // 重置当前节点为起始点,向下
        }

        else if (prevOp == "right") {
            if (node.left) {
                deep(node.left, "left", count + 1) // 继续左向下
            }
            else {
                resList.push(count)
            }
            node.right && deep(node.right, "right", 1) // 重置当前节点为起始点,向下
        }
    }


    deep(root, "left", 0)
    deep(root, "right", 0)


    return Math.max(...resList)
};  