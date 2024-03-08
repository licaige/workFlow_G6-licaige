


function choose(type: string, shouldPay: boolean) {
    if (type === 'A') {
        if (shouldPay) {
            console.log('购买套餐A');
        }
    }

    else if (type === 'B') {
        if (shouldPay) {
            console.log('购买套餐B');
        }
    }

    else if (type === 'C') {
        if (shouldPay) {
            console.log('购买套餐C');
        }
    }
}


// 下一个流转函数
function nextProcess() { }

// 包装为链节点
class Chain {
    constructor(cb: Function) { }
    setNext(node: Chain) { }
    call() { }
}

// Type_A的处理函数
function Type_A(type: string, shouldPay: boolean) {
    if (type === 'A' && shouldPay) {
        console.log('购买套餐A');
    } else {
        nextProcess()
    }
}

// Type_B的处理函数
function Type_B(type: string, shouldPay: boolean) {
    if (type === 'B' && shouldPay) {
        console.log('购买套餐B');
    } else {
        nextProcess()
    }
}

// 将多个处理函数包装为一个链节点
const nodeA = new Chain(Type_A)
const nodeB = new Chain(Type_B)
const nodeC = new Chain(Type_C)

// 指定链执行的顺序
nodeA.setNext(nodeB)
nodeB.setNext(nodeC)

// 触发链
nodeA.call()