/*
 * @lc app=leetcode.cn id=160 lang=javascript
 *
 * [160] 相交链表
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
var getIntersectionNode = function (headA, headB) {
  // 双指针
  // 设 headA 前面部分为 a，公共部分为 c
  // 设 headB 前面部分为 b，公共部分为 c
  // headA 走完 走 headB a+c+b
  // headB 走完 走 headA b+c+a

  // 所以换路径之后相等就是相遇了
  let A = headA;
  let B = headB;

  // 如果 A!==B 就一直循环
  while (A !== B) {
    while (A && B) {
      if (A === B) {
        return A;
      }
      A = A.next;
      B = B.next;
    }
    // B走完了
    if (A) {
      B = headA;
      A = A.next;
    } else if (B) {
      // A走完了
      A = headB;
      B = B.next;
    } else {
      return null;
    }
  }
  return A;
};
getIntersectionNode;
// @lc code=end
