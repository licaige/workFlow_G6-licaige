/**
 * 对称二叉树HOT
 * https://leetcode.cn/problems/symmetric-tree/
 * @param {TreeNode} root
 * @return {boolean}
 */
 var isSymmetric = function(root) {
  /**
      分析：
      1. 左子树和右子树进行对比，即左子树的左子节点和右子树的右子节点，左子树的右子节点和右子树的左子节点
      2. 后续遍历
   */
  const dfs = (l, r) => {
      if (!l && !r) return true;
      if (!l || !r) return false;
      if (l.val !== r.val) return false;
      return dfs(l.left, r.right) && dfs(l.right, r.left);
  };
  return dfs(root.left, root.right);
};

var isSymmetric = function(root) {
  // 迭代遍历
  const q = [root,root];
  while (q.length) {
      const l = q.shift();
      const r = q.shift();

      if (!l && !r) continue;
      if (!l || !r) return false;
      if (l.val !== r.val) return false;

      q.push(l.left);
      q.push(r.right);
      q.push(l.right);
      q.push(r.left); 
  }
  return true;
}
