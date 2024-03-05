


// 实例描述符,内部保存实例的构造函数,构造该实例所需的参数
class Descriptor { }

// 实例管理器
class InstanceService {
    // 内部保存单例
    _instances: Set<Descriptor | any>

    // 通过构造函数或者描述符构造实例对象
    createInstacne(ctorOrDescriptor: any) {
        return new ctorOrDescriptor()
    }

    // 需要注入内部管理实例时,需要通过该函数进行调用
    invokeFunction(fn: any, ...args) {
        const instance = {}
        return fn(instance, ...args); // 函数先查找实例,将实例注入
    }

}