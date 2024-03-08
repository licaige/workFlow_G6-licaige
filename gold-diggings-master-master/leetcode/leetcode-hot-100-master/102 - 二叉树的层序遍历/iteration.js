/*
 * @lc app=leetcode.cn id=102 lang=javascript
 *
 * [102] 二叉树的层序遍历
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
 * @return {number[][]}
 */
var levelOrder = function (root) {
    const result = []
    // 用队列
    const queue = [];
    let arr = []
    if(root){
        queue.push(root)
    }
    let count = queue.length;

    while(queue.length){
        arr = []
        while(count--){
            temp = queue.shift();
            arr.push(temp.val)
            if(temp.left){
                queue.push(temp.left)
            }
            if(temp.right){
                queue.push(temp.right)
            }
        }
        result.push(arr)
        count = queue.length
    }
    return result

};
// @lc code=end


