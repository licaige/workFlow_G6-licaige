// 通过Promise实现defer关键字
// 使用unknow代替any
export function defer(fn: Function, ...args: unknown[]): void {
    Promise.resolve().then(fn.bind(null, ...args))
}

