
//  递归乘法。 写一个递归函数，不使用 * 运算符，
//  实现两个正整数的相乘。可以使用加号、减号、位移，但要吝啬一些。


// 思路 使用较大的数字作为递增值  较小的数字作为递增次数
var multiply = function (A, B) {
    const val = Math.max(A, B)
    const times = Math.min(A, B)

    const deep = (r, t) => {
        if (t == 0) return r
        return deep(r + val, t - 1)
    }

    return deep(0, times)
};

console.log(multiply(3, 4));



var multiply = function (A, B) {
    const val = Math.max(A, B),
        times = Math.min(A, B)

    const deep = (r, t) => {
        if (t == 0) return r
        return deep(r + val, t - 1)
    }

    return deep(0, times)
};

// 非递归解法

var multiply = function (A, B) {
    if (A == 0 || B == 0) return 0;

    var result = 0;
    for (var i = 0; i < B; i++) {
        result += A;
    }
    return result;
}

