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

function merge(head1, head2) {
  const newNodes = new ListNode(0);
  let temp = newNodes;
  let temp1 = head1;
  let temp2 = head2;

  while (temp1 && temp2) {
    if (temp1.val >= temp2.val) {
      temp.next = temp2;
      temp2 = temp2.next;
    } else {
      temp.next = temp1;
      temp1 = temp1.next;
    }
    temp = temp.next;
  }

  if (!temp1 && temp2) {
    temp.next = temp2;
  } else if (temp1 && !temp2) {
    temp.next = temp1;
  }
  return newNodes.next;
}

function toSortList(head, tail) {
  if (!head) {
    return head;
  }
  if (head.next === tail) {
    head.next = null;
    return head;
  }
  let slow = head;
  let fast = head;
  let mid;
  while (fast && fast.next !== tail) {
    slow = slow.next;
    fast = fast.next;
    if (fast.next !== tail) {
      fast = fast.next;
    }
  }
  mid = slow;

  return merge(toSortList(head, mid), toSortList(mid, tail));
}

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var sortList = function (head) {
  return toSortList(head, null);
};

sortList;
// @lc code=end
