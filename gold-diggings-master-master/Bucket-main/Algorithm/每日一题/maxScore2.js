const cardPoints = [11, 49, 100, 20, 86, 29, 72], k = 4;

// 滑动窗口的思路解决问题
// 思路： 求出中间连续数的最小值
// 剩下的长度必然是 cardPoints.length - 4
// 求出剩余卡牌的最小值，然后来求拿走卡牌点数的最大值

function maxScore(cardPoints, k) {
    const n = cardPoints.length;
    const windowSize = n - k;
    let sum = 0;
    for (let i = 0; i < windowSize; i++) {
        sum += cardPoints[i];
    }
    let minSum = sum;
    for (let i = windowSize; i < n; ++i) {
        sum += cardPoints[i] - cardPoints[i - windowSize];
        minSum = Math.min(minSum, sum)
    }
    return arraySum(cardPoints) - minSum
}

// 数组求和的方法
function arraySum(cardPoints) {
    return cardPoints.reduce((acc, cur) => {
        return (acc + cur)
    })
}

