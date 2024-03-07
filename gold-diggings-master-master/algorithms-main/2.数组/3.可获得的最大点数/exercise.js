const cardPoints = [1, 2, 3, 4, 5, 6, 1], k = 3;
// 滑动窗口法
var maxScore = function (cardPoints, k) {
    const l = cardPoints.length;
    const windowLength = l - k;
    let sum = 0;
    // 滑动窗口求和
    for (let i = 0; i < windowLength; i++) {
        sum += cardPoints[i]
    }
    let minSum = sum;
    for (let i = windowLength; i < l; i++) {
        sum += cardPoints[i] - cardPoints[i - windowLength];
        minSum = Math.min(minSum, sum);
    }
    return arraySum(cardPoints) - minSum
};
console.log(maxScore(cardPoints, k));
function arraySum(array) {
    return array.reduce((acc, cur) => {
        return acc += cur;
    }, 0)
}