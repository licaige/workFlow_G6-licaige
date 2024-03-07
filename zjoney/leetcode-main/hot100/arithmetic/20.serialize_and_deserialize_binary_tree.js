/**
 * 考察:深度优先、广度优先
 * @difficulty 困难
 * @summary 297.二叉树的序列化与反序列化
 * 序列化是将一个数据结构或者对象转换为连续的比特位的操作，进而可以将转换后的数据存储在一个文件或者内存中，
 * 同时也可以通过网络传输到另一个计算机环境，采取相反方式重构得到原数据。
 * 请设计一个算法来实现二叉树的序列化与反序列化。这里不限定你的序列 / 反序列化算法执行逻辑，
 * 你只需要保证一个二叉树可以被序列化为一个字符串并且将这个字符串反序列化为原始的树结构。
 * 
 * 示例一
 * 如图 images/serdeser.jpg
 * 输入：root = [1,2,3,null,null,4,5]
 * 输出：[1,2,3,null,null,4,5]
 * 
 * 题目理解：
 * 序列化： 
 * 使用DFS遍历每个节点。 如果遇到节点为空，则返回X。 如果节点有值，则将其和左右子树，按照根、左、右的顺序拼接成字符串。
 * 
 * 反序列化： 由于已经按照根、左、右的顺序，对二叉树进行了序列化，只要按照这个顺序递归生成二叉树即可。 
 * 将序列化的字符串转换成数组，每次递归都出队一个值，就保证了根、左、右的顺序。 
 * 如果出队的值为X，则生成一个null，并将其返回。 
 * 如果出队的是正常值，则用其创建一个节点，并将其与递归生成的左右子树连接成二叉树。
 */
/**
 * --------------------方法2 bfs
 */
 const serialize = (root) => {
  if (root == null) {                  //遇到null 返回‘X’进行标示
      return 'X';
  }
  const left = serialize(root.left);   //序列化左子树
  const right = serialize(root.right); //序列化右子树
  return root.val + ',' + left + ',' + right; //按根,左,右 返回字符串
};

const deserialize = (data) => {
  const list = data.split(',');   //字符串转数组

  const buildTree = (list) => {  	//构建树
      const rootVal = list.shift(); //第一个元素
      if (rootVal == "X") {         //如果是X，返回null
          return null;
      }
      const root = new TreeNode(rootVal); //如果不是X就创建节点
      root.left = buildTree(list);        //构建左子树
      root.right = buildTree(list);       //构建右子树
      return root;                        //返回构建的节点
  };

  return buildTree(list);
};



/**
 *--------------方法1递归dfs
 * @param {TreeNode} root
 * @return {string}
 */
// var serialize = function (root) {
//   // 如果节点为空，使用一个特定的字符标识
//   if (!root) {
//     return 'X';
//   }

//   // 每次递归都获取左右子树的序列化结果
//   const left = serialize(root.left);
//   const right = serialize(root.right);

//   // 将当前二叉树按照根,左,右的方式拼接
//   return `${root.val},${left},${right}`;
// };

/**
 *
 * @param {string} data
 * @return {TreeNode}
 */
// var deserialize = function (data) {
//   // 将序列化的字符串，转换为数组
//   const valList = data.split(',');

//   // 生成二叉树的方法
//   function build() {
//     // 由于二叉树已经按照根、左、右的顺序序列化，每次递归只需要按顺序取出每个节点的值即可
//     const val = valList.shift();

//     // 如果当前值为X，表示此节点为空，直接返回null
//     if (val === 'X') {
//       return null;
//     }

//     // 使用当前值生成一个节点
//     const node = new TreeNode(val);

//     // 由于子节点都是按照先左后右的顺序取出，因此按照同样顺序将子节点连接到根节点即可
//     node.left = build();
//     node.right = build();

//     // 将当前生成的节点返回，供上一层递归生成树
//     return node;
//   }
//   return build();
// };