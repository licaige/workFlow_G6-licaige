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
  // 存取每个节点 设置的最大 value
  const setted = new Map();
  // 存取每个节点 未设置的最大 value
  const notSetted = new Map();
  setted.set(null, 0);
  notSetted.set(null, 0);

  const dfs = (root) => {
    if (!root) {
      return;
    }
    dfs(root.left);
    dfs(root.right);

    // 如果设置了 = 当前值 + left未设置 + right未设置
    setted.set(
      root,
      root.val + notSetted.get(root.left) + notSetted.get(root.right)
    );
    // 如果没有设置 = left未/设置最大值 + right未/设置最大值
    notSetted.set(
      root,
      Math.max(notSetted.get(root.left), setted.get(root.left)) +
        Math.max(notSetted.get(root.right), setted.get(root.right))
    );
  };

  dfs(root);

  // 返回 root 设置或者 root 未设置最大值
  return Math.max(notSetted.get(root), setted.get(root));
};

rob;
// @lc code=end
