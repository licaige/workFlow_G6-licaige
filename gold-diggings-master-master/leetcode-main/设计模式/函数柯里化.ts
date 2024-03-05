function cost() {
    var args: any[] = []

    return function () {
        // 如果没有参数,则将所有参数一起进行求值
        if (arguments.length === 0) {
            return cost.apply(this, args)
        }
        // 如果有参数,保存参数,不进行求值
        else {
            args.push(...arguments)
            return arguments.callee
        }
    }
}
