// 面向过程编程 JS老过
let goodsAmount = {
    '方便面': 5,
    '火腿肠': 10,
    '牙刷': 2,
    '纸巾': 10
}
let goodsPrice = {
    '方便面': 3,
    '火腿肠': 2,
    '牙刷': 3,
    '纸巾': 6
}
let customerCouple = false;
let gifts = ['鲜花', '巧克力', '9.9元抵扣券'];
let prize = '无礼品';
function totalPrice() {
    let totalPrice = Object.keys(goodsAmount).reduce((acc, cur) => {
        if (getCurrentDate() === '1/14' && customerCouple) {
            if (acc >= 99) {
                prize = gifts[randomNum(0, 2)];
            }
            return acc += goodsPrice[cur] * 0.77 * goodsAmount[cur]
        } else {
            return acc += goodsPrice[cur] * goodsAmount[cur]
        }
    }, 0);
    if (getCurrentDate() === '2/1' && totalPrice >= 399) {
        totalPrice -= 100;
    }
    if (getCurrentDate() === '3/1' && totalPrice <= 200) {
        if (randomNum(0, 9) === 0) {
            totalPrice = 0
        }
    }
    return totalPrice.toFixed(2);
}
let result = {
    totalPrice: totalPrice(),
    prize: prize
}
console.log(result);
function getCurrentDate() {
    let date = new Date();
    return (date.getMonth() + 1) + '/' + date.getDate()
}
function randomNum(minNum, maxNum) {
    switch (arguments.length) {
        case 1:
            return parseInt(Math.random() * minNum + 1, 10);
            break;
        case 2:
            return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
            break;
        default:
            return 0;
            break;
    }
}
