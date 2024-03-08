/**
 * 合并二叉树HOT
 * https://leetcode.cn/problems/merge-two-binary-trees/
 * @param {TreeNode} root1
 * @param {TreeNode} root2
 * @return {TreeNode}
 */
// 递归
var mergeTrees = function(root1, root2) {
  // 递归退出条件
  if (!root1 && !root2) return null;
  if (!root1) return root2;
  if (!root2) return root1;
  // 先序遍历，先根，后左右
  const node = new TreeNode(root1.val + root2.val);
  node.left = mergeTrees(root1.left, root2.left);
  node.right = mergeTrees(root1.right, root2.right);

  return node;
};

// 迭代
var mergeTrees = function(root1, root2) {
  // 边界条件判断
  if (!root1 && !root2) return null;
  if (!root1) return root2;
  if (!root2) return root1;
  // 使用队列记录节点遍历路径
  const q1 = [root1];
  const q2 = [root2];
  const ans = new TreeNode(root1.val + root2.val);
  const q = [ans];
  while (q1.length && q2.length) {
      const node = q.pop();
      const node1 = q1.pop();
      const node2 = q2.pop();
      const l1 = node1.left;
      const l2 = node2.left;
      const r1 = node1.right;
      const r2 = node2.right;

      if (l1 && l2) {
          const l = new TreeNode(l1.val + l2.val);
          node.left = l;
          q.push(l);
          q1.push(l1);
          q2.push(l2);
      } else if (l1) {
          node.left = l1;
      } else {
          node.left = l2;
      }

      if (r1 && r2) {
          const r = new TreeNode(r1.val + r2.val);
          node.right = r;
          q.push(r);
          q1.push(r1);
          q2.push(r2);
      } else if (r1) {
          node.right = r1;
      } else {
          node.right = r2;
      }
  }
  return ans;
};
