

// 2390. 从字符串中移除星号
// https://leetcode.cn/problems/removing-stars-from-a-string/?envType=study-plan-v2&envId=leetcode-75


// 在一步操作中，你可以：

// 1. 选中 s 中的一个星号。
// 2. 移除星号 左侧 最近的那个 非星号 字符，并移除该星号自身。

// 输入：s = "leet**cod*e"
// 输出："lecoe"


// 方案 就是普通的栈  准备两个栈  一个放字母 一个放星号

var removeStars = function (s) {

    let stackL = []
    let stackS = 0

    // 倒序遍历  入栈
    for (let i = s.length - 1; i >= 0; i--) {
        if (s[i] == "*") {
            stackS++
        } else {
            if (stackS > 0) {
                stackS--
                continue
            } else {
                stackL.push(s[i])
            }
        }
    }

    // 组装结果
    return stackL.reverse().join('');
};

//  或者直接准备一个栈  遇到星号弹出   
var removeStars = function (s) {
    let res = [];
    for (let i = 0; i < s.length; i++) {
       if(s[i] == '*'){
           res.pop();
       }else{
           res.push(s[i])
       }
    }
    return res.join('')
};