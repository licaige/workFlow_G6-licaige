/**
 * 验证二叉搜索树HOT
 * https://leetcode.cn/problems/validate-binary-search-tree/
 * @param {TreeNode} root 
 * @returns 
 */
var isValidBST = function(root) {
  // 分析：利用二叉搜索树的左子树的所有的值都小于当前节点的值，右子树都大于当前节点的值
  const dfs = (node, low, high) => {
      if (!node) return true;
      // 当前节点比最小的节点的值还要小，或者当前节点的值比最大值还要大，说明不符合二叉搜索树
      if (low >= node.val || high <= node.val) return false;
      // 递归更新，注意遍历左子树，最大值更新为当前节点
      // 遍历右子树，最小值更新为当前节点的值
      return dfs(node.left, low, node.val) && dfs(node.right, node.val, high);
  };
  return dfs(root, -Infinity, Infinity);
};

var isValidBST = function(root) {
  // 迭代中序遍历，利用二叉搜索树中序遍历的结果是一个升序数组
  if (!root) return true;
  let inorder = -Infinity;
  const sk = [];
  while (sk.length || root) {
      while (root) {
          sk.push(root);
          root = root.left;
      }
      root = sk.pop();
      // 如果中序遍历得到的值比前一个值要小，说明不是二叉搜索树
      if (root.val <= inorder) return false;
      inorder = root.val;
      root = root.right;
  }
  return true;
}
