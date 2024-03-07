const triangle = [[-1], [2, 3], [1, -1, -3]]
var minimumTotal = function (triangle) {
    let sum = 0;
    let temp = 0;
    let tempVar = 0;
    let length = 0;
    for (let i = 0; i < triangle.length; i++) {
        temp = triangle[i][tempVar];
        length = Math.min(triangle[i].length, tempVar + 2);
        for (let j = tempVar; j < length; j++) {
            temp = Math.min(triangle[i][j], temp)
        }
        tempVar = triangle[i].indexOf(temp);
        sum += temp;
    }
    return sum;
};
console.log(minimumTotal(triangle));
// 第2个找出最小值

// 每一步取最小值暴力破解法走不通

// 把所有路径都求出来，比较