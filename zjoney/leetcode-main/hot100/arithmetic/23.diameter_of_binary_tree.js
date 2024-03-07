/**
 * 考察:二分查找法、二叉树
 * @difficulty 简单
 * @summary 543. 二叉树的直径
 * 给定一棵二叉树，你需要计算它的直径长度。一棵二叉树的直径长度是任意两个结点路径长度中的最大值。这条路径可能穿过也可能不穿过根结点。
 * 示例 :
 * 给定二叉树
    1
         / \
        2   3
       / \     
      4   5    
返回 3, 它的长度是路径 [4,2,1,3] 或者 [5,2,1,3]。
 */
 var diameterOfBinaryTree = function(root) {
  let height = 0
  function helper(node){
  if(!node) return 0
      let left = helper(node.left),right = helper(node.right)
      height = Math.max(left + right, height) //左子树深度 + 右子树深度
      return Math.max(left,right) + 1 //以该节点为根节点的最大深度
  }
  helper(root)
  return height
};