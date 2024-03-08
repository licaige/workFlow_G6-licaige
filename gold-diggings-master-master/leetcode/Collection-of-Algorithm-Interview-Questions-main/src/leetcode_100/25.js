function ListNode(val, next) {
  this.val = val;
  this.next = next;
}
/**
 * k个一组翻转链表
 * https://leetcode-cn.com/problems/reverse-nodes-in-k-group/
 * @param {*} head
 * @param {*} k
 */
var reverseKGroup = function (head, k) {
  // 翻转子链表
  const reverseChildList = (head, tail) => {
    let pre = tail.next;
    let cur = head;
    while (pre != tail) {
      const next = cur.next;
      cur.next = pre;
      pre = cur;
      cur = next;
    }
    // 注意这里翻转以后，tail变成了头节点，head则变成了尾节点
    return [tail, head];
  };
  const dummy = new ListNode(0);
  dummy.next = head;
  let pre = dummy;
  while (head) {
      let tail = pre;
      // 判断当前子链表长度是否小于k，小于的话不做翻转
      for (let i = 0; i < k; i++) {
          tail = tail.next;
          if (!tail) {
              return dummy.next;
          }
      }
      const next = tail.next;
      [head, tail] = reverseChildList(head, tail);
      // 将翻转好的子链表拼接到原链表上
      pre.next = head;
      tail.next = next;
      pre = tail;
      head = tail.next;
  }
  return dummy.next;
};
