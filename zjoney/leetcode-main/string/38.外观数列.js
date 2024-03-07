/**
 * 考察：字符串
 * @difficulty 中等
 * @summary: 38. 外观数列
 * 给定一个正整数 n ，输出外观数列的第 n 项。
「外观数列」是一个整数序列，从数字 1 开始，序列中的每一项都是对前一项的描述。
你可以将其视作是由递归公式定义的数字字符串序列：

countAndSay(1) = "1"
countAndSay(n) 是对 countAndSay(n-1) 的描述，然后转换成另一个数字字符串。
前五项如下：
1.     1
2.     11
3.     21
4.     1211
5.     111221
第一项是数字 1 
描述前一项，这个数是 1 即 “ 一 个 1 ”，记作 "11"
描述前一项，这个数是 11 即 “ 二 个 1 ” ，记作 "21"
描述前一项，这个数是 21 即 “ 一 个 2 + 一 个 1 ” ，记作 "1211"
描述前一项，这个数是 1211 即 “ 一 个 1 + 一 个 2 + 二 个 1 ” ，记作 "111221"
要 描述 一个数字字符串，首先要将字符串分割为 最小 数量的组，每个组都由连续的最多 相同字符 组成。然后对于每个组，先描述字符的数量，然后描述字符，形成一个描述组。要将描述转换为数字字符串，先将每组中的字符数量用数字替换，再将所有描述组连接起来。

例如，数字字符串 "3322251" 的描述如下图：
images/appearance.png
示例 1：

输入：n = 1
输出："1"
解释：这是一个基本样例。
 */
/**
 * 方法一：
 */
// var countAndSay = function (n) {
//   if (n === 1) {
//     return '1'
//   };
//   let str = '1';
//   let flag = 1;
//   let result = '';
//   while (flag < n) {
//     result = ''; // 这里需要每次进循环的时候把result置为空
//     let chart = str.charAt(0);
//     let count = 1;
//     for (let i = 1; i < str.length; i++) {
//       if (str[i] === chart) {
//         count++
//       } else {
//         result = result.concat(count);
//         result = result.concat(chart);
//         count = 1;
//         chart = str[i];
//       }
//     }
//     result = result.concat(count);
//     result = result.concat(chart);
//     str = result; // 更新str的置
//     flag++;
//   }
//   console.log('result', result)
//   return result;
// }
/**
 * 方法二：
 */
 var countAndSay = function(n) {
  
  let cache = [, '1']

  // 通过第n-1项字符串计算出第n项字符串
  let calcStr = s => {
    debugger
    let activeNum = s[0]
    let times = 1
    let res = ''
    for (let i = 1; i <= s.length; i++) {
      let v = s[i]
      if (activeNum !== v) {
        res = res + times + activeNum
        times = 1
        activeNum = v
      } else {
        activeNum = v
        times++
      }
    }

    return res
  }

  for (let i = 2; i <= n; i++) {
    cache[i] = calcStr(cache[i - 1])
  }
console.log('cache[n]', cache[n])
  return cache[n]
}
countAndSay(4)