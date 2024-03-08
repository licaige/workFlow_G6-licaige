/*
 * @lc app=leetcode.cn id=98 lang=javascript
 *
 * [98] 验证二叉搜索树
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
 * @return {boolean}
 */
var isValidBST = function (root) {
  const stack = [];
  let lastValue = Number.NEGATIVE_INFINITY;

  // 中序遍历，左子树的值都比右子树的值小
  // 如果是搜索二叉树那么先遍历到的一定是最小的
  while (stack.length || root) {
    while (root) {
      stack.push(root);
      root = root.left;
    }
    root = stack.pop();

    if (root.val > lastValue) {
      // 如果大于就继续
      lastValue = root.val;
    } else {
      // 小于就退出
      return false;
    }
    root = root.right;
  }

  return true;
};

isValidBST;
// @lc code=end
