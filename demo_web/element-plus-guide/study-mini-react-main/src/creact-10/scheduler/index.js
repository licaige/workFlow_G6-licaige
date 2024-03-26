let taskQueue = []
let timerQueue = []
let deadline = 0
let yieldInterval = 5

export function scheduleCallback(callback) {
    const newTask = {callback}
    taskQueue.push(newTask)
    // 调度任务
    schedule(flushWork)
}

function schedule(callback) {
    // 情况复杂可能会有多个任务
    timerQueue.push(callback)
    // 处理任务
    postMessage()
}

const postMessage = () => {
    const {port1, port2} = new MessageChannel()
    port1.onmessage = () => {
        // 执行timerQueue中的任务，并清空timerQueue
        let tem = timerQueue.splice(0, timerQueue.length)
        tem.forEach(c => c())
    }
    port2.postMessage(null)
}

function flushWork() {
    deadline = getCurrentTime() + yieldInterval;
    let currentTask = taskQueue[0]
    while(currentTask) {
        currentTask.callback()
        taskQueue.shift()
        currentTask = taskQueue[0]
    }
}

export function shouldYield() {
    return getCurrentTime() >= deadline
}

export function getCurrentTime() {
    return performance.now()
}