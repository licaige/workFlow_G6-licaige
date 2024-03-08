
function ListNode(val, next) {
  this.val = (val===undefined ? 0 : val)
  this.next = (next===undefined ? null : next)
}
/**
 * 旋转链表
 * https://leetcode-cn.com/problems/rotate-list/
 * @param {*} head 
 * @param {*} k 
 * @returns 
 */
// 1. 把链表连成环，然后取k%n的余数，遍历链表余数次，最后断开链表
var rotateRight = function(head, k) {
  if (!head || !head.next || k === 0) return head;
  let n = 1, cur = head;
  // 计算链表长度
  while(cur.next && ++n) cur = cur.next;
  let add = n - k % n;
  // 表示k为链表长度的整数倍，所以不需要移动链表
  if (add === 0) {
      return head;
  }
  // 把链表连成环形链表，在指定位置断开即可
  cur.next = head;
  while(add > 0) {
      cur = cur.next;
      add--;
  }
  // 断开链表
  let ret = cur.next;
  cur.next = null;
  return ret;
};

const head = new ListNode(1);
const node2 = new ListNode(2);
const node3 = new ListNode(3);
const node4 = new ListNode(4);
const node5 = new ListNode(5);
head.next = node2;
node2.next = node3;
node3.next = node4;
node4.next = node5;
node5.next = node6;

console.log(rotateRight(head, 2));
