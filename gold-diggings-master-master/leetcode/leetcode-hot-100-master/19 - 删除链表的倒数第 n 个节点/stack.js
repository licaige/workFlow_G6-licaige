/*
 * @lc app=leetcode.cn id=19 lang=javascript
 *
 * [19] 删除链表的倒数第 N 个结点
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
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function (head, n) {
  const stack = [];
  const ans = head;
  let next = null;
  let pre = null;
  // 先全部放进栈中
  while (head) {
    stack.push(head);
    head = head.next;
  }

  // 找到倒数第 n-1和 n+1 个
  for (let i = 0; i < n + 1; i++) {
    pre = stack.pop();
    if (i === n - 2) {
      // n+1 个
      next = pre;
    } else if (i === n - 1) {
      // 第 n ge
      pre.next = null;
    }
  }
  // 循环完毕正常情况下 pre 就是 n-1 个

  if (pre) {
    pre.next = next;
  } else {
    //这里做一个判断假如没有 n-1 了，也就是长度不够或者删除了头部 那么直接返回 n+1
    // [1] 1
    // [2,3] // 2
    // [1,2,3] // 3
    return next;
  }

  return ans;
};
removeNthFromEnd;
// @lc code=end
