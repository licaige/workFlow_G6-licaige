/**
 * 二叉树的中序遍历HOT
 * https://leetcode.cn/problems/binary-tree-inorder-traversal/
 * @param {TreeNode} root
 * @return {number[]}
 */
 var inorderTraversal = function(root) {
  const ans = [];
  const dfs = (node) => {
      if (!node) return;
      dfs(node.left);
      ans.push(node.val);
      dfs(node.right);
  };
  dfs(root);
  return ans;
};

// 迭代遍历
var inorderTraversal = function(root) {
  const ans = [];
  const stack = [];
  while (root || stack.length) {
      // 找到左子树
      while (root) {
          stack.push(root);
          root = root.left;
      }
      root = stack.pop();
      ans.push(root.val);
      root = root.right;
  }
  return ans;
}