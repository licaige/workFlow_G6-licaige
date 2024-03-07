// 面向过程思想 JS老过

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
let customerCouple = false;
let gifts = ['鲜花', '巧克力', '9.9元抵扣券'];
// 客人获得的礼品
let prize = '无礼品';
// 1.求客人购买商品总价的函数
function totalPrice() {
    let totalPrice = Object.keys(goodsAmount).reduce((acc, cur) => {
        //2.需求2打77折判断
        //4.需求4限定情侣参加
        if (getCurrentDate() === '1/14' && customerCouple) {
            if (acc >= 99) {
                prize = gifts[randomNum(0, 2)];
            }
            return acc += goodsPrice[cur] * 0.77 * goodsAmount[cur]
        } else {
            return acc += goodsPrice[cur] * goodsAmount[cur]
        }
    }, 0);
    // 3.需求3，判断中秋国庆节进行满减
    if (getCurrentDate() === '2/1' && totalPrice >= 399) {
        totalPrice -= 100;
    }
    if (getCurrentDate() === '3/1' && totalPrice <= 200) {
        if (randomNum(0, 9) === 0) {
            totalPrice = 0
        }
    }
    return totalPrice;
}

// 算出来的结果
let result = {
    totalPrice: totalPrice(),
    prize: prize
}
console.log(result);
// 需求2
// 元旦那天所有商品打77折,此时需求2的代码在需求1中修改的
// 需求3
// 中秋节（2月1号）：购物满399减100
// 国庆节（3月1号）：购物总价 100 元以内 1/10 概率免单

// 以下均为辅助函数
// 获取当前日期函数
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
