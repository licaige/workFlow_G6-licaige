/**
 * 考察:哈希表
 * @difficulty简单
 * @summary 141. 环形链表
 * 给你一个链表的头节点 head ，判断链表中是否有环。
 * 如果链表中有某个节点，可以通过连续跟踪 next 指针再次到达，则链表中存在环。 
 * 为了表示给定链表中的环，评测系统内部使用整数 pos 来表示链表尾连接到链表中的位置（索引从 0 开始）。
 * 注意：pos 不作为参数进行传递 。仅仅是为了标识链表的实际情况。
 * 如果链表中存在环 ，则返回 true 。 否则，返回 false 。
 * 示例1
 * 查看image/2.the_circular_linked_list.png
 * 输入：head = [3,2,0,-4], pos = 1
 * 输出：true
 * 解释：链表中有一个环，其尾部连接到第二个节点。
 */
var hasCycle = (head) => {
    let map = new Map();
    debugger
    while (head) {
        if (map.has(head)) return true;//如果当前节点在map中存在就说明有环
        map.set(head, true);//否则就加入map
        head = head.next;//迭代节点
    }
    return false;//循环完成发现没有重复节点，说明没环
};
const head = [3, 2, 0, -4], pos = 1;
console.log(hasCycle(head, pos));