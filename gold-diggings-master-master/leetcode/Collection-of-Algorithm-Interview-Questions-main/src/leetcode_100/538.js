/**
 * 把二叉搜索树转换为累加树HOT
 * https://leetcode.cn/problems/convert-bst-to-greater-tree/description/?favorite=2cktkvj
 * @param {TreeNode} root 
 * @returns 
 */
var convertBST = function(root) {
  // 中序遍历，右中左
  const ans = [];
  const dfs = (node) => {
      if (!node) return 0;
      if (!node.left && !node.right) return node.val;
      const rval = dfs(node.right);
      const val = node.val;
      const lval = dfs(node.left);
      const sum = lval + rval + val;
      console.log(lval, rval, val, sum);
      ans.push(sum);
      return sum;
  };
  dfs(ans, root);
  return root;
};
