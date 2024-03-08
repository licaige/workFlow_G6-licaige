/**
 * 反转链表HOT
 * https://leetcode.cn/problems/reverse-linked-list/description/
 * @param {*} head
 * @returns
 */
var reverseList = function(head) {
  // 双指针，一个指针指向遍历的节点，另外一个指针则指向当前节点的前一个节点
  let curr = head, prev = null;
  while (curr) {
      // 保存当前节点的下一个节点，用于下次遍历
      const next = curr.next;
      // 让当前节点的下一个节点指向其上一个节点，实现反转
      curr.next = prev;
      // 更新前一个节点
      prev = curr;
      // 更新当然节点为上次记录的下一节点
      curr = next;
  }

  return prev;
};

var reverseList = function(head) {
  // 递归
  if (!head || !head.next) return head;
  const node = reverseList(head.next);

  head.next.next = head;
  head.next = null;

  return node;
}
