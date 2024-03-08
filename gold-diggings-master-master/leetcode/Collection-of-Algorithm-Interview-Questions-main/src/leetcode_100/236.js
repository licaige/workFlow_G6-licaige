/**
 * 二叉树的最近公共祖先HOT
 * https://leetcode.cn/problems/lowest-common-ancestor-of-a-binary-tree/description/
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @returns {TreeNode}
 */
var lowestCommonAncestor = function(root, p, q) {
  let ans = null;
  const dfs = (node, p, q) => {
      if (node == null) return false;
      // f(lson)表示左子树包含p节点或者q节点，f(rson)表示右子树包含q或者q节点
      const lson = dfs(node.left, p, q);
      const rson = dfs(node.right, p, q);
      // 1. 如果左右子树包含了p或者q节点，说明当前节点就是公共节点
      // 1. 如果当前节点就是p或者q节点，并且其子树包含p或者q节点，说明p或者q就是公共节点
      if ((lson && rson) || (node.val === p.val || node.val === q.val) && (lson || rson)) {
          ans = node;
      }
      return lson || rson || (node.val === p.val || node.val === q.val);
  };
  dfs(root, p, q);
  return ans;
};

// hash表记录每个节点的父节点，以及p节点往上遍历的路径，如果路径中包含了q节点，说明遍历到的节点就是公共节点
var lowestCommonAncestor = function(root, p, q) {
  const parent = new Map();
  const visited = new Set();
  const dfs = (node) => {
      if (node == null) return;
      if (node.left) {
          parent.set(node.left.val, node);
          dfs(node.left);
      }
      if (node.right) {
          parent.set(node.right.val, node);
          dfs(node.right);
      }
  };
  dfs(root);
  // 从p往上遍历，记录遍历的路径
  while (p != null) {
      visited.add(p);
      p = parent.get(p.val);
  }
  // 根据路径判断q的祖先节点是否在路径中
  while (q != null) {
      if (visited.has(q)) {
          return q;
      }
      q = parent.get(q.val);
  }
  return null;
}
