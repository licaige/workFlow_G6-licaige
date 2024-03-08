/**
 * 两数相加HOT
 * https://leetcode-cn.com/problems/add-two-numbers/
 * @param {ListNode} l1 
 * @param {ListNode} l2 
 */
function ListNode(val, next) {
    this.val = (val===undefined ? 0 : val)
    this.next = (next===undefined ? null : next)
}

var addTwoNumbers = function(l1, l2) {
  // 记录相加之后的进位
  let carry = 0,
  // 设置一个哨兵
  head = new ListNode(-1),
  cur = head;
  // 同时遍历两个链表，如果长度较长的链表遍历完了，则较短链表用0补上
  while (l1 || l2) {
    let value1 = l1 ? l1.val : 0;
    let value2 = l2 ? l2.val : 0;
    let sum = value1 + value2 + carry;
    // 当前位应该表示的值是sum%10，进位则是sum/10
    cur.next = new ListNode(sum % 10);
    carry = Math.floor(sum / 10);
    cur = cur.next;
    l1 = l1 ? l1.next : null;
    l2 = l2 ? l2.next : null;
  }
  // 如果最后还存在进位，那么相加后的链表最后一位就是进位的值
  if (carry) cur.next = new ListNode(carry);
  return head.next;
};

module.exports = addTwoNumbers;
