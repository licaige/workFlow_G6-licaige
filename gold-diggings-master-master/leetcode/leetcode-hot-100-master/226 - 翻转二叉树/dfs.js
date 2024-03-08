/*
 * @lc app=leetcode.cn id=226 lang=javascript
 *
 * [226] 翻转二叉树
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
 * @return {TreeNode}
 */
var invertTree = function (root) {
  const dfs = (root) => {
    if (!root) {
      return;
    }
    // 交换左右子树
    const temp = root.left;
    root.left = root.right;
    root.right = temp;
    // 递归交换
    dfs(root.left);
    dfs(root.right);
  };
  dfs(root);
  return root;
};
invertTree;
// @lc code=end
