/**
 * 考察：链表
 * @difficulty 中等
 * @summary:19. 删除链表的倒数第 N 个结点
 * 给你一个链表，删除链表的倒数第 n 个结点，并且返回链表的头结点。
 * 查看images/11.remove_nth_node.jpg
 * 
 * 示例:
 * 输入：head = [1,2,3,4,5], n = 2
 * 输出：[1,2,3,5]
 */
var removeNthFromEnd = function (head, n) {
  // 判断n是否小于或等于0，其实现实代码中，这里我会报错
  if (!head || !n) return head
  // 快慢指针
  let slow = head
  let quick = head
  let temp = null
  n = n-1
  while(quick && n) {
    debugger
    quick = quick.next
    n--
  }
  // 判断n是否大于链表的长度，其实现实代码中，这里我会报错
  if (!quick) {
    return head
  }
  while(quick.next) {
    temp = slow
    quick = quick.next
    slow = slow.next
  }
  if (temp) {
    temp.next = slow.next
  } else {
    head = slow.next
  }
  return head
};
const head = [1,2,3,4,5], n= 2;
console.log(removeNthFromEnd(head, n));6