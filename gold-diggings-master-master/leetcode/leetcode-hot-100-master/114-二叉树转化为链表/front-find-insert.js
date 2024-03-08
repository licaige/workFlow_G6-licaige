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
// 一边前序遍历一边插入
var flatten = function (root) {
  const stack = [root];
  let now = root;
  while (stack.length) {
    const temp = stack.pop();
    if (!temp) {
      continue;
    }
    if (now !== temp) {
      now.right = temp;
      now.left = null;
      now = now.right;
    }
    stack.push(temp.right);
    stack.push(temp.left);
  }
};
// @lc code=end
