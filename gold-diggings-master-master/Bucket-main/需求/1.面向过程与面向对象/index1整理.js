// 面向对象思想 JS阿对

// 1.需求1
// 根据客人购买的商品单价和数量生成所购商品的价格
// 客人购买商品的数量
let goodsAmount = {
    '方便面': 5,
    '火腿肠': 10,
    '牙刷': 2,
    '纸巾': 10
}
// 客人购买商品的单价，所有商品单价都是存在的
let goodsPrice = {
    '方便面': 3,
    '火腿肠': 2,
    '牙刷': 3,
    '纸巾': 6
}
// 客人是否为情侣
let customerCouple = true;
// 客人获得的礼品
let gifts = ['鲜花', '巧克力', '9.9元抵扣券'];
let prize = '无礼品';
// 求客人购买商品总价的函数
function totalPrice() {
    let totalPrice = Object.keys(goodsAmount).reduce((acc, cur) => {
        return acc += goodsPrice[cur] * goodsAmount[cur]
    }, 0);
    // 需求2：调用七夕打77折活动的函数
    totalPrice = tanabata(totalPrice);
    // 需求3：调用中秋节国庆节活动的函数
    totalPrice = moonFestival(totalPrice);
    totalPrice = nationalDay(totalPrice);
    return totalPrice;
}
// 需求2：处理七夕打77折活动的函数
function tanabata(price) {
    if (getCurrentDate() === '1/1') {
        price = price * 0.77
    }
    return price;
}
// 需求3：处理中秋节满减的函数
function moonFestival(price) {
    if (getCurrentDate() === '1/2' && price >= 399) {
        price -= 100;
    }
    return price;
}
// 处理国庆节随机免单的函数
function nationalDay(price) {
    if (getCurrentDate() === '1/3' && price <= 100 && randomNum(0, 9) === 0) {
        price = 0;
    }
    return price;
}
// 需求4：七夕节活动更改
// 不动以前的代码，重写七夕节活动的函数
function tanabata(price) {
    if (getCurrentDate() === '1/1' && customerCouple) {
        if (price >= 99) {
            prize = gifts[randomNum(0, 2)]
        }
        price = price * 0.77
    }
    return price;
}
// 以下均为辅助方法
// 获取当前日期方法
function getCurrentDate() {
    let date = new Date();
    return (date.getMonth() + 1) + '/' + date.getDate()
}
//生成从minNum到maxNum的随机数
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

console.log(totalPrice());
console.log(prize);