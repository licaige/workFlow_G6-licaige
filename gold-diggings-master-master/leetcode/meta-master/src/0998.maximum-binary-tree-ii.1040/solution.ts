class TreeNode {
    val: number
    left: TreeNode | null
    right: TreeNode | null
    constructor (val?: number, left?: TreeNode | null, right?: TreeNode | null) {
        this.val = (val === undefined ? 0 : val);
        this.left = (left === undefined ? null : left);
        this.right = (right === undefined ? null : right);
    }
}

function insertIntoMaxTree (root: TreeNode | null, val: number): TreeNode | null {
    if (root === null) {
        return new TreeNode(val);
    }
    if (val > root.val) {
        const node = new TreeNode(val);
        node.left = root;
        return node;
    } else {
        root.right = insertIntoMaxTree(root.right, val);
        return root;
    }
}
