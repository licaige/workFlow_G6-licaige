package com.coding.patterns.tree;

class BalancedBinaryTree {

    private static Pair<Boolean, Integer> dfs(TreeNode root) {
        if (root == null) {
            return new Pair<Boolean, Integer>(true, 0);
        }

        var left = dfs(root.left);
        var right = dfs(root.right);

        var balanced =
            left.getKey() &&
            right.getKey() &&
            (Math.abs(left.getValue() - right.getValue()) <= 1);

        return new Pair<Boolean, Integer>(
            balanced,
            1 + Math.max(left.getValue(), right.getValue())
        );
    }

    public static boolean isBalanced(TreeNode root) {
        return dfs(root).getKey();
    }
}

// Solution using the bottom up approach
// TC and SC is On

class Solution {

    public int height(TreeNode root){
        if(root == null){
            return 0;
        }

        int lh = height(root.left);
        int rh = height(root.right);

        return 1 + Math.max(lh,rh);
    }

    public boolean isBalanced(TreeNode root) {

        if(root == null){
            return true;
        }

        int lh = height(root.left);
        int rh = height(root.right);

        return Math.abs(lh - rh) <= 1 && isBalanced(root.left) && isBalanced(root.right);
    }
}