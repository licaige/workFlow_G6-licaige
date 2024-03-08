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
// 深度优先遍历
var invertTree = function (root) {
  if (!root) {
    return root;
  }
  const queue = [root];
  const ans = root;
  let temp = null;

  while (queue.length) {
    root = queue.shift();
    if (root.left) {
      queue.push(root.left);
    }
    if (root.right) {
      queue.push(root.right);
    }
    temp = root.left;
    root.left = root.right;
    root.right = temp;
  }

  return ans;
};
invertTree;
// @lc code=end
