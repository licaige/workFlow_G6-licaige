//! 重构阶段二 关注功能修改的部分
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

// 将原先在函数作用域内的一组段短函数放到全局
const playFor = (performance) => {
    return plays[performance.playID]
}
const amountFor = (performance) => {
    let thisAmount = 0
    let audience = performance.audience

    switch (performance.play.type) {
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
const getVolumeCredits = (performance) => {
    let volumeCredits = 0
    volumeCredits += Math.max(performance.audience - 30, 0)

    if ("comedy" === performance.play.type) {
        volumeCredits += Math.max(performance.audience - 30, 0)
    }

    return volumeCredits
}
const CNY = (number) => {
    return new Intl.NumberFormat("ch", {
        style: "currency", currency: "CNY",
        minimumFractionDigits: 2
    }).format(number)
}
const accumulateVolumeCredits = (performance) => {
    return performance
        .reduce((total, p) => total + getVolumeCredits(p), 0)//TODO 使用reduce代替循环
}
const accumulateAmount = (performance) => {
    return performance
        .reduce((total, p) => total + p.amount, 0)//TODO 使用reduce代替循环
}
const formatLine = (pref) => {
    return `${pref.play.name}:${CNY(pref.amount / 100)} (${pref.audience} 座位)\n`
}


// 分离步骤 将其分为计算账单数据, 渲染为HTML两部分
// 步骤一 计算账单数据
function renderPlainText(data) {
    let result = ""
    result += `-------------- \n`
    result += `${data.customer}账单\n`

    for (let pref of data.performance) {
        result += formatLine(pref)
    }

    result += `总销售额:${CNY(data.totalAmount)}\n`
    result += `获得积分:${data.totalVolumeCredits}\n`
    result += `-------------- \n`
    return result
}

// 补充单个performance内容 将之前对单个pref的计算逻辑填入, 上一个计算结果丢给下一个  对对象的副作用都放在这里
// 聚合plays和invoice为同一个数据结构, 以便下面的函数调用
// 在最开始进行所有的查询 如playFor  amountFor  存放到数据结构中, 再删除逻辑内的查询
const enrichPreformance = (performance) => {
    const result = Object.assign({}, performance)
    result.play = playFor(result)
    result.amount = amountFor(result)
    result.volumeCredits = getVolumeCredits(result)
    return result
}

// 创建一个账单对象数据结构 传递给下发渲染函数,以代替原先传入的invoice, plays
function statement(invoice) {
    const statementData = {}
    statementData.customer = invoice.customer
    statementData.performance = invoice.performance.map(enrichPreformance)
    statementData.totalAmount = accumulateAmount(statementData.performance)
    statementData.totalVolumeCredits = accumulateVolumeCredits(statementData.performance)
    console.log(statementData);

    return renderPlainText(statementData)
}

// 一致性测试
console.log(statement(invoice));