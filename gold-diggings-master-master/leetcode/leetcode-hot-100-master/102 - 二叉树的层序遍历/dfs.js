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

    const dfs = (rootArray) => {
        if(!rootArray.length){
            return
        }
        const temp = []
        const arr = []
        for (let i = 0; i < rootArray.length; i++) {
            const root = rootArray[i];
            if(!root){
                continue
            }
            temp.push(root.val)
            const left = root.left;
            const right = root.right;
            if (left) {
                arr.push(left)
            }
            if (right) {
                arr.push(right)
            }
        }
        if(temp.length){
            result.push(temp)
        }
        
        dfs(arr)
    }
    dfs([root])
    return result

};

levelOrder;
// @lc code=end

// 3

// 9 20

// 15 7 

