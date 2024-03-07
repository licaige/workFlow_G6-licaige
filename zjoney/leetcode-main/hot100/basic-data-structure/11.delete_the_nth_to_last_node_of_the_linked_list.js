/**
 * 考察：链表
 * @difficulty 困难
 * @summary:19. 删除链表的倒数第 N 个结点
 * 给你一个链表，删除链表的倒数第 n 个结点，并且返回链表的头结点。
 * 如图images/remove_nth_link.jpg
 * 示例一：
 * 输入：head = [1,2,3,4,5], n = 2
 * 输出：[1,2,3,5]
 */
var removeNthFromEnd = function(head, n) {
  let ret = new ListNode(0, head),
      slow = fast = ret;
  while(n--) fast = fast.next;
  if(!fast) return ret.next;
  while (fast.next) {
      fast = fast.next; 
      slow = slow.next
  };
  slow.next = slow.next.next;
  return ret.next;
};
const head = [1,2,3,4,5], n=2
console.log(removeNthFromEnd(head, n))// 

