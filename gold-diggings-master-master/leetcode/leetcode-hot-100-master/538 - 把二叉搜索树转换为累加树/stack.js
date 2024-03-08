/*
 * @lc app=leetcode.cn id=538 lang=javascript
 *
 * [538] 把二叉搜索树转换为累加树
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
var convertBST = function (root) {
  const stack = [];
  let sum = 0;
  const ans = root;
  // 从右子树开始的中序遍历

  while (root || stack.length) {
    while (root) {
      stack.push(root);
      root = root.right;
    }
    root = stack.pop();
    sum = sum + root.val;
    root.val = sum;
    root = root.left;
  }
  return ans;
};
convertBST;
// @lc code=end
