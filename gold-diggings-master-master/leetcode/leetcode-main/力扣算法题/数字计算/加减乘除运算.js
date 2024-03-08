

// 面试题 16.09. 运算

// 只用加法和逻辑运算符  实现数字的  加减乘除

// 乘法的本质是加法
// 除法的本质是减法  (注这里不能使用log进行计算)
// 减法操作实现:  正数转负数  通过补码实现负数


//todo 补码实现负数操作
// let a = 100
// let b = ~a + 1 // -100




function getAbs(num) {

    let plus = false
    let abs = num

    if (num > 0) {
        plus = true
    } else {
        abs = ~num + 1
    }

    return { plus, abs }
}

var Operations = function () {

};

/** 
 * @param {number} a 
 * @param {number} b
 * @return {number}
 */
Operations.prototype.minus = function (a, b) {
    return a + (~b + 1)
};

/** 
 * @param {number} a 
 * @param {number} b
 * @return {number}
 */
// 記錄正負號  for循環相加計算乘法
Operations.prototype.multiply = function (a, b) {
    if (a == 0 || b == 0) return 0;
    if (a == 1) return b;
    if (b == 1) return a;

    const { plus, abs } = getAbs(b)
    const absB = abs

    let res = 0
    for (let i = 0; i < absB; i++) {
        res += a
    }

    return plus ? res : ~res + 1
};

/** 
 * @param {number} a 
 * @param {number} b
 * @return {number}
 */
// 通过减法模拟除法
Operations.prototype.divide = function (a, b) {
    if (a == 0 || b == 0) return 0;
    if (b == 1) return a;

    const resA = getAbs(a)
    const absA = resA.abs
    const plusA = resA.plus


    const resB = getAbs(b)
    const absB = resB.abs
    const plusB = resB.plus


    const finalPlus = plusA == plusB



    // 循环减法计算除法
    let res = 0
    
};



