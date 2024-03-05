
// 零矩阵
// https://leetcode.cn/problems/zero-matrix-lcci/solutions/742402/ling-ju-zhen-by-leetcode-solution-7ogg/

var setZeroes = function (matrix) {

    // 两个标记记录第一行第一列是否有0出现
    let line = false
    let row = false

    // 遍历矩阵  记录0出现情况
    // todo 注意这里要从第1项开始执行,否则会冲突
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[0].length; x++) {

            let num = matrix[y][x]
            // 判断第一行第一列是否有0
            if (y === 0 && num === 0) { line = true }
            if (x === 0 && num === 0) { row = true }

            // 使用第一行,第一列数组记录行列是否有0
            if (num === 0) {
                matrix[0][x] = true
                matrix[y][0] = true
            }
        }
    }


    // 遍历第一行修改矩阵
    for (let x = 1; x < matrix[0].length; x++) {
        if (matrix[0][x] === true) {
            for (let y = 0; y < matrix.length; y++) {
                matrix[y][x] = 0
            }
        }
    }

    //  遍历第一列修改矩阵
    for (let y = 1; y < matrix.length; y++) {
        if (matrix[y][0] === true) {
            for (let x = 0; x < matrix[0].length; x++) {
                matrix[y][x] = 0
            }
        }
    }

    // 置零第一行第一列
    if (line) {
        for (let x = 0; x < matrix[0].length; x++) {
            matrix[0][x] = 0
        }
    }


    if (row) {
        for (let y = 0; y < matrix.length; y++) {
            matrix[y][0] = 0
        }
    }
};



setZeroes([[1, 1, 1], [0, 1, 2]])