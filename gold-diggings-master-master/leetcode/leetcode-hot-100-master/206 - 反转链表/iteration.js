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
  let pre = null;
  let next = null;

  while (head) {
    // 1 要先保存当前节点的下一个值
    next = head.next;
    // 2 把前面的值赋值给当前节点
    head.next = pre;
    // 把当前值标记为 pre
    pre = head;
    // 移动指针到下一个节点
    head = next;
  }

  return pre;
};

reverseList;
// @lc code=end
