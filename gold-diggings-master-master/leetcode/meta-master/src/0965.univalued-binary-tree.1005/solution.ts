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

function isUnivalTree (root: TreeNode | null): boolean {
    if (root === null) {
        return true;
    }
    return check(root, root.val);
}

function check (root:TreeNode|null, val:number):boolean {
    if (root === null) {
        return true;
    }
    return root.val === val && check(root.left, val) && check(root.right, val);
}
