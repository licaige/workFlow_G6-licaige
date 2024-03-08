/* leetcode　515在每个树行中找最大值find-largest-value-in-each-tree-row JavaScript实现　*/

/** * Definition for a binary tree node. * function TreeNode(val) { *     this.val = val; *     this.left = this.right = null; * } */ /** * @param {TreeNode} root * @return {number[]} */
var largestValues = function(root) {
    if (root == null) {
        return [];
    }
    var checkArr = [root];
    var resArr = [root.val];
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
            resArr.push(Math.max.apply(Math, levelArr));
        }
    }
    return resArr;
};