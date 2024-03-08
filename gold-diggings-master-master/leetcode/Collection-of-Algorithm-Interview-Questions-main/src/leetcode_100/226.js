/**
 * 翻转二叉树HOT
 * https://leetcode.cn/problems/invert-binary-tree/description/
 * @param {*} root
 * @returns
 */
var invertTree = function (root) {
  // 递归，后序遍历
  const dfs = (node) => {
      if (!node) return null;
      const left = dfs(node.left);
      const right = dfs(node.right);
      node.left = right;
      node.right = left;
      return node;
  };
  dfs(root);
  return root;
};

var invertTree = function (root) {
  // 迭代，广度优先遍历
  if (root == null) return null;
  const queue = [root];
  while (queue.length !== 0) {
      const temp = queue.shift();
      const left = temp.left;
      temp.left = temp.right;
      temp.right = left;

      if (temp.left != null) {
          queue.push(temp.left);
      }
      if (temp.right != null) {
          queue.push(temp.right);
      }
  }
  return root;
}
