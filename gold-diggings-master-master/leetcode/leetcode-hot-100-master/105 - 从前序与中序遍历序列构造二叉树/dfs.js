/*
 * @lc app=leetcode.cn id=105 lang=javascript
 *
 * [105] 从前序与中序遍历序列构造二叉树
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */

function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val;
  this.left = left === undefined ? null : left;
  this.right = right === undefined ? null : right;
}
var buildTree = function (preorder, inorder) {
  // 1 2 个参数是中序遍历左右指针，第 3 个参数是先序遍历 根节点值对应坐标
  // 1 2 参数用来确定树的节点数目
  // 3 参数用来确定根节点 val
  function generateRoot(left, right, preorderIndex) {
    if (right < left) {
      return null;
    }
    const root = new TreeNode(preorder[preorderIndex], null, null);
    let rootIndex = left;

    while (rootIndex <= right) {
      if (inorder[rootIndex] === preorder[preorderIndex]) {
        break;
      }
      rootIndex++;
    }

    const leftNode = generateRoot(left, rootIndex - 1, preorderIndex + 1);
    const rightNode = generateRoot(
      rootIndex + 1,
      right,
      preorderIndex + 1 + rootIndex - left
    );
    root.left = leftNode;
    root.right = rightNode;
    return root;
  }

  return generateRoot(0, inorder.length - 1, 0);
};

buildTree;
// @lc code=end
