// 假设有130个苹果，你我轮流拿，每次可拿1-5个，如何保证你拿到最后一个苹果？

// 第一次拿4个，后续都拿6-x即可

const sum = 130;
const count = 2;
const startValue = 4;

function resolveQuestion(sum, count, everySum, val = 0) {
    let everyRandom = Math.round(Math.random() * 4) + 1;
    if (everySum >= sum) {
        console.log(count);
    } else if (count % 2 === 0) {
        everySum += everyRandom;
        count++;
        let val = 6 - everyRandom;
        resolveQuestion(sum, count, everySum, val);
    } else if (count % 2 === 1) {
        everySum += val;
        count++;
        resolveQuestion(sum, count, everySum);
    }
}
resolveQuestion(sum, count, startValue);






