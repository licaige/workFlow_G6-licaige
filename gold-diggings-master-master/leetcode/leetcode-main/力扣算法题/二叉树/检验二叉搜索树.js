// 面试题 04.05. 合法二叉搜索树

// https://leetcode.cn/problems/legal-binary-search-tree-lcci/?envType=study-plan-v2&envId=cracking-the-coding-interview


// 二叉搜索树基本  左子树的所有元素都小于root  右子树所有元素都大于root

// 利用二叉树中序遍历特性  二叉搜索树中序遍历一定是一个递增序列

var isValidBST = function (root) {
    if (!root) return true

    let queue = []
    let res = true

    // 中序遍历
    const deep = (root) => {
        root.left && deep(root.left)

        // 判断是否递增
        const prev = queue[queue.length - 1]
        if (typeof prev !== "undefined" && prev >= root.val) {
            res = false
            return
        }
        queue.push(root.val)

        root.right && deep(root.right)
    }

    deep(root)

    return res
};