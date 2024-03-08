/* leetcode　103二叉树的锯齿形层次遍历binary-tree-zigzag-level-order-traversal JavaScript实现　*/

/** * Definition for a binary tree node. * function TreeNode(val) { *     this.val = val; *     this.left = this.right = null; * } */ /** * @param {TreeNode} root * @return {number[][]} */
var zigzagLevelOrder = function(root) {
    if (root == null) {
        return [];
    }
    var checkArr = [root];
    var resArr = [
        [root.val]
    ]; /*    往右*/
    var dir = 'left';
    while (checkArr.length > 0) {
        var newCheckArr = [];
        for (var i = 0; i < checkArr.length; i++) {
            var item = checkArr[i];
            if (item.left) {
                newCheckArr.push(item.left);
            }
            if (item.right) {
                newCheckArr.push(item.right);
            }
        }
        checkArr = newCheckArr;
        if (checkArr.length > 0) {
            var levelArr = checkArr.map(function(v, i) {
                return v.val;
            });
            if (dir == 'right') {
                resArr.push(levelArr);
                dir = 'left';
            } else {
                resArr.push(levelArr.reverse());
                dir = 'right';
            }
        }
    }
    return resArr;
};