

// 删除链表的中间节点

// 给你一个链表的头节点 head 。删除 链表的 中间节点 ，并返回修改后的链表的头节点 head 。


// 比如 1 2 3 4 5   删除3

// 方案一  : 遍历后记录链表长度
// 方案二! : 快慢指针  

// 快指针每次移动2位  慢指针移动一位, 快指针到末尾时候,慢指针刚好在中间

var deleteMiddle = function(head) {
    if(!head.next){ // 额外注意一个!head.next为空的情况
        return null
    }
    let s = q = head
    let ans
    while(q && q.next){      
        ans = s
        s = s.next
        q = q.next.next
    }
    ans.next = ans.next.next
    return head
};