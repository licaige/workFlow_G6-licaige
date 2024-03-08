
//  如下代码
// 做了两件事情  1. 渲染div  2. 遍历data
// 如果data从Array变成了Object , 那么就需要修改这个方法,需要进行重构
function appendDiv(data: any) {
    for (let i = 0; i < data.length; i++) {
        const div = document.createElement('div')
        document.body.appendChild(div)
    }
}

// 职责拆分
function each(data: any, cb: Function) {
    if (typeof data === 'object') {
        for (let i in data) {
            
        }
    }
}
// 对于迭代器模式来说, 迭代器应该只负责迭代,内部的处理不应该暴露出来
