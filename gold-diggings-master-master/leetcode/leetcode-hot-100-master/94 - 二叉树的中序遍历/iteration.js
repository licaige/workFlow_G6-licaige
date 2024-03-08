/*
 * @lc app=leetcode.cn id=94 lang=javascript
 *
 * [94] 二叉树的中序遍历
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
 * @return {number[]}
 */
var inorderTraversal = function (root) {

    const stack = []

    const res = []
    while (root || stack.length) {
       
        // 把左子树左边全部 push 到栈中
        while(root){
            stack.push(root)
            root = root.left
        }
        // 把当前左子树推出栈中
        root = stack.pop();
        res.push(root.val)
        // 如果当前左子树有右子节点，就把右子节点负值为 root
        root  = root.right
        // 如果没有右子节点，则把上一级左节点弹出栈中，以此循环
    }


    return res
};

inorderTraversal;
// @lc code=end

