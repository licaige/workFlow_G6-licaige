/*
 * @lc app=leetcode.cn id=437 lang=javascript
 *
 * [437] 路径总和 III
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
 * @param {number} targetSum
 * @return {number}
 */
var pathSum = function (root, targetSum) {
  let ans = 0;

  const find = (root, target) => {
    if (!root) {
      return;
    }
    if (root.val === target) {
      ans++;
    }
    find(root.left, target - root.val);
    find(root.right, target - root.val);
  };

  const dfs = (root) => {
    if (!root) {
      return;
    }
    find(root, targetSum);
    dfs(root.left);
    dfs(root.right);
  };

  dfs(root);
  return ans;
};
pathSum;
// @lc code=end
//  1
// -2  -  3
//1 3  -2 null
//-1
