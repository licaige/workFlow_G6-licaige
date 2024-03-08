/**
 * 二叉树的层序遍历HOT
 * https://leetcode.cn/problems/binary-tree-level-order-traversal/
 * @param {TreeNode} root
 * @return {number[][]}
 */
 var levelOrder = function(root) {
  if (!root) return [];
  const queue = [root];
  const ans = [];
  while (queue.length) {
      const arr = [];
      const n = queue.length;
      for (let i = 0; i < n; i++) {
          // 注意按照先进先出的队列结构，所以是取队首的数据
          const node = queue.shift();
          arr.push(node.val);
          if (node.left) queue.push(node.left);
          if (node.right) queue.push(node.right);
      }
      ans.push(arr);
  }
  return ans;
};
