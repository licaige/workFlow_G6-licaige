/**
 * 考察：深度优先搜索
 * @difficulty困难
 * @summary:437. 路径总和 III
 * 给定一个二叉树的根节点 root ，和一个整数 targetSum ，求该二叉树里节点值之和等于 targetSum 的 路径 的数目。
 * 路径 不需要从根节点开始，也不需要在叶子节点结束，但是路径方向必须是向下的（只能从父节点到子节点）。
 * 查看images/pathsumIII.jpg
 */
/**
 * 方法2：前缀和Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} targetSum
 * @return {number}
 */
 var pathSum = function(root, targetSum) {
  if(root === null) return 0;
  let map = new Map();
  map.set(0, 1);//考虑从根结点开始的合法路径
  return dfs(root, map, 0, targetSum);
};
const dfs = (root, map, cur, targetSum) => {//先序遍历
  if(root === null) return 0;
  let res = 0;
  debugger
  cur += root.val;//更新当前路径前缀和
  res += map.get(cur - targetSum) || 0;//判断节点值之和等于targetSum = 判断两个节点路径差等于targetSum = 如果当前结点前缀和等于cur,那么另外一个节点前缀和为 cur - targetSum
  map.set(cur, (map.get(cur) || 0) + 1);//给前缀和为cur的情况计数加1
  res += dfs(root.left, map, cur, targetSum);//左子树的res
  res += dfs(root.right, map, cur,targetSum);//右子树res
  map.set(cur, (map.get(cur) || 0) - 1);//能执行到这说明此节点的子节点都遍历完了，要减去经过此节点得到的前缀和，避免对其它节点的子节点计算造成影响
  return res; 
}

/**
*方法一：
 *首先定义 rootSum(p,val)\textit{rootSum}(p,\textit{val})rootSum(p,val) 表示以节点 ppp 为起点向下且满足路径总和为 valvalval 的路径数目
 *对节点 ppp 求 rootSum(p,targetSum)\textit{rootSum}(p,\textit{targetSum})rootSum(p,targetSum) 时
 *左孩子节点pl求出 rootSum(pl,targetSum−val)，右孩子节点pr=rootSum(pr,targetSum−val)
 */
// var pathSum = function(root, targetSum) {
//   if(!root) return 0
//   let curNode = dfs(root,targetSum)
//   let leftNode = pathSum(root.left,targetSum)
//   let rightNode = pathSum(root.right,targetSum)
//   return curNode+leftNode+rightNode
// }

// const dfs = function(root,targetSum){
//   if(!root) return 0
//   let res = 0
//   if(root.val===targetSum) res++
//   res+=dfs(root.left,targetSum-root.val)
//   res+=dfs(root.right,targetSum-root.val)
//   return res
// }
