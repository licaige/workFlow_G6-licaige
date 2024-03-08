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

function largestValues (root: TreeNode | null): number[] {
    if (root === null) {
        return [];
    }
    const result:number[] = [];
    levelOrder([root, ], result);
    return result;
}

function levelOrder (levelNodes:TreeNode[], result:number[]) {
    let maxVal:number = levelNodes[0].val;
    const nextNodes:TreeNode[] = [];
    for (let i = 0; i < levelNodes.length; i++) {
        const node = levelNodes[i];
        maxVal = Math.max(maxVal, node.val);
        node.left !== null && nextNodes.push(node.left);
        node.right !== null && nextNodes.push(node.right);
    }
    result.push(maxVal);
    nextNodes.length > 0 && levelOrder(nextNodes, result);
}
