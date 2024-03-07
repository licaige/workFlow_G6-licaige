/**
字符串的排列组合
题目：输入一个字符串，打印出该字符串中，所有字符的排列组合
输入：'abc'
输出：['abc', 'acb', 'bca', 'bac', 'cab', 'cba']
 * @param {string} s
 * @return {string[]}
 * 全排列算法:
 *   固定位置依次递归交换位置穷举出所有的可能性。
 */
var permutation = function (s) {
  const char = s.split('');
  const res = [];
  const dsf = function (n) {
    // 递归的出口,如果是遍历到最后一个位置此方法就解了
    if (n === char.length) {
      res.push(char.join(''));
      return;
    }
    const catSet = new Set();
    for (let i = n; i < char.length; i++) {
      //如果有相同的交换，则不需要处理枝减。
      if (catSet.has(char[i])) continue;
      catSet.add(char[i]);
      // 被固定的位置和其他位置依次交换位置
      { const t = char[n]; char[n] = char[i]; char[i] = t }
      // 递归下一个位置  
      dsf(n + 1);
      // 被交换的位置需要回溯归位。
      { const t = char[n]; char[n] = char[i]; char[i] = t }
    }
  }
  dsf(0);
  return res.sort();
};

const str = "abc";
console.log('first', permutation(str));
