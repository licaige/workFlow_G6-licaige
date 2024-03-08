


// 用于将cb回调形式的函数转换为promise类型
function promisify(callbackApi: Function) {
    return function promisified(...args) {
        return new Promise((resolve, reject) => {

            // 因为callbackApi最后一个参数总为回调, 定义新args的最后一个参数,内部进行处理
            const newArgs = [
                ...args,
                (err, result) => {
                    if (err) return reject(err)
                    resolve(result)
                }
            ]

            callbackApi(...newArgs)
        })
    }
}


// 无限递归Promise链引发的内存泄漏问题
function delay(num: number) {
    return new Promise((resolve) => {
        setTimeout(() => resolve(null), num)
    })
}

function leakingLoop() {
    return delay(1)
        .then(() => {
            console.log(Date.now());
            return leakingLoop() // 这里return会产生永远无法解析的promise链,链条持续增长
        })
}

function noLeakingLoop() {
    return delay(1)
        .then(() => {
            console.log(Date.now());
            leakingLoop() // 删去return 直接执行
        })
}
