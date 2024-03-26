/*
 * @Author: Lee
 * @Date: 2021-11-08 13:48:53
 * @LastEditors: Lee
 * @LastEditTime: 2023-07-05 11:12:15
 */

// 二叉搜索树节点类
class BinarySearchTreeNode {
  constructor(value) {
    this.value = value; // 节点对应的值
    this.left = null; // 左子节点
    this.right = null; // 右子节点
  }
}

// 二叉搜索树类
export class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  /**
   * 插入节点到二叉搜索树中
   * @param {number} value - 要插入的节点值
   */
  insert(value) {
    // 1. 根据value创建对应的节点
    const newNode = new BinarySearchTreeNode(value);
    // 2. 插入节点
    if (this.root) {
      this.insertNode(this.root, newNode);
    } else {
      this.root = newNode;
    }
  }
  /**
   * 递归地插入节点到二叉搜索树中的合适位置
   * @param {Node} node - 当前节点
   * @param {Node} newNode - 要插入的新节点
   */
  insertNode(node, newNode) {
    if (newNode.value < node.value) {
      // 向左查找：如果新节点的值小于当前节点的值，则将新节点插入当前节点的左子树
      if (node.left === null) {
        node.left = newNode;
      } else {
        this.insertNode(node.left, newNode);
      }
    } else {
      // 向右查找：如果新节点的值大于等于当前节点的值，则将新节点插入当前节点的右子树
      if (node.right === null) {
        node.right = newNode;
      } else {
        this.insertNode(node.right, newNode);
      }
    }
  }
  

  /**
   * 先序遍历
   * @returns {number[]} - 有序的节点值数组
   */
  preOrderTraverse() {
    const result = [];
    this.preOrderTraverseNode(this.root, result);
    return result;
  }
  /**
   * 递归地先序遍历二叉搜索树
   * @param {Node} node - 当前节点
   * @param {number[]} result - 保存遍历结果的数组
   */
  preOrderTraverseNode(node, result) {
    if (node) {
      // 1. 处理经过的节点
      result.push(node.value);
      // 2. 查找左子树中的节点
      this.preOrderTraverseNode(node.left, result);
      // 3. 查找右子树种的节点
      this.preOrderTraverseNode(node.right, result);
    }
  }

  /**
   * 中序遍历二叉搜索树（升序输出）
   * @returns {number[]} - 有序的节点值数组
   */
  inorderTraverse() {
    const result = [];
    this.inorderTraverseNode(this.root, result);
    return result;
  }
  /**
   * 递归地中序遍历二叉搜索树
   * @param {Node} node - 当前节点
   * @param {number[]} result - 保存遍历结果的数组
   */
  inorderTraverseNode(node, result) {
    if (node) {
      // 1. 查找左子树中的节点
      this.inorderTraverseNode(node.left, result);

      // 2. 处理节点
      result.push(node.value);

      // 3. 查找右子树种的节点
      this.inorderTraverseNode(node.right, result);
    }
  }

  /**
   * 后续遍历二叉搜索树（升序输出）
   * @returns {number[]} - 有序的节点值数组
   */
  postOrderTraverse() {
    const result = [];
    this.postOrderTraverseNode(this.root, result);
    return result;
  }
  /**
   * 递归地后序遍历二叉搜索树
   * @param {Node} node - 当前节点
   * @param {number[]} result - 保存遍历结果的数组
   */
  postOrderTraverseNode(node, result) {
    if (node) {
      // 1. 查找左子树中的节点
      this.inorderTraverseNode(node.left, result);
      // 2. 查找右子树种的节点
      this.inorderTraverseNode(node.right, result);
      // 3. 处理节点
      result.push(node.value);
    }
  }

  /**
   * 找到二叉搜索树中最小的节点值
   * @returns 最小节点的值
   */
  min() {
    // 1. 判断根节点是否存在
    if (!this.root) {
      return null;
    }
    // 2. 存在，则查找最小节点
    const minNode = this.findMinNode(this.root);
    // 3. 返回最小节点的值
    return minNode.value;
  }
  /**
   * 找到二叉搜索树中最小的节点
   * @param {Node} node - 当前节点
   * @returns {Node} - 最小节点
   */
  findMinNode(node) {
    if (!node.left) {
      return node;
    } else {
      return this.findMinNode(node.left);
    }
  }

  /**
   * 最大值
   * @returns
   */
  max() {
    // 1. 判断根节点是否存在
    if (!this.root) {
      return null;
    }
    // 2. 存在，则查找最大节点
    const maxNode = this.findMaxNode(this.root);
    // 3. 返回最大节点的值
    return maxNode.value;
  }
  /**
   * 找到二叉搜索树中最大的节点
   * @param {Node} node - 当前节点
   * @returns {Node} - 最大节点
   */
  findMaxNode(node) {
    if (node.right === null) {
      return node;
    } else {
      return this.findMaxNode(node.right);
    }
  }

  /**
   * 在二叉搜索树中查找指定值的节点
   * @param {number} value - 要查找的值
   * @returns {Node|null} - 找到的节点，若未找到则返回null
   */
  search(value) {
    return this.searchNode(this.root, value);
  }

  /**
   * 递归地在二叉搜索树中查找指定值的节点
   * @param {Node} node - 当前节点
   * @param {number} value - 要查找的值
   * @returns {Node|null} - 找到的节点，若未找到则返回null
   */
  searchNode(node, value) {
    // 若节点为空或节点的值等于要查找的值，则返回节点
    if (node === null || node.value === value) {
      return node;
    }
    // 如果要查找的值小于当前节点的值，则在左子树中递归查找
    else if (value < node.value) {
      return this.searchNode(node.left, value);
    }
    // 如果要查找的值大于当前节点的值，则在右子树中递归查找
    else {
      return this.searchNode(node.right, value);
    }
  }

  /**
   * 从二叉搜索树中删除指定值的节点
   * @param {number} value - 要删除的节点值
   */
  remove(value) {
    // 更新根节点的引用，以便反映删除操作后的二叉搜索树的变化
    this.root = this.removeNode(this.root, value);
  }

  /**
   * 递归地从二叉搜索树中删除指定值的节点
   * @param {Node} node - 当前节点
   * @param {number} value - 要删除的节点值
   * @returns {Node|null} - 删除节点后的新子树根节点
   */
  removeNode(node, value) {
    if (node === null) {
      return null;
    }

    if (value < node.value) {
      node.left = this.removeNode(node.left, value);
      return node;
    } else if (value > node.value) {
      node.right = this.removeNode(node.right, value);
      return node;
    } else {
      // 当前节点为要删除的节点
      // 情况1: 要删除的节点为叶子节点
      if (node.left === null && node.right === null) {
        node = null;
        return node;
      }

      // 情况2: 要删除的节点只有一个子节点
      if (node.left === null) {
        node = node.right;
        return node;
      } else if (node.right === null) {
        node = node.left;
        return node;
      }

      console.log(node, '<--')
      // 情况3: 要删除的节点有两个子节点
      const minNode = this.findMinNode(node.right);
      node.value = minNode.value;
      node.right = this.removeNode(node.right, minNode.value);
      return node;
    }
  }
}
