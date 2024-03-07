/**
 * 考察：动态规划
 * @difficulty困难
 * @summary: 72. 编辑距离
 * 给你两个单词 word1 和 word2， 请返回将 word1 转换成 word2 所使用的最少操作数  。
 * 你可以对一个单词进行如下三种操作：
 * 插入一个字符
 * 删除一个字符
 * 替换一个字符
 * 
 * 栗子:
 * 输入：word1 = "horse", word2 = "ros"
 * 输出：3
 * 解释：
 * horse -> rorse (将 'h' 替换为 'r')
 * rorse -> rose (删除 'r')
 * rose -> ros (删除 'e')
 * 题目理解：
 * dp[i][j] 表示以下标i-1为结尾的字符串word1，i-1在后续公式中更容易理解
 * dp矩阵中一定是从左到右从上到下去遍历。
 * dp[i][j]是依赖左方，上方和左上方元素的.也就是dp[i][j] = Math.min(Math.min(dp[i - 1][j], dp[i - 1][j - 1]), dp[i][j - 1]) + 1;

 */
 var minDistance = function(word1, word2){
  debugger;
  let n1 = word1.length;
  let n2 = word2.length;
  const dp = new Array(n1 + 1).fill(0).map(() => new Array(n2 + 1).fill(0));

  // 初始值
  for (let j = 1; j <= n2; j++) dp[0][j] = dp[0][j - 1] + 1;
  for (let i = 1; i <= n1; i++) dp[i][0] = dp[i - 1][0] + 1;
  // 通过公式推出 dp[n1][n2]
  for (let i = 1; i <= n1; i++) {
    for (let j = 1; j <= n2; j++) {
      // 如果 word1[i] 与 word2[j] 相等。第 i 个字符对应下标是 i-1
      if (word1.charAt(i - 1) == word2.charAt(j - 1)) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        /**
         * 替换f[i - 1][j - 1] + 1
         * 删除min(f[i - 1][j], f[i][j - 1]) + 1;删除word1的第i个或者删除word2的第j个
         * 插入min(f[i - 1][j], f[i][j - 1]) + 1;word2[j] 或者word1[i] 后面添加
         */
        // dp[i][j] = Math.min(Math.min(dp[i - 1][j - 1], dp[i][j - 1]), dp[i - 1][j]) + 1;
        // dp[i][j] = Math.min(Math.min(dp[i - 1][j], dp[i][j - 1]), dp[i - 1][j - 1]) + 1;
        dp[i][j] = Math.min(Math.min(dp[i - 1][j], dp[i - 1][j - 1]), dp[i][j - 1]) + 1;
      }
    }
  }
  return dp[n1][n2]; 
};

console.log(minDistance('rosy', 'horse'));// 3