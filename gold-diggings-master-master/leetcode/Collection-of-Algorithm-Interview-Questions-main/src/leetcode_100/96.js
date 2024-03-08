/**
 * 不同的二叉搜索树
 * https://leetcode.cn/problems/unique-binary-search-trees/
 * @param {number} n
 * @return {number}
 */
 var numTrees = function(n) {
  /**
      分析：
      1. 动态规划的思路
      2. 互不相同，表示以不同的节点作为树的根
      3. F(i,n)表示以i为根节点，总共有n个节点构成的树的个数
      4. G(n)表示n个节点构成的树的个数，G(n)=F(1,n) + F(2, n) + ... + F(n, n)也就是所求的答案
      5. F(i, n)分解为左子树[0, i-1]、根节点i，以及右子树[n-i]，F(i,n)就是G(i-1)、G(n-1)的笛卡尔积
      6. 结合4、5，可推导递推公式：G(n) = 
   */
  const G = new Array(n+1).fill(0);
  // 基础case
  G[0] = 1;
  G[1] = 1;
  // 从2开始计算
  for (let i = 2; i <= n; i++) {
    // 内层从1开始，因为节点是从1开始到n结束;判断条件是小于i，计算1,i的节点的树的个数
    for (let j = 1; j <= i; j++) {
      G[i] = G[j-1] * G[i-j];
    }
  }
  return G[n];
};
