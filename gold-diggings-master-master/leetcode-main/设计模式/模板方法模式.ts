
// 定义模板抽象类
abstract class Drink {
    init() { // 制作一杯饮料
        this.boilWater()
        this.brew()
        this.pourInCup()
        this.addConditions()
    }

    abstract boilWater()
    abstract brew()
    abstract pourInCup()
    abstract addConditions()
}

// 具体类实现抽象类
class Tea extends Drink {
    constructor() { super() }

    boilWater() { console.log('煮沸水') }
    brew() { console.log('浸泡茶叶') }
    pourInCup() { console.log('倒入杯子') }
    addConditions() { console.log('加点柠檬') }
}

// 执行模板方法(其他饮料也按照此模板进行制作)
let tea = new Tea()
tea.init()





