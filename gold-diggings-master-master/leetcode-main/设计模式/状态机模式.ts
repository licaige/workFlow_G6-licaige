
// class Light {

//     state: string // 内部状态

//     // 切换状态方法  这里定义三种状态
//     press() {
//         if (this.state === '关闭') {
//             this.state = '弱光'
//         }
//         else if (this.state === '弱光') {
//             this.state = '强光'
//         }
//         else if (this.state === '强光') {
//             this.state = '关闭'
//         }
//     }
// }

// 将状态 和状态对应的行为 封装为单独的类
class Off {
    light: Light
    constructor(light: Light) { this.light = light }
    press() { this.light.state = '弱光' }  // 切换状态方法  
}

class WeakLight {
    light: Light
    constructor(light: Light) { this.light = light }
    press() { this.light.state = '强光' }  // 切换状态方法  
}

class StrongLight {
    light: Light
    constructor(light: Light) { this.light = light }
    press() { this.light.state = '关闭' }  // 切换状态方法  
}

// 之后我们的Light类中需要保存状态对象
class Light {
    state: any // 内部状态

    constructor() {// 注册状态
        this.state.Off = new Off(this)
        this.state.weakLight = new WeakLight(this)
        this.state.strongLight = new StrongLight(this)
    }

    // 提供setState方法, 设置当前状态
    setState() { }
}