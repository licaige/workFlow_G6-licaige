/**
 * 考察：栈
 * @difficulty 简单
 * @summary 20. 有效的括号
 * 给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串 s ，判断字符串是否有效。
 * 有效字符串需满足：
 * 左括号必须用相同类型的右括号闭合。
左括号必须以正确的顺序闭合。
每个右括号都有一个对应的相同类型的左括号。
 
示例 1：

输入：s = "()"
输出：true
 */
/**
 * 1、提前记录好右括号类型), }, ] 和 左括号类型 (, {, [ 的映射表，当遍历中遇到左括号的时候，就放入栈 stack；
 * 2、当遇到右括号时，就把 stack 顶的元素 pop 出来，看一下是否是这个右括号所匹配的左括号（比如 ( 和 ) 是一对匹配的括号）,不匹配则 返回 false；
 * 3、当遍历结束后，栈中不应该剩下任何元素，返回 true ，否则返回 false。
 * @param {*} s 
 * @returns 
 */
var isValid = function(s) {
  const charMap = { // 记录好右括号类型), }, ] 和 左括号类型 (, {, [ 的映射表
    ')': '(',
    '}': '{',
    ']': '['
  }
  const stack = []
  for(let i = 0; i < s.length; i ++) {
    const c = s[i]
    if(charMap[c]) {// 当遇到右括号时
      const charPop = stack.pop() // 就把 stack 顶的元素 pop 出来
      // 栈顶、和当前字符串 是否一对匹配的括号,不匹配则 返回 `false`
      if(charPop !== charMap[c]) return false
    } else {
      stack.push(c)
    }
  }
  return stack.length === 0
};
const s = "(]"
console.log(isValid(s))
