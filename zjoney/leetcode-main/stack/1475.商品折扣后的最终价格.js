/**
 * 考察:栈
 * @difficulty简单
 * @summary 1475. 商品折扣后的最终价格
 * 给你一个数组 prices ，其中 prices[i] 是商店里第 i 件商品的价格。
商店里正在进行促销活动，如果你要买第 i 件商品，那么你可以得到与 prices[j] 相等的折扣，其中 j 是满足 j > i 且 prices[j] <= prices[i] 的 最小下标 ，如果没有满足条件的 j ，你将没有任何折扣。
请你返回一个数组，数组中第 i 个元素是折扣后你购买商品 i 最终需要支付的价格。
示例：
输入：prices = [8,4,6,2,3]
输出：[4,2,4,2,3]
解释：
商品 0 的价格为 price[0]=8 ，你将得到 prices[1]=4 的折扣，所以最终价格为 8 - 4 = 4 。
商品 1 的价格为 price[1]=4 ，你将得到 prices[3]=2 的折扣，所以最终价格为 4 - 2 = 2 。
商品 2 的价格为 price[2]=6 ，你将得到 prices[3]=2 的折扣，所以最终价格为 6 - 2 = 4 。
商品 3 和 4 都没有折扣。

题目理解：
1、当前栈顶的元素大于 prices[i]，则将栈顶元素出栈，直到小于等于prices[i]
2、当前栈顶的元素小于等于prices[i]，
 */
var finalPrices = function (prices) {
  debugger;
  // 单调栈
  const n = prices.length;
  const ans = new Array(n).fill(0);
  const stack = [];
  // 比较折扣就从右往左遍历
  for (let i = n - 1; i >= 0; i--) {
    // 栈顶值比当前元素大，就弹出栈顶元素
    while (stack.length && stack[stack.length - 1] > prices[i]) {
      stack.pop();
    }
    // 栈顶不为空，存入当前值减栈顶最大值
    ans[i] = stack.length === 0 ? prices[i] : prices[i] - stack[stack.length - 1];
    // 当前值压入栈顶
    stack.push(prices[i]);
  }
  return ans;
};
const ans = [8, 4, 6, 2, 3];
// console.log(finalPrices(ans));//[4,2,4,2,3]