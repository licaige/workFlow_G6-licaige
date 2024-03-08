/*
 * @lc app=leetcode.cn id=21 lang=javascript
 *
 * [21] 合并两个有序链表
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
var mergeTwoLists = function(list1, list2) {

    let head = new ListNode(-1,null);

    let ans = head;

    while(list1&& list2){
        if(list1.val>list2.val){
            head.next = list2;
            head = list2
            list2 = list2.next;
        }else {
            head.next = list1;
            head = list1;
            list1 = list1.next;
        }
    }
    if(list1){
        head.next = list1;
    }else if(list2){
        head.next = list2
    }

    return ans.next

};
// @lc code=end

