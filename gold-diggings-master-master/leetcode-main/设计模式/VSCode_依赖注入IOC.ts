//! 依赖注入IOC 、

//todo 需要实例化的类
class Person {
    constructor(name: string, age: number) { }
}

//todo 创建同步描述器, 描述器用于保存实例及其参数, 需要的时候再将描述器实例化
class SyncDescriptor {
    ctor: any
    staticArguments: any[]
    // 保存构造函数和所需参数
    constructor(ctor: any, ...args: any[]) {
        this.ctor = ctor
        this.staticArguments = [...args]
    }
}

// 单例池,用于单独管理描述器
class PersonPool {
    constructor() { }
    set(descriptor: SyncDescriptor) {
        //保存描述符
    }
    get(id: string) {
        //get的时候再进行实例化
    }
}

// 用于管理IOC构造函数
let pool = new PersonPool()

// 传入构造函数及其所需参数  先保存起来 而不是实例
pool.set(new SyncDescriptor(Person, "张三", 18))

// 在获取的时候再实例化, 以达到lazy的效果
let instance = pool.get("PersonID")