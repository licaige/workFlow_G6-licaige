// 计算一个整数和浮点数的绝对值
const integer = -10;
const floatPoint = -9.58
console.log(Math.abs(integer));
console.log(Math.abs(floatPoint));

// 判断一个数是否是素数
function isPrime(N) {
    if (N < 2) return false
    for (let i = 2; i * i <= N; i += 1) {
        if (N % i === 0) return false
    }
    return true
}

console.log(isPrime(12));

// 计算一个数的平方根
const n = 12;
console.log(Math.sqrt(n));

// 计算直角三角形斜边

function hypotenuse(a, b) {
    return Math.sqrt(a * a + b * b)
}

console.log(hypotenuse(3, 4));

// 值传递

const arr = [1, 2, 3, 4];

function reserved(arr) {
    console.log(arr.reverse());
}
reserved(arr);
console.log(arr);