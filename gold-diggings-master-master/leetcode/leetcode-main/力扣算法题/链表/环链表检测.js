//面试题 02.08. 环路检测

// 实现一个算法, 返回链表环路的开头节点。若环不存在，请返回 null

// 方案一  使用哈希表记录节点
var detectCycle = function (head) {
    const visited = new Set();
    while (head !== null) {
        if (visited.has(head)) {
            return head;
        }
        visited.add(head);
        head = head.next;
    }
    return null;
};



// 方案二  使用快慢指针  (不占用额外空间)
// 通过数学证明   环链表分为三部分    环外  入环点-相交点  相交点-出环点
var detectCycle = function (head) {
    if (head === null) {
        return null;
    }
    let slow = head, fast = head;
    while (fast !== null) {
        slow = slow.next;
        if (fast.next !== null) {
            fast = fast.next.next;
        } else {
            return null;
        }
        if (fast === slow) {
            let ptr = head;
            while (ptr !== slow) {
                ptr = ptr.next;
                slow = slow.next;
            }
            return ptr;
        }
    }
    return null;
};