import { Transform, TransformCallback,createReadStream } from "stream"


// 一个用于转换大小写的流处理器,
export class ReplaceStream extends Transform {
    constructor() {
        super()
    }

    // 继承Transform 定义其_transform方法, 用于转换流
    transform(chunk: any, encoding: BufferEncoding, callback: TransformCallback): void {
        // 在这里定义转换流的方法(转换大小写)
        const input = chunk.toString();
        const output = input.toLowerCase();

        // 将流chunk推回
        this.push(output)
        // 触发完成回调
        callback()
    }
}

// 使用
const fs = require('fs');
const readableStream = fs.createReadStream('./input.txt', 'utf-8')

const upperToLowercaseTransform = new ReplaceStream();

// 可读流管道连接.
readableStream.pipe(upperToLowercaseTransform).pipe(process.stdout)


// 直接调用Transform类
const replaceStream = new Transform({
    defaultEncoding:"utf-8",

    transform(chunk, encoding, callback) {
        // 在这里定义转换流的方法(转换大小写)
        const input = chunk.toString();
        const output = input.toLowerCase();

        // 将流chunk推回
        this.push(output)
        // 触发完成回调
        callback()
    }

    flush(cb){
        this.push(tail)
        cb()
    }
})


// 用于过滤相关国家数据的流处理器,
class FilterByCountry extends Transform {
    country:string

    constructor(country:string) {
        this.country = country
        super()
    }

    transform(chunk: any, encoding: BufferEncoding, callback: TransformCallback): void {
        if(chunk.country===this.country){
            this.push(chunk)
        }
        callback()
    }
}

// 三个环节执行流处理 接上三个管道
createReadStream("data.txt")
.pipe(upperToLowercaseTransform)// 转换大小写
.pipe(csvParser)// 解析csv
.pipe(new FilterByCountry("China"))// 筛选china数据
.pipe(process.stdout) // 输出


//todo 流内的错误不会接序到下个流中  需要单独定义错误处理
createReadStream("data.txt")
.on("error",()=>{})
.pipe(upperToLowercaseTransform)
.on("error",()=>{})
.pipe(csvParser)
.on("error",()=>{})
.pipe(process.stdout) // 输出
.on("error",()=>{})

// 使用pipeline流水线工具函数统一捕获错误
import { pipeline } from "stream"


// 内部传入多个流对象 会将其串起
pipeline(
    createReadStream("data.txt"),
    upperToLowercaseTransform,
    csvParser,
    process.stdout,
    // 统一处理内部err
    (err)=>{
        console.log(err);
    }
)