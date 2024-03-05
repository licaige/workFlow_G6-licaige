// 输入：x = 123
// 输出：321
// 输入：x = 120
// 输出：21


// 字符串转换法
var reverse = function (x) {
    // 转化为字符串 
    const str = JSON.stringify(x)
    // 拆分 再翻转数组  
    const resultArr = str.split('').reverse()
    //再拼接成字符串  减0 隐式转换成数字
    let result = resultArr.join('') - 0
    if (result > -Math.pow(2, 31) || result < Math.pow(2, 31) - 1) {
        return result
    }
    console.log('结果超出32位范围(2的31次方)');
};

var reverse = function (x) {
    if (x < 0) {
        const str = JSON.stringify(x)
        const resultArr = str.split('').reverse()
        // 如果x小于0  需要把符号提出来  
        resultArr.shift()
        let result = resultArr.join('') - 0
    } else {
        // 转化为字符串 拆分 再翻转数组   再拼接成字符串  减0 隐式转换成数字
        const str = JSON.stringify(x)
        const resultArr = str.split('').reverse()
        let result = resultArr.join('') - 0
    }
    const result = JSON.stringify(x).split('').reverse().join('') - 0
    if (result > -Math.pow(2, 31) || result < Math.pow(2, 31) - 1) {
        return result
    }
};


// -------------------------------
var reverse2 = function (x) {
    let result = null,
        resultArr = null
    if (x < 0) {
        // 如果x小于0  需要把符号提出来  反转后再在最前添加符号
        resultArr = JSON.stringify(x).split('')
        resultArr.shift()
        resultArr.reverse().unshift('-')
    } else {
        // 转化为字符串 拆分 再翻转数组   再拼接成字符串  减0 隐式转换成数字
        resultArr = JSON.stringify(x).split('').reverse()
    }
    result = resultArr.join('') - 0
    if (result > -Math.pow(2, 31) && result < Math.pow(2, 31) - 1) {
        return result
    }else{
        return 0
    }
};
console.log(-Math.pow(2, 31));
console.log(reverse2(1534236469));