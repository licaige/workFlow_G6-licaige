// 抽离共通部分(动物都会叫)
function makeSound(animal: any) {
    animal.sound()
}

// 可变部分封装起来(不同动物叫声不同)
class Duck {
    sound() { console.log('嘎嘎嘎') }
}
class Dog {
    sound() { console.log('汪汪汪') }
}
class Chicken {
    sound() { console.log('咯咯咯') }
}

makeSound(new Duck())
makeSound(new Dog())
makeSound(new Chicken())


// 定义抽象类
abstract class Animal {
    abstract makeSound()
}
// 类实现抽象
class Dog extends Animal {
    makeSound() { console.log('汪汪汪') }
}