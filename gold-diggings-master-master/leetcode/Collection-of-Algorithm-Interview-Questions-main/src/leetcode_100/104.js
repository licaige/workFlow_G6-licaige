/**
 * 二叉树的最大深度HOT
 * https://leetcode.cn/problems/maximum-depth-of-binary-tree/
 * @param {TreeNode} root 
 * @returns 
 */
var maxDepth = function(root) {
  /**
      分析：
      1. 求最大深度，实际就是比较左右子树的深度哪个大取哪个
   */
  if (!root) return 0;
  return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1;
};

var maxDepth = function(root) {
  // 广度优先搜索
  if (!root) return 0;
  const queue = [root];
  let ans = 0;
  while (queue.length) {
      const n = queue.length;
      for (let i = 0; i < n; i++) {
          const node = queue.shift();
          if (node.left) queue.push(node.left);
          if (node.right) queue.push(node.right);
      }
      ans += 1;
  }
  return ans;
}
