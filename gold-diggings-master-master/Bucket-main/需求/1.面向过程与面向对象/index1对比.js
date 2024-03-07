// 面向对象编程 JS阿对
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
        return acc += goodsPrice[cur] * goodsAmount[cur]
    }, 0);
    totalPrice = tanabata(totalPrice);
    totalPrice = moonFestival(totalPrice);
    totalPrice = nationalDay(totalPrice);
    return totalPrice;
}
function tanabata(price) {
    if (getCurrentDate() === '1/14') {
        price = price * 0.77
    }
    return price;
}
function moonFestival(price) {
    if (getCurrentDate() === '2/1' && price >= 399) {
        price -= 100;
    }
    return price;
}
function nationalDay(price) {
    if (getCurrentDate() === '3/1' && price <= 100 && randomNum(0, 9) === 0) {
        price = 0;
    }
    return price;
}
function tanabata(price) {
    if (customerCouple) {
        if (price >= 99) {
            prize = gifts[randomNum(0, 2)]
        }
        price = price * 0.77
    }
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
