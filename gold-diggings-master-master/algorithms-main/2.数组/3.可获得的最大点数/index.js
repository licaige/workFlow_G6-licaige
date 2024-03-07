// 1.滑动窗口法
const cardPoints = [2, 2, 2], k = 2;
var maxScore = function (cardPoints, k) {
    const n = cardPoints.length;
    // 创建窗口长度
    const windowLength = n - k;
    let sum = 0;
    for (let i = 0; i < windowLength; i++) {
        sum += cardPoints[i]
    }
    let minSum = sum;
    // 使用i++时，i先将自身的值赋值给变量a，然后再自增1
    // 使用++i时，i先将自身的值自增1,再将自增后的值赋值给变量a
    // 类比给人盛饭，i++使先给别人加满，再给自己加（孔融让梨啊），而++i使先把自己加满，再给别人加
    for (let i = windowLength; i < n; i++) {
        sum += cardPoints[i] - cardPoints[i - windowLength];
        minSum = Math.min(minSum, sum);
    }
    return sumArray(cardPoints) - minSum
};
console.log(maxScore(cardPoints, k));

// 求和的方法
function sumArray(array) {
    return array.reduce((acc, cur) => {
        return acc += cur
    }, 0)
}
