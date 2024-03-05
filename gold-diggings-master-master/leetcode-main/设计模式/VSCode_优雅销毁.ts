

// - 通过Disposable优雅实现销毁 ， 每个可销毁资源都继承了Disposable类, 
// 并实现了IDisposable接口dispose方法  (每个类中定义自己的dispose方法, 销毁上层类时遍历底层类,递归销毁)
// - 销毁时递归调用dispose方法,   依次触发内部类的dispose
// - 对于App来说 每个Service都实现了dispose接口

// 定义接口
export interface IDisposable {
    dispose(): void;
}


// 三个字类分别实现dispose方法
class Part1 implements IDisposable {
    dispose(): void {
        console.log('dispose class part1,release system source');
    }
}
class Part2 implements IDisposable {
    dispose(): void {
        console.log('dispose class part2,release system source');
    }
}
class Part3 implements IDisposable {
    dispose(): void {
        console.log('dispose class part3,release system source');
    }
}


// 可销毁类  遍历this逐个执行销毁
class Disposable {
    dispose() {
        for (let d in this) {
            // d.dispose()
        }
    }
}

// 此类上有三个子类, 通过Disposable进行销毁
class Module extends Disposable {
    p1: Part1
    p2: Part2
    p3: Part3
    constructor() {
        super()
    }
}




// 使用时直接继承
class CodeApplication extends Disposable {
    constructor() {
        super()
    }
}