// 两两交换链表节点


// 方案  维护四个指针  prev  node1  node2 next  进行交换即可

var swapPairs = function (head) {


    if (!head || !head.next) return head


    let prev = null
    let node1 = head
    let node2 = head.next
    let next = head.next.next
    let newHead = node2

    while (node2) {
        // 进行交换
        node1.next = node2.next
        node2.next = node1

        if (prev) {
            prev.next = node2
        }

        // 继续下轮

        prev = node1
        node1 = next
        node2 = next?.next
        next = next?.next?.next

    }

    return newHead
};