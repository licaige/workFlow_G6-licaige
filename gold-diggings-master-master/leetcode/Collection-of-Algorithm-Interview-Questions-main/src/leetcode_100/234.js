/**
 * 回文链表HOT
 * https://leetcode.cn/problems/palindrome-linked-list/description/
 * @param {*} head
 * @returns
 */
// 第一种方法：数组存储链表
var isPalindrome = function(head) {
  let visited = [];
  // 遍历链表，将节点的值存储到数组中
  while (head !== null) {
      visited.push(head.val);
      head = head.next;
  }
  // 双指针从数组首尾遍历，如果首尾值不相等，说明不是回文
  for (let i = 0, j = visited.length - 1; i < visited.length, j >= 0; i++, j--) {
      if (visited[i] !== visited[j]) return false;
  }
  return true;
};

// 第二种方法：利用快慢指针找到中间节点，反转后半部分的链表和前半部分比较
var isPalindrome = function(head) {
  let slow = head, fast = head.next;

  while (fast != null && fast.next != null) {
      slow = slow.next;
      fast = fast.next.next;
  }
  // 注意链表节点个数为奇数时，slow表示的是中间节点
  // 所以反转的就是slow节点后面的链表
  // 如果是偶数个节点，则slow表示前半部分的最后一个节点，所以还是反转slow节点后面的链表
  const reverseList = (root) => {
      let cur = root, next = null;
      while (cur != null) {
          const nextNode = cur.next;
          cur.next = next;
          next = cur;
          cur = nextNode;
      }
      return next;
  };
  // 得到反转以后的后半部分链表
  const halfLnk = reverseList(slow.next);
  let p1 = head, p2 = halfLnk;
  while (p2 != null) {
      if (p1.val !== p2.val) return false;
      p1 = p1.next;
      p2 = p2.next;
  }
  return true;
}
