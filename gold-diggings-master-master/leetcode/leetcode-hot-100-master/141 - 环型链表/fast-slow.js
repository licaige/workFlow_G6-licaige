/*
 * @lc app=leetcode.cn id=141 lang=javascript
 *
 * [141] 环形链表
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
 * @return {boolean}
 */
var hasCycle = function (head) {
    let fast = head;
    let slow = head;

    let init = true

    while ((init || fast !== slow) && fast && slow) {
        slow = slow.next;
        fast = fast.next;
        if (fast) {
            fast = fast.next
        }
        init = false
    }
    // 快慢指针相遇的时候
    // 两个指针再一起走

    fast = head;

    while (fast !== slow && fast && slow) {
        fast = fast.next;
        slow = slow.next
    }

    return !!slow

};
// @lc code=end

