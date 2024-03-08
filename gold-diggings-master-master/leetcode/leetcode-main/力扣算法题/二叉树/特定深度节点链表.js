// 面试题 04.03. 特定深度节点链表


// https://leetcode.cn/problems/list-of-depth-lcci/description/

// BFS+链表构成

var listOfDepth = function (tree) {
    if (!tree) return [];
    //层序遍历
    const res = [], nodeQueue = [tree];
    let levelNum;//表示每一层的节点个数
    while (nodeQueue.length) {
        levelNum = nodeQueue.length;
        const arr = []
        while (levelNum) {
            const node = nodeQueue.shift();
            arr.push(node.val);
            node.left && nodeQueue.push(node.left);
            node.right && nodeQueue.push(node.right);
            levelNum--
        }
        res.push(createNodeList(arr));
    }
    return res;
};
//将数组转换成链表
function createNodeList(arr) {
    const node = new ListNode();
    arr.reduce((node, cur) => {
        node.next = new ListNode(cur);
        return node.next;
    }, node);
    return node.next;
}
