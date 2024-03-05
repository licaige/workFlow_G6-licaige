/*
 * @Author: Luzy
 * @Date: 2023-07-31 09:45:31
 * @LastEditors: Luzy
 * @LastEditTime: 2023-08-01 10:18:26
 * @Description: 
 */


// 给定两个整数数组a和b，计算具有最小差绝对值的一对数值（每个数组中取一个值），并返回该对数值的差

// 输入：{1, 3, 15, 11, 2}, {23, 127, 235, 19, 8}
// 输出：3，即数值对(11, 8)


// c = a - b 

// 方案  先排序  双指针


var smallestDifference = function (a, b) {
    // 排序
    a.sort((a, b) => a - b)
    b.sort((a, b) => a - b)

    // 双指针更新min
    let min = Infinity

    for (let i = 0; i < a.length; i++) {
        if (min == 0) break
        for (let j = 0; j < b.length; j++) {
            if (min == 0) break
            // 计算本次差值
            let res = Math.abs(a[i] - b[j])
            if (res < min) {
                min = res
            }
            // 如果a<=b b后移动,差值增大 跳出循环            
            if (a[i] <= b[j]) break
            // 如果a>b b后移动,差值减小,继续循环(不做判断)
        }
    }

    debugger
    return min
};


smallestDifference(
    [1, 3, 15, 11, 2],
    [23, 127, 235, 19, 8]
)