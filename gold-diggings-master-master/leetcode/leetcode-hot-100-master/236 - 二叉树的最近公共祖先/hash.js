/*
 * @lc app=leetcode.cn id=236 lang=javascript
 *
 * [236] 二叉树的最近公共祖先
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var lowestCommonAncestor = function (root, p, q) {
  const pHash = new Map();

  const visited = new Set();
  // 建立 parentHash
  const dfs = (parent, root) => {
    if (!root) {
      return null;
    }
    pHash.set(root, parent);
    dfs(root, root.left);
    dfs(root, root.right);
  };
  dfs(null, root);

  // 存储 p 父节点的路径
  while (p) {
    visited.add(p);
    p = pHash.get(p);
  }
  // 如果 q 或者有 q 的祖先和 p 的祖先路径相遇，那么就返回
  while (q) {
    if (visited.has(q)) {
      return q;
    }
    q = pHash.get(q);
  }
  return root;
};

lowestCommonAncestor;
// @lc code=end

//  3
// 5 1
//
