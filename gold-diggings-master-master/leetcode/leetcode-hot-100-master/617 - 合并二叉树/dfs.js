/*
 * @lc app=leetcode.cn id=617 lang=javascript
 *
 * [617] 合并二叉树
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
 * @param {TreeNode} root1
 * @param {TreeNode} root2
 * @return {TreeNode}
 */
var mergeTrees = function (root1, root2) {
  // 如果两边都是空的，则返回 null
  if (!root1 && !root2) {
    return null;
  }
  // 让 root 等于有值的一方
  const root = root1 || root2;
  root.val = (root1?.val || 0) + (root2?.val || 0);
  // 深度递归算法
  root.left = mergeTrees(root1?.left, root2?.left);
  root.right = mergeTrees(root1?.right, root2?.right);
  return root;
};

mergeTrees;
// @lc code=end
