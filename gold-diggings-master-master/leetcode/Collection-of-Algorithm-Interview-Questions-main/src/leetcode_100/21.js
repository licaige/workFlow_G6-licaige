function ListNode(val, next) {
    this.val = val;
    this.next = next;
}
/**
 * 合并两个升序链表
 * https://leetcode-cn.com/problems/merge-two-sorted-lists/
 * @param {ListNode} l1 
 * @param {ListNode} l2 
 */
var mergeTwoLists = function(l1, l2) {
    // 迭代方法
    const dummy = new ListNode(-1);
    let cur = dummy;
    // 把当前链表头节点作为指针，哪个值较小，则新链表的节点就是较小的那个节点
    // 存在两个链表长度不一样的情况下，先遍历前n个相等的链表节点，后续再去把剩下的节点连接上
    // 因为两个链表都是升序的，所以有多余长度的节点直接连到新链表节点后面就可以
    while (l1 && l2) {
        if (l1.val < l2.val) {
            cur.next = new ListNode(l1.val);
            l1 = l1.next;
        } else {
            cur.next = new ListNode(l2.next);
        }
        cur = cur.next;
    }
    cur.next = l1 ? l1 : l2;
    return dummy.next;
}

// 也可以使用递归来做
var mergeTwoLists = function(l1, l2) {
    if (l1 == null) {
        return l2;
    } else if (l2 == null) {
        return l1;
    } else if (l1.val < l2.val) {
        return mergeTwoLists(l1.next, l2);
    } else {
        return mergeTwoLists(l1, l2.next);
    }
}

module.exports = mergeTwoLists;
