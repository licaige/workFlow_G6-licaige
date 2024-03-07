const cardPoints = [11, 49, 100, 20, 86, 29, 72], k = 4;

// 滑动窗口的思路解决问题
// 思路： 求出中间连续数的最小值
// 剩下的长度必然是 cardPoints.length - 4
// 求出剩余卡牌的最小值，然后来求拿走卡牌点数的最大值

function maxScore(cardPoints, k) {
    const n = cardPoints.length;
    // 剩下的长度
    const windowSize = n - k;
    let sum = 0;
    // 先假设都取后面，剩下的就都是前面的了
    // 1.相当于刚开始构建一个滑动窗口
    for (let i = 0; i < windowSize; i++) {
        sum += cardPoints[i];
    }
    let minSum = sum;

    for (let i = windowSize; i < n; ++i) {
        sum += cardPoints[i] - cardPoints[i - windowSize];
        minSum = Math.min(minSum, sum);
    }
    let totalSum = 0;
    for (let i = 0; i < n; i++) {
        totalSum += cardPoints[i];
    }
    return totalSum - minSum
}

console.log(maxScore(cardPoints, k));