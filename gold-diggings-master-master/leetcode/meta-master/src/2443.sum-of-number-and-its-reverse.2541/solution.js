/**
 * @param {number} num
 * @return {boolean}
 */
var sumOfNumberAndReverse = function (num) {
    for (let i = 0; i <= num; i++) {
        if (i + reverse(i) === num) {
            return true;
        }
    }
    return false;
};

function reverse (num) {
    let result = 0;
    while (num) {
        const digit = num % 10;
        result = result * 10 + digit;
        num = (num - digit) / 10;
    }
    return result;
}
