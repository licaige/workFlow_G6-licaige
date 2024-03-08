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
  let ans = root;

  // dfs 返回当前是否包含这两个子元素
  const dfs = (root) => {
    if (!root) {
      return false;
    }
    const left = dfs(root.left);
    const right = dfs(root.right);
    if (
      // 如果左右都包涵，则是最近的公共祖先
      // 只会负值一次
      // 如果是当前元素是祖先元素
      (left && right) ||
      ((root.val === q.val || root.val === p.val) && (left || right))
    ) {
      ans = root;
    }
    return left || right || root.val === p.val || root.val === q.val;
  };

  dfs(root);

  return ans;
};

lowestCommonAncestor;
// @lc code=end

//  3
// 5 1
//
