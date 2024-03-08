/**
 * 二叉树展开为链表HOT
 * https://leetcode.cn/problems/flatten-binary-tree-to-linked-list/
 * @param {TreeNode} root
 */
var flatten = function (root) {
  let cur = root,
    pre = null;
  while (cur) {
    // 判断是否有左子树
    if (cur.left) {
      // 保存整个左子树
      const next = cur.left;
      // 让前驱节点指向左子树
      pre = next;
      // 找到左子树的最后一个节点
      while (pre.right) {
        pre = pre.right;
      }
      // 让前驱节点的右子树指向当前节点的右子树
      pre.right = cur.right;
      // 断开左子树
      cur.left = null;
      // 让右子树指向保存的节点
      cur.right = next;
    }
    // 下一个右子节点
    cur = cur.right;
  }
};
