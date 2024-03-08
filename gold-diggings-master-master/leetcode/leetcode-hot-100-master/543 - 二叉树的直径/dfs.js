/*
 * @lc app=leetcode.cn id=543 lang=javascript
 *
 * [543] 二叉树的直径
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var diameterOfBinaryTree = function (root) {

    let max = 0;
    const dfs = (root) => {

        // dfs 计算当前节点的深度

        if (!root) {
            return 0
        }

        let left = dfs(root.left);
        let right = dfs(root.right);

        let ans = left + right + 1;

        max = Math.max(ans, max);
        // 返回左右子节点深度最大的
        return 1 + Math.max(left, right)
    }


    dfs(root);

    return max - 1

};
// @lc code=end

