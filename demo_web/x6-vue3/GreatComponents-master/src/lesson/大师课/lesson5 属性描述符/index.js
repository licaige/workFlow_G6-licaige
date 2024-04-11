let obj = {
  a: 1,
  b: '2312'
}
// 得到属性描述符：值、是否可重写、是否可遍历、是否能再修改属性描述符？
// { value: 1, writable: true, enumerable: true, configurable: true }
console.log(Object.getOwnPropertyDescriptor(obj, 'a'))

// 设置属性描述符
Object.defineProperty(obj, 'a', {
  value: 10,
  writable: false,
  enumerable: false, // for循环，Object.keys，直接打印obj都无法看到a属性
})
obj.a = 2
console.log(obj)

Object.defineProperty(obj, 'a', {
  get: function () {
    return 123
  },
  set: function () {
    throw new Error('这个属性是只读的，不能更改！')
  },
  enumerable: false, // for循环，Object.keys，直接打印obj都无法看到a属性
})

const aGoods = {
  pic: '...',
  title: '...',
  desc: '...',
  sellNumber: 1,
  favorRate: 2,
  price: 3,
}

class UIGoods {
  // 方式一
  // 计算属性的实现
  get totalPrice() {
    return this.choose * this.data.price
  }
  constructor(g) {
    g = {...g}
    // 防止篡改g里面的属性
    Object.freeze(g)
    // 防止篡改data属性
    Object.defineProperty(this, 'data', {
      get: function () {
        return g
      },
      set: function () {
        throw new Error('data属性是只读的，不能赋值')
      },
      configurable: false,
    })
    // 使用临时变量存储choose属性的值
    let internalChooseValue = 0;
    Object.defineProperty(this, 'choose', {
      get: function () {
        return internalChooseValue
      },
      set: function (val) {
        if (typeof val !== 'number') {
          throw new Error('choose属性必须是数字')
        }
        var temp = parseInt(val)
        if (temp !== val) {
          throw new Error('choose属性必须是整数')
        }
        if (val < 0) {
          throw new Error('choose属性必须大于等于0')
        }
        internalChooseValue = val
      },
      configurable: false,
    })
    // 方式二
    // Object.defineProperty(this, 'totalPrice', {
    //   get: function () {
    //     return this.choose * this.data.price
    //   },
    //   configurable: false,
    // })
    this.a = 1
    // 防止给实例化对象添加属性，但是this.a普通属性也不能改了
    Object.freeze(this)
    // 防止给实例化对象添加属性，this.a普通属性还能改
    // seal 密封 能改不能加
    Object.seal(this)
  }
}
// 防止给UIGoods原型加属性
Object.freeze(UIGoods.prototype)
UIGoods.prototype.haha = 'abc'

let g =  new UIGoods(aGoods)

g.choose = 3 // 报错

console.dir(g)
console.log(g.totalPrice)
