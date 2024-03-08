/**
 * 二叉树的直径HOT
 * https://leetcode.cn/problems/diameter-of-binary-tree/description/
 * @param {TreeNode} root 
 * @returns 
 */
var diameterOfBinaryTree = function(root) {
  // 求二叉树的直径长度可以理解为求每个节点左右子树的深度
  // 当前节点的直径就是左右子树的深度+1
  // 使用一个值，记录每个节点的直径
  // 找到最大的直径返回
  // 记录所有节点中最大直径的值
  let ans = 0;
  const dfs = node => {
      // 节点为空，其直径为0
      if (!node) return 0;
      // 求左右子树的深度
      const L = dfs(node.left);
      const R = dfs(node.right);
      // 当前节点的直径就是左右子树的深度+1
      ans = Math.max(ans, L+R+1);
      // 当前节点的深度就是左右子树中较大的深度+1
      return Math.max(L, R) + 1;
  };
  dfs(root);
  // 直径为经历的节点个数，长度表示节点数-1
  return ans - 1;
};
