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
// 客人购买商品的单价，假设所有商品单价都是存在的
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
    // 假设七夕节是阳历的1月1日啊
    // 因为农历不好算，这里重新定义一下七夕节
    if (getCurrentDate() === '1/1' && customerCouple) {
        if (totalPrice >= 99) {
            prize = gifts[randomNum(0, 2)];
        }
        totalPrice = totalPrice * 0.77
    } else if (getCurrentDate() === '1/2' && totalPrice >= 399) {
        // 处理中秋节满减的判断
        // 假设中秋节为阳历的1月2日啊
        // 因为农历不好算，这里重新定义一下中秋节
        totalPrice -= 100;
    } else if (getCurrentDate() === '1/3' && totalPrice <= 100 && randomNum(0, 9) === 0) {
        // 处理国庆节随机免单
        // 假设国庆节为阳历的1月3日啊
        // 因为农历不好算，这里重新定义一下国庆节
        totalPrice = 0
    }
    return totalPrice;
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