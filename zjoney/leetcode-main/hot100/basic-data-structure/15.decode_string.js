/**
 * 考察：栈
 * @difficulty 中等
 * @summary 394. 字符串解码Decode String
 * 给定一个经过编码的字符串，返回它解码后的字符串。
编码规则为: k[encoded_string]，表示其中方括号内部的 encoded_string 正好重复 k 次。注意 k 保证为正整数。
你可以认为输入字符串总是有效的；输入字符串中没有额外的空格，且输入的方括号总是符合格式要求的。
此外，你可以认为原始数据不包含数字，所有的数字只表示重复的次数 k ，例如不会出现像 3a 或 2[4] 的输入。

示例 1：
输入：s = "3[a]2[bc]"
输出："aaabcbc"
 */
var decodeString = function (s) {
  // 用两个栈来存放当前状态，前者是重复次数，后者是累积字符串
  let repetStack = [], resStack = [];
  //拼接字符串
  debugger
  let resStr = "";
  //表示重复次数
  let repet = 0;
  // 遍历s
  for (let i = 0; i < s.length; i++) {
    let cur = s.charAt(i);
    if (cur == '[') {
      //双双压入栈中,保存当前状态
      repetStack.push(repet);
      resStack.push(resStr);
      //置空，准备下面的累积
      repet = 0;
      resStr = "";
    } else if (cur == ']') {
      // 取出当前重复次数栈中的值，也就是当前字符串的重复次数
      let count = repetStack.pop();
      // 根据重复次数生成重复字符串，赋值给temp，和resStr拼接
      let temp = "";
      for (let i = 0; i < count; i++) {
        temp += resStr;
      }
      // 和前面已经求得的字符串进行拼接
      resStr = resStack.pop() + temp;
    } else if (cur >= '0' && cur <= '9') {
      // repet累积
      repet = repet * 10 + (cur - '0');
    } else {
      //字符累积
      resStr += cur;
    }
  }
  return resStr;
};