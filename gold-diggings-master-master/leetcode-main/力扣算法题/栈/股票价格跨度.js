

// 901. 股票价格跨度

// https://leetcode.cn/problems/online-stock-span/?envType=study-plan-v2&envId=leetcode-75

// 方案  准备一个栈   栈顶到栈尾保持递增

// 由于70入栈时需要移动到60后面,需要进行一次跨越
// 故跨度为1+1
// [100, 80, 60] < - 70


// 60插入,最多可以跨一个
// 故跨度为1+1
// [100, 80, 60] < - 60

// 75需要插入到80前面  
// 跨度为1+3
// [100, 80, 70, 60, 60] < - 75     


// 栈内保存
// 此时75入栈时,会弹出栈顶两位  计算出[75,3]


// [75,1]
//   |
// [60,1]
// [70,2]
// [80,1]
// [100,1]

var StockSpanner = function () {
    this.stack = [];
    this.idx = -1;

};

/** 
 * @param {number} price
 * @return {number}
 */
StockSpanner.prototype.next = function (price) {


    let idx = this.stack.length - 1
    let last = this.stack[this.stack.length - 1]
    let spanner = 1

    while (idx > 0 && last[0] < price) {
        this.stack.pop()
        last = this.stack[this.stack.length - 1]
        spanner += last[1]
        idx--
    }

    this.stack.push([price, spanner])

    return spanner
};