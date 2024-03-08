/*
 * @lc app=leetcode.cn id=206 lang=javascript
 *
 * [206] 反转链表
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function (head) {
  let root = null;
  const dfs = (pre, next) => {
    if (next) {
      // 如果不是 last null 则继续往下走
      dfs(next, next.next);
      // 定了 head 之后就开始赋值 next
      next.next = pre;
    } else {
      // 如果是 last null
      root = pre;
    }
  };

  dfs(null, head);
  return root;
};
reverseList;
// @lc code=end
