


// 括号。设计一种算法，打印n对括号的所有合法的（例如，开闭一一对应）组合。

// 例如，给出 n = 3，生成结果为：
// 生成三组括号能组成的所有有效组合


// [
//     "((()))",
//     "(()())",
//     "(())()",
//     "()(())",
//     "()()()"
// ]



// 校验有效括号
var isValid = function (s) {
    if (s.length % 2 !== 0) return false
    const map = new Map([
        [')', '(']
    ])
    const stack = []
    for (const item of s) {
        if (!map.get(item)) {
            stack.push(item)
        } else {
            if (stack.pop() !== map.get(item)) return false
        }
    }
    return !stack.length
};

// 方案一: 生成左括号,右括号组成的二叉树, 记录path进行校验
var generateParenthesis = function (n) {

    const pathList = []
    const res = []
    const dfs = (path, l, r) => {
        if (l > n || r > n) return

        // 结尾必须是 ")"
        if (path.length >= 2 * n && path[2 * n - 1] == ")") {
            pathList.push(path)
            return
        }

        dfs(path + "(", l + 1, r)
        dfs(path + ")", l, r + 1)
    }

    dfs("(", 1, 0)
    debugger

    // 再进行双栈校验
    pathList.forEach(s => {
        if (isValid(s)) {
            res.push(s)
        }
    })
    debugger
    return res
};

generateParenthesis(3)