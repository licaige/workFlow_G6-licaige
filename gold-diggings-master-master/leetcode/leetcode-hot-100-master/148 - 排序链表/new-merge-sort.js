/*
 * @lc app=leetcode.cn id=148 lang=javascript
 *
 * [148] 排序链表
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

// 并归排序
var sortList = function (head) {
  // 排序
  function sort(head) {
    // 如果只有一个节点就返回自身
    if (!head || !head.next) {
      return head;
    }
    // 快慢指针计算中点
    let slow = head;
    let fast = head;

    while (fast) {
      fast = fast.next;
      if (fast) {
        fast = fast.next;
        if (!fast) {
          break;
        }
        slow = slow.next;
      }
    }

    const nextHead = slow.next;
    // 记得把 left 的尾巴给弄没，否则会引起循环
    slow.next = null;

    return merge(sort(head), sort(nextHead));
  }

  // 合并
  function merge(head1, head2) {
    let head = null;
    if (head1.val < head2.val) {
      head = head1;
      head1 = head1.next;
    } else {
      head = head2;
      head2 = head2.next;
    }
    const ans = head;

    while (head1 && head2) {
      if (head1.val < head2.val) {
        head.next = head1;
        head1 = head1.next;
      } else {
        head.next = head2;
        head2 = head2.next;
      }
      head = head.next;
    }
    if (head1) {
      head.next = head1;
    } else if (head2) {
      head.next = head2;
    }
    return ans;
  }

  return sort(head);
};

sortList;
// @lc code=end
