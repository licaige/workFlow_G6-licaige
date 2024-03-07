/**
 * @param {number} n
 * @return {number}
 */
var fib = function(n) {
    let n0=0,n1=1,sum;
    for (let i = 0; i < n; i += 1) {
        sum = (n0+n1)%1000000007;
        n0 = n1;
        n1 = sum;
    }
    return n0
};