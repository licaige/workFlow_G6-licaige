//面试题 01.07. 旋转矩阵

// https://leetcode.cn/problems/rotate-image/?favorite=2cktkvj
// 给定一个 n × n 的二维矩阵 matrix 表示一个图像。请你将图像顺时针旋转 90 度。
// 你必须在 原地 旋转图像，这意味着你需要直接修改输入的二维矩阵。请不要 使用另一个矩阵来旋转图像。

// 方案一  使用辅助数组,  不能使用另一个矩阵,但是可使用另一个数组保存转换后的结果????
// https://leetcode.cn/problems/rotate-image/solutions/526980/xuan-zhuan-tu-xiang-by-leetcode-solution-vu3m/?orderBy=most_votes

// 对于原矩阵的每一行, 都转换为了之后矩阵的每一列


// 1 2 3    // 0 0 1 
// 0 0 0    // 0 0 2
// 0 0 0    // 0 0 3

var rotate = function (matrix) {
    // 辅助数组 保存了第一次遍历的结果[1,2,3,4,5,6,7,8,9]
    let resList = []
    let length = matrix.length

    // 逐行遍历矩阵
    for (let y = 0; y < length; y++) {
        for (let x = 0; x < length; x++) {
            resList.push(matrix[y][x])
        }
    }

    // 进行结果填充
    for (let x = length - 1; x >= 0; x--) {
        for (let y = 0; y < length; y++) {
            matrix[y][x] = resList.shift()
        }
    }

    return matrix
};

rotate([[1, 2, 3], [4, 5, 6], [7, 8, 9]])