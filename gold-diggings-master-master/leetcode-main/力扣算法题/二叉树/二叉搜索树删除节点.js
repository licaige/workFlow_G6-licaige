// 450. 删除二叉搜索树中的节点

// 见notion题解

var deleteNode = function (root, key) {

    if (!root.val) return root


    let res = null
    // 找到需要删除的节点(同时返回父节点)
    const find = (node, _return, tag) => {
        if (!node) return

        if (node.val > key) {
            find(node.left, node, "left")
        }
        else if (node.val < key) {
            find(node.right, node, "right")
        }
        else if (node.val == key) {
            res = { node, _return, tag }
        }
    }

    const { node, _return, tag } = find(root, null, "")

    // 四种情况删除节点
    if (!node.left && !node.right) {
        if (root == node) {
            return null
        }
        if (tag == 'left') { _return.left = null }
        else if (tag == 'right') { _return.right = null }

        return root
    }

    if (node.left && !node.right) {

        if (root == node) {
            return root.left
        }

        if (tag == 'left') {
            _return.left = node.left
        }
        else if (tag == 'right') {
            _return.right = node.left
        }

        return root
    }

    else if (!node.left && node.right) {

        if (root == node) {
            return root.right
        }

        if (tag == 'left') {
            _return.left = node.right
        }
        else if (tag == 'right') {
            _return.right = node.right
        }

        return root
    }

    // 需要删除的节点既有左子树  又有右子树
    else if (node.left && node.right) {
        // 找到最右下叶子节点的兄弟节点
        let leaf = node.right
        let parent = node
        while (leaf.right) {
            parent = leaf
            leaf = leaf.right
        }

        // 将左子树链接到右下叶子结点上
        if (parent.left) {
            parent.left.left = node.left
        } else {
            parent.right.left = node.left
        }

        // 删除节点链接
        if (root == node) {
            return root.right
        }
        if (tag == 'left') {
            _return.left = node.right
        }
        else if (tag == 'right') {
            _return.right = node.right
        }

        return root
    }
};



/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} key
 * @return {TreeNode}
 */
var deleteNode = function (root, key) {
    if (root === null)
        return root;
    if (root.val === key) {
        if (!root.left)
            return root.right;
        else if (!root.right)
            return root.left;
        else {
            let cur = root.right;
            while (cur.left) {
                cur = cur.left;
            }
            cur.left = root.left;
            root = root.right;
            delete root;
            return root;
        }
    }
    if (root.val > key)
        root.left = deleteNode(root.left, key);
    if (root.val < key)
        root.right = deleteNode(root.right, key);
    return root;
};



// 使用start给for循环做标签
start: for (let i = 0; i < 10; i++) {
    if (num > 5) {
        // 可以通过标签指定continue,break所执行的循环语句
        // 在多层循环嵌套的情况下可以实现复杂操作
        continue start;
    }
    num++
}