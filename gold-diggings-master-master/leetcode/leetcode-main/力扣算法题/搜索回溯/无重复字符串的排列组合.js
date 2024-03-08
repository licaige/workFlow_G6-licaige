// 无重复字符串的排列组合。编写一种方法，
// 计算某字符串的所有排列组合，字符串每个字符均不相同。

// 示例1:

//  输入：S = "qwe"
//  输出：["qwe", "qew", "wqe", "weq", "ewq", "eqw"]


// 简单的回溯应用
var permutation = function (S) {
    const result = []
    const firstLeft = S.split("")

    const dfs = (left, res) => {
        if (left.length == 0) return result.push(res)

        for (let i = 0; i < left.length; i++) {
            // let nextLeft = left.slice() // 代替[...left] 进行数组深拷贝
            let nextLeft = [...left] 
            nextLeft.splice(i, 1)
            let nextRes = res + left[i]
            dfs(nextLeft, nextRes)
        }
    }

    dfs(firstLeft, "")

    return result
};


console.time("1")
let str = "qwertyuiop"
permutation(str)
console.timeEnd("1")

