/*
 * @lc app=leetcode.cn id=142 lang=javascript
 *
 * [142] 环形链表 II
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var detectCycle = function (head) {
  let fast = head;
  let slow = head;
  // fast 速度是慢指针的两倍
  // 假设 head 到环起点路径为 a，slow 后面在环又走了 b，环剩余为 c，n 为 fast 走的圈数
  // fast = a + n(b+c) + b
  // slow = a + b
  // fast = 2 * slow
  // a+ nb + nc + b = 2a + 2b
  //  (n-1)*b + (n-1)*c + c = a
  // (n-1)*(b+c) + c = a
  // slow 再走 n-1 圈 再走 c  = a
  //为何慢指针第一圈走不完一定会和快指针相遇?
  //可以认为快指针和慢指针是相对运动的，假设慢指针的速度是 1节点/秒，快指针的速度是 2节点/秒，
  //当以慢指针为参考系的话（即慢指针静止），快指针的移动速度就是 1节点/秒，所以肯定会相遇。

  //为什么在第一圈就会相遇呢？
  //设环的长度为 L，当慢指针刚进入环时，慢指针需要走 L 步(即 L 秒)才能走完一圈，此时快指针距离慢指针的最大距离为 L-1，
  //我们再次以慢指针为参考系，如上所说，快指针在按照1节点/秒的速度在追赶慢指针，所以肯定能在 L 秒内追赶到慢指针。

  if (!fast) {
    return null;
  }

  let isInit = false;

  while (fast && slow && (fast !== slow || !isInit)) {
    isInit = true;
    fast = fast.next;
    if (fast) {
      fast = fast.next;
    }
    slow = slow.next;
  }
  // 第一次相遇的时候

  fast = head;

  // 让 fast 回到 head 速度变为1 ，slow 一直为 1，相遇时就是环的起点
  while (fast !== slow && slow) {
    fast = fast.next;
    slow = slow.next;
  }
  return slow;
};

detectCycle;
// @lc code=end
