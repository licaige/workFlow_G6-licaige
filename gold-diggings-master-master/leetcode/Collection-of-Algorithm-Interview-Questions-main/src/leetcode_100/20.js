/**
 * 有效的括号HOT
 * https://leetcode-cn.com/problems/valid-parentheses/
 * @param {*} s 
 */
var isValid = function(s) {
  // 给三种类型的括号定义一个数字，所有左括号类型都为正数，右括号类型都为复数
  // 所以考虑形如‘)(’这种字符串则是无效的，需要排除掉该类型的字符串
  // 首先排除奇数长度的字符串，肯定是非法的
  const n = s.length;
  if ((n & 1) === 1) return false;
  const map = {
    '(': 1,
    ')': -1,
    '{': 2,
    '}': -2,
    '[': 3,
    ']': -3
  };
  // 使用栈来进行判断
  const stack = [];
  for(let i = 0; i < n; i++) {
    // 考虑何时进行入栈操作，首先想到的就是栈顶元素和当前遍历到的元素相加为0，说明括号时合法的
    // 针对上面说的‘)(’，也就是栈顶元素小于0的情况下，即使和当前遍历的元素相加为0，也是不合法的情况，需要进行排除，所以总结下面三种情况：
    // 1.栈为空时；2.栈顶元素小于0；3.栈顶元素和当前元素相加不为0
    if (stack.length === 0 || stack[stack.length - 1] < 0 || stack[stack.length - 1] + map[s[i]] !== 0) {
      stack.push(map[s[i]]);
    } else {
      stack.pop();
    }
  }
  return stack.length === 0;
}

// console.log(isValid('{]'));

module.exports = isValid;
