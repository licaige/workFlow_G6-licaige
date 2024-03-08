/*
 * @lc app=leetcode.cn id=337 lang=javascript
 *
 * [337] 打家劫舍 III
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
var rob = function (root) {
  const dfs = (root) => {
    if (!root) {
      return [0, 0];
    }
    const [leftSetted, leftNotSetted] = dfs(root.left);
    const [rightSetted, rightNotSetted] = dfs(root.right);

    return [
      root.val + leftNotSetted + rightNotSetted,
      Math.max(leftNotSetted, leftSetted) +
        Math.max(rightSetted, rightNotSetted),
    ];
  };

  const [s, n] = dfs(root);

  return Math.max(s, n);
};

rob;
// @lc code=end
