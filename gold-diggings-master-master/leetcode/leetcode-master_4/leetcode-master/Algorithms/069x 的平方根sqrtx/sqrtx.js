/* leetcode　069x 的平方根sqrtx JavaScript实现　*/

/** * @param {number} num * @return {number} */
var mySqrt = function(num) {
    var i = 0;
    while (i <= num) {
        var item = i * i;
        if (item == num) {
            return i;
        }
        if (item > num) {
            return i - 1;
        }
        i++
    }
};