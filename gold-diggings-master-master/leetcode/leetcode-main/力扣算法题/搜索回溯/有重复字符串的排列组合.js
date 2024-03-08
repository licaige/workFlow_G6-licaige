// 有重复字符串的排列组合。编写一种方法，计算某字符串的所有排列组合。

// 示例1:

// 输入：S = "qqe"
// 输出：["eqq","qeq","qqe"]


// 简单的回溯应用
var permutation = function (S) {
    const result = new Set()
    const firstLeft = S.split("")

    const dfs = (left, res) => {
        if (left.length == 0) return result.add(res)

        for (let i = 0; i < left.length; i++) {
            // let nextLeft = left.slice() // 代替[...left] 进行数组深拷贝
            let nextLeft = [...left]
            nextLeft.splice(i, 1)
            let nextRes = res + left[i]
            dfs(nextLeft, nextRes)
        }
    }

    dfs(firstLeft, "")
    debugger
    return Array.from(result)
};



let str = "qqe"
permutation(str)

