/*
 * @Author: Luzy
 * @Date: 2023-08-08 21:41:42
 * @LastEditors: Luzy
 * @LastEditTime: 2023-08-08 22:01:02
 * @Description: 
 */

// 面试题 16.13. 平分正方形



// 输入：
// square1 = {-1, -1, 2}
// square2 = {0, -1, 2}
// 输出： {-1,0,2,0}
// 解释： 直线 y = 0 能将两个正方形同时分为等面积的两部分，返回的两线段端点为[-1,0]和[2,0]


// 方案  已知正方形坐标和边长 
// 正方形两个中心的连线即平分正方形

// 算出直线后, 计算所有正方形和直线的交点(难点)
// 排序后取第一个和最后一个点即可

var cutSquares = function (square1, square2) {
    // 正方形A的中心
    let pointA = {
        x: square1[0] + square1[2] / 2,
        y: square1[1] + square1[2] / 2,
    }
    // 正方形B的中心
    let pointB = {
        x: square2[0] + square2[2] / 2,
        y: square2[1] + square2[2] / 2,
    }

    // 根据两点求出连线斜截式
    // y = kx + b
    // pointA.y = k * pointA.x + b
    // pointB.y = k * pointB.x + b
    debugger
    let k = (pointA.y - pointB.y) / (pointA.x - pointB.x)
    let b = pointA.y - k * pointA.x

};

let square1 = [- 1, -1, 2],
    square2 = [0, - 1, 2]

cutSquares(square1, square2)