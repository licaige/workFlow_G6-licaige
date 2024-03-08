/**
 * 从前序与中序遍历序列构造二叉树HOT
 * https://leetcode.cn/problems/construct-binary-tree-from-preorder-and-inorder-traversal/
 * @param {TreeNode} preorder 
 * @param {*} inorder 
 */
var buildTree = function(preorder, inorder) {
  /**
    分析：
    1. 前序遍历表示从根节点开始，再去遍历左右子树
    2. 中序遍历则表示先左子树，再根节点，最后右子树
    3. 结合两者可知，先找到根节点，根节点在中序遍历中的位置，此位置分割出左右子树
  */
  // 用来记录前序遍历的节点在中序遍历序列的位置
  const memo = new Map();
  preorder.forEach(item => {
    memo.set(item, inorder.indexOf(item));
  });
  const dfs = (l, r) => {
    if (l > r) return null;
    const val = preorder.shift();
    const index = memo.get(val);
    const node = new TreeNode(val);
    node.left = dfs(l, index - 1);
    node.right = dfs(index + 1, r);
    return node;
  };
  return dfs(0, inorder.length - 1);
}

// 迭代的方法
