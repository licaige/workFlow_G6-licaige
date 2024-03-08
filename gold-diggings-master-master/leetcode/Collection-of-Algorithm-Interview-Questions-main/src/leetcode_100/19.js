/**
 * 删除链表的倒数第N个节点HOT
 * https://leetcode-cn.com/problems/remove-nth-node-from-end-of-list/solution/
 * @param {*} head 
 * @param {*} n 
 * @returns 
 */
var removeNthFromEnd = function(head, n) {
  // 一般做法，遍历一遍链表，得到链表长度，然后再去找到倒数第n个节点
  const getLen = (node) => {
    let len = 0;
    while (node) {
      node = node.next;
      len++;
    }
    return len;
  };
  const len = getLen(head);
  const dummy = new ListNode(0, head);
  let cur = dummy;
  // 倒数第n个节点索引计算：len - 1 - ( n - 1) => len - 1 - n + 1 => len - n,
  // 找到倒数第n个节点的索引的前一个节点
  for (let i = 0; i < len - n; i++) {
    cur = cur.next;
  }
  const next = cur.next.next;
  cur.next = next;
  return dummy.next;
}

var removeNthFromEnd = function(head, n) {
  // 双指针，设置两个指针间隔n个距离，这样当第二个指针为空时，第一个节点下一个节点就是需要删除的节点
  let dummy = new ListNode(-1);
  dummy.next = head;
  let p1 = head;
  let p2 = dummy;
  let i = 0;
  while (i < n) {
      p1 = p1.next;
      i++;
  }
  while (p1) {
      p1 = p1.next;
      p2 = p2.next;
  }
  const next = p2.next.next;
  p2.next = next;
  return dummy.next;
};

var removeNthFromEnd = function(head, n) {
  // 使用栈的思路，倒数第n个节点，理解为栈顶往下n个节点
  const stack = [];
  const dummy = new ListNode(0, head);
  let cur = dummy;
  while (cur) {
    stack.push(cur);
    cur = cur.next;
  }
  // 例如倒数第二个节点n=2，要出栈2次，这样栈顶的元素就是要删除元素的前一个元素
  while (n--) {
    stack.pop();
  }
  const top = stack[stack.length - 1];
  const next = top.next.next;
  top.next = next;
  return dummy.next;
}
