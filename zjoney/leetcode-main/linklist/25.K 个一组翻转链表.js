/**
 * 考察：链表
 * @difficulty 困难
 * @summary:25. K 个一组翻转链表
 * 给你链表的头节点 head ，每 k 个节点一组进行翻转，请你返回修改后的链表。
 * k 是一个正整数，它的值小于或等于链表的长度。如果节点总数不是 k 的整数倍，那么请将最后剩余的节点保持原有顺序。
 * 你不能只是单纯的改变节点内部的值，而是需要实际进行节点交换。
 * 如图images/13.reverse_a_of_link.jpg
 * 输入：head = [1,2,3,4,5], k = 2
 * 输出：[2,1,4,3,5]
 */
var reverseKGroup = function (head, k) {debugger
    if (!head) return null;
    let start = head, end = head;
    debugger
    for (let i = 0; i < k; i++) {
        // 如果在还没遍历到第 k 个，end 空了，即 head 链表个数不满足 k 个，直接返回原链表
        if (!end) {
            return head;
        } else {
            end = end.next;
        }
    }

    let newHead = reverse(start, end); // 左闭右开区间
    start.next = reverseKGroup(end, k); // 翻转以后，原本的 start 指向的结点，变到了 end 的前一个，直接 start.next 继续递归翻转后续的就行
    return newHead;
};

// 反转区间 [a, b) 的元素，注意是左闭右开
function reverse(head, end) {
    let p = head, q, newHead; // p 在前面，q 跟在 p 的后面
    while (p !== end) {
        q = p; // q 赋值会原链表 p 的位置
        p = p.next; // p 继续向后遍历
        q.next = newHead;
        newHead = q;
    }
    return newHead;
};
const head = [1, 2, 3, 4, 5], k = 2;
console.log(reverseKGroup(head, k));
