/*
 * @lc app=leetcode.cn id=114 lang=javascript
 *
 * [114] 二叉树展开为链表
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {void} Do not return anything, modify root in-place instead.
 */
// 此方法是前序遍历树，然后再把这个树循环从左至右插入到右边叶子结点
var flatten = function (root) {
  const frontFindRes = [];
  const stack = [root];
  while (stack.length) {
    const temp = stack.pop();
    if (!temp) {
      continue;
    }
    frontFindRes.push(temp);
    stack.push(temp.right);
    stack.push(temp.left);
  }

  root = frontFindRes[0];
  let temp = root;
  for (let i = 1; i < frontFindRes.length; i++) {
    temp.left = null;
    temp.right = frontFindRes[i];
    temp = frontFindRes[i];
  }
};
// @lc code=end
