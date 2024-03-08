//todo 无序平行执行流
import { Transform, pipeline } from "stream"
import split from "split"
import fs from "fs"


const replaceStream = new Transform({})


// 技巧: 单独抽离逻辑控制算法代码封装为类
export class ParallelStream extends Transform {

    userTransform
    running
    terminateCb

    constructor(userTransform) {
        super()

        this.userTransform = userTransform
        this.running = 0
        this.terminateCb = null
    }

    _transForm(chunk, enc, done) {
        this.running++
        // 执行一个流  并行任务+1
        this.userTransform(
            chunk,
            enc,
            this.push.bind(this),
            this._onComplete.bind(this) // 单个流执行完毕运行 计数器-- 判断是否完全结束
        )

        done()
    }

    // 改造_flush方法
    _flush(done) {
        if (this.running > 0) {
            this.terminateCb = done
        } else {
            done()
        }
    }

    // 单个流执行完毕运行 计数器-- 判断是否完全结束
    _onComplete(err) {
        this.running--

        if (this.running == 0) {
            this.terminateCb && this.terminateCb()
        }
    }
}

// 使用 定义平行转换流
const readableStream = fs.createReadStream('./input.txt', 'utf-8')
const parallelStream = new ParallelStream(replaceStream)


pipeline(
    readableStream,  // 创建文件流
    split(),         // 拆分为多个流
    parallelStream   // 放入平行转换流执行
)
