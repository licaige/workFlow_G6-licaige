
/**
 * 相交链表HOT
 * https://leetcode.cn/problems/intersection-of-two-linked-lists/description/
 * @param {*} headA
 * @param {*} headB
 * @returns
 */
// hash表
var getIntersectionNode = function(headA, headB) {
  const visited = new Set();
  while (headA != null) {
      visited.add(headA);
      headA = headA.next;
  }
  while (headB != null) {
      if (visited.has(headB)) return headB;
      headB = headB.next;
  }
  return null;
};

// 双指针
var getIntersectionNode = function(headA, headB) {
  if (headA == null || headB == null) return null;
  let p1 = headA;
  let p2 = headB;
  while (p1 != p2) {
      // 假设A链表不相交的部分为a个节点，B链表不相交的部分为b个节点，二者相交的部分为c个节点
      // A、B分别到达链表结尾的长度为a+c、b+c
      // A链表到达末尾以后，指向B链表的首节点，B链表到达末尾以后，指向A链表的首节点
      // 继续遍历到相交节点的长度分别为a+c+b、b+c+a，此时遍历的节点个数相等，此节点就是相交节点
      p1 = p1 == null ? headB : p1.next;
      p2 = p2 == null ? headA : p2.next;
  }

  return p1;
}
