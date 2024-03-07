/**
 * 考察:深度优先
 * @difficulty 简单
 * @summary 543. 二叉树的直径
 * 给定一棵二叉树，你需要计算它的直径长度。一棵二叉树的直径长度是任意两个结点路径长度中的最大值。
 * 这条路径可能穿过也可能不穿过根结点。
 * 示例 :给定二叉树
 *  1
         / \
        2   3
       / \     
      4   5    
 * 返回 3, 它的长度是路径 [4,2,1,3] 或者 [5,2,1,3]。
 */
var diameterOfBinaryTree = function (root) {
        if (root == null || (root.left == null && root.right == null)) return 0
        let res = 0
        function dfs(root) {
                if (root == null) return 0
                let left = dfs(root.left)
                let right = dfs(root.right)
                res = Math.max(res, left + right + 1)
                return Math.max(left, right) + 1
        }
        dfs(root)
        return res - 1
};