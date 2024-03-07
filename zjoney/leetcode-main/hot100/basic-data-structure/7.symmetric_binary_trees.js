/**
 * 考察:递归
 * @difficulty简单
 * @summary 101. 对称二叉树
 * 给你一个二叉树的根节点 root ， 检查它是否轴对称。
 * images/7.symmetric_binary_trees.jpg
 * 示例：
 * 输入：root = [1,2,2,3,4,4,3]
 * 输出：true
 */
const check = (p, q) => {
  debugger
  if (!p && !q) return true;
  if (!p || !q) return false;
  return p.val === q.val && check(p.left, q.right) && check(p.right, q.left);
}
var isSymmetric = function(root) {
  return check(root, root);
};
const root = [1,2,2,3,4,4,3]
console.log(isSymmetric(root));