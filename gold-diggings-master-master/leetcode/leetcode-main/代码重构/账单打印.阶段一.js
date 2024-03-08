
//! 重构阶段一  为原函数添加足够多的结构, 更好的理解其逻辑
// 一个计算电影院收入的函数 输入电影列表  售票情况

// --------------
// 大剧院账单
// Iron Man:¥650.00 (55 座位)
// Hamlet:¥650.00 (55 座位)
// Amount owed is ¥1,300.00
// --------------
const plays = {
    "hamlet": { name: "Hamlet", type: "tragedy" },
    "ironman": { name: "Iron Man", type: "comedy" }
}

const invoice = {
    customer: "大剧院",
    performance: [
        { playID: "ironman", audience: 55 },
        { playID: "hamlet", audience: 55 },
    ]
}


function statement(invoice, plays) {
    let totalAmount = 0
    let volumeCredits = 0

    let result = `-------------- \n`
    result += `${invoice.customer}账单\n`

    const format = new Intl.NumberFormat("ch", {
        style: "currency", currency: "CNY",
        minimumFractionDigits: 2
    }).format

    for (let pref of invoice.performance) {
        const play = plays[pref.playID]
        let thisAmount = 0

        switch (play.type) {
            case "tragedy":
                thisAmount = 40000
                if (pref.audience > 30) {
                    thisAmount += 1000 * (pref.audience - 30)
                }
                break;
            case "comedy":
                thisAmount = 30000
                if (pref.audience > 30) {
                    thisAmount += 1000 * (pref.audience - 30)
                }
                break;
            default:
                throw new Error("UNKNOW TYPE")
        }

        volumeCredits += Math.max(pref.audience - 30, 0)

        if ("comedy" === play.type) {
            volumeCredits += Math.max(pref.audience - 30, 0)
        }



        result += `${play.name}:${format(thisAmount / 100)} (${pref.audience} 座位)\n`
        totalAmount += thisAmount
    }


    result += `Amount owed is ${format(totalAmount)}\n`
    result += `你赚取了${volumeCredits}点积分\n`
    result += `-------------- \n`

    return result
}

function statement_refected(invoice, plays) {

    const amountFor = (performance) => {        // 抽离switch语句 内联参数  减少临时变量
        let thisAmount = 0
        let audience = performance.audience

        switch (playFor(performance).type) {
            case "tragedy":
                thisAmount = 40000
                if (audience > 30) {
                    thisAmount += 1000 * (audience - 30)
                }
                break;
            case "comedy":
                thisAmount = 30000
                if (audience > 30) {
                    thisAmount += 1000 * (audience - 30)
                }
                break;
            default:
                throw new Error("UNKNOW TYPE")
        }

        return thisAmount
    }
    const playFor = (performance) => {          // 使用查询取代临时变量
        //TODO 多次查询相对于改善代码可读性来说  性能损耗可以忽略不计
        return plays[performance.playID]
    }
    const getVolumeCredits = (performance) => { // 将volumeCredits累加逻辑单独抽离
        let volumeCredits = 0
        volumeCredits += Math.max(performance.audience - 30, 0)

        if ("comedy" === playFor(performance).type) {
            volumeCredits += Math.max(performance.audience - 30, 0)
        }

        return volumeCredits
    }
    const CNY = (number) => {                   // 将原先的format函数重重新包装 重新命名
        return new Intl.NumberFormat("ch", {
            style: "currency", currency: "CNY",
            minimumFractionDigits: 2
        }).format(number)
    }
    const accumulateVolumeCredits = () => {     // 单独抽离计算volumeCredits积分的累加循环
        let volumeCredits = 0
        for (let pref of invoice.performance) {
            volumeCredits += getVolumeCredits(pref)
        }
        return volumeCredits
    }
    const accumulateAmount = () => {            // 单独抽离计算totalAmount的累加循环
        //TODO 为了抽离逻辑可以进行额外查询和循环 amountFor
        let totalAmount = 0
        for (let pref of invoice.performance) {
            totalAmount += amountFor(pref)
        }
        return totalAmount
    }
    const formatLine = (pref) => {              // 单独格式化行
        return `${playFor(pref).name}:${CNY(amountFor(pref) / 100)} (${pref.audience} 座位)\n`
    }

    // 主逻辑只剩下打印账单的各行, 与账单结果保持一致
    let result = ""
    result += `-------------- \n`
    result += `${invoice.customer}账单\n`

    for (let pref of invoice.performance) {
        result += formatLine(pref)
    }

    result += `总销售额:${CNY(accumulateAmount())}\n`    // 内联totalAmount变量
    result += `获得积分:${accumulateVolumeCredits()}\n`  // 内联totalVolumeCredits变量
    result += `-------------- \n`
    return result
}



// 一致性测试
console.log(statement(invoice, plays));
console.log(statement_refected(invoice, plays));