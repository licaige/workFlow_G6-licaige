/**
 * 考察：深度优先搜索
 * @difficulty困难
 * @summary:538. 把二叉搜索树转换为累加树
 * 给出二叉 搜索 树的根节点，该树的节点值各不相同，请你将其转换为累加树（Greater Sum Tree），
 * 使每个节点 node 的新值等于原树中大于或等于 node.val 的值之和。
 * 提醒一下，二叉搜索树满足下列约束条件：
 * 节点的左子树仅包含键 小于 节点键的节点。
 * 节点的右子树仅包含键 大于 节点键的节点。
 * 左右子树也必须是二叉搜索树。

 * 如图 images/convert_BST_to_greater_tree.png
 * 输入：[4,1,6,0,2,5,7,null,null,null,3,null,null,null,8]
 * 输出：[30,36,21,36,35,26,15,null,null,null,33,null,null,null,8]

 */
// 逆向中序遍历，左中右->右中左
// 节点的值等于它自己加上它的前一个节点的值【逆向】
var convertBST = function(root) {
  if(!root) return null;
  let stack = [];
  let node = root;
  let prenode = null;
  debugger
  while(node || stack.length) {
      while(node) {
          stack.push(node)
          node = node.right;
      }
      node = stack.pop();
      if(prenode) {
          node.val += prenode.val;
      }
      prenode = node;
      node = node.left;
  }
  return root;
};
const root =[4,1,6,0,2,5,7,null,null,null,3,null,null,null,8]
console.log(convertBST(root))
