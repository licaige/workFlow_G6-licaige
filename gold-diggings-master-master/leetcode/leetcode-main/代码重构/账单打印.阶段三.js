//! 阶段三 使用类封装单个perf计算逻辑  并使用多态区分多个不同种类戏剧计算逻辑
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

const playFor = (performance) => {
    return plays[performance.playID]
}
const CNY = (number) => {
    return new Intl.NumberFormat("ch", {
        style: "currency", currency: "CNY",
        minimumFractionDigits: 2
    }).format(number)
}
const accumulateVolumeCredits = (performance) => {
    return performance
        .reduce((total, p) => total + p.volumeCredits, 0)
}
const accumulateAmount = (performance) => {
    return performance
        .reduce((total, p) => total + p.amount, 0)
}
const formatLine = (pref) => {
    return `${pref.play.name}:${CNY(pref.amount / 100)} (${pref.audience} 座位)\n`
}

// 分离步骤 将其分为计算账单数据, 渲染为HTML两部分
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

// 将计算逻辑封装到类PerformanceCaculator里
const enrichPreformance = (performance) => {
    const caculator = createPerformanceCaculator(performance, playFor(performance))
    const result = Object.assign({}, performance)
    result.play = caculator.play
    result.amount = caculator.getAmount()
    result.volumeCredits = caculator.getVolumeCredits()
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


// 通过创建类封装逻辑 用于计算一个performance,(通过play计算完整的perf对象)
class PerformanceCaculator {
    constructor(performance, play) {
        this.performance = performance
        this.play = play
    }

    getAmount() {
        throw new Error("method getAmount must be init in subClass")
    }

    getVolumeCredits() {
        throw new Error("method getAmount must be init in subClass")
    }
}
// 多态化多个计算器子类
class TragedyCaculator extends PerformanceCaculator {
    getAmount() {
        let amount = 40000
        let audience = this.performance.audience
        if (audience > 30) {
            amount += 1000 * (audience - 30)
        }
        return amount
    }

    getVolumeCredits() {
        return Math.max(this.performance.audience - 30, 0)
    }
}
class ComedyCaculator extends PerformanceCaculator {
    getAmount() {
        let amount = 30000
        let audience = this.performance.audience
        if (audience > 30) {
            amount += 1000 * (audience - 30)
        }
        return amount
    }

    getVolumeCredits() {
        return Math.max(this.performance.audience - 30, 0)
    }
}
// 通过工厂函数 管理多个计算器子类
function createPerformanceCaculator(performance, play) {
    switch (play.type) {
        case "tragedy": return new TragedyCaculator(performance, play);
        case "comedy": return new ComedyCaculator(performance, play);
        default:
            throw new Error(`unknow type ${play.type}`)
    }
}



// 测试
console.log(statement(invoice));