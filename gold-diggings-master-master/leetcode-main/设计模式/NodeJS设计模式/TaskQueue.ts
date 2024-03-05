import { EventEmitter } from "event"

class TaskQueue extends EventEmitter {

    private concurrency: number
    private running: number
    private queue: any[]

    constructor(concurrency: number) {
        super()
        this.concurrency = concurrency // 并发数
        this.running = 0               // 运行数
        this.queue = []                // 任务队列
    }

    pushTask(task: Function) {
        this.queue.push(task)
        // 添加task时,启动流程
        process.nextTick(this.next.bind(this))
    }

    next() {
        // 没有任务时触发事件
        if (this.running == 0 && this.queue.length == 0) {
            return this.emit("TaskEmpty")
        }
        // 开启循环执行事件
        while (this.running < this.concurrency && this.queue.length) {
            const task = this.queue.shift()

            // task执行后,继续下一个task
            task(() => {
                this.running--
                process.nextTick(this.next.bind(this))
            })
        }
    }
}



