/**
 * 考察:递归
 * @difficulty简单
 * @summary 94. 二叉树的中序遍历
 * 给定一个二叉树的根节点 root ，返回 它的 中序 遍历 。
 * 查看image/6.middle_order_traversal_of_binary_tree.jpg
 * 示例：
 * 输入：root = [1,null,2,3]
 * 输出：[1,3,2]
 */

/**
 * 方法2：递归
 */ 
var inorderTraversal = function(root) { 
  debugger
  const res = [];
  const inorder = (root) => {
      if (!root) {
          return;
      }
      inorder(root.left);
      res.push(root.val);
      inorder(root.right);
  }
  inorder(root);
  return res;
};
/**
 * 方法2：迭代
*/ 
var inorderTraversal2 = function (root) {
  const res = [];
  const stk = [];
  debugger
  while (root || stk.length) {
    while (root) {
      stk.push(root);
      root = root.left;
    }
    root = stk.pop();
    res.push(root.val);
    root = root.right;
  }
  return res;
};
const root = [1, null, 2, 3]
console.log(inorderTraversal(root)); // [1, 3, 2]