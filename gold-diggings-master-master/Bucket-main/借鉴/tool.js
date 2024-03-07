// 1.妙用递归
// 精髓在于两个参数，每次传入整的参数会被分成两部分
function resursivelyCheckEqual(x, ...rest) {
    return Object.is(x, rest[0]) &&
        (rest.length < 2 || resursivelyCheckEqual(...rest))
}
let res = resursivelyCheckEqual(10, 10, 10, 10, 10);
console.log(res);