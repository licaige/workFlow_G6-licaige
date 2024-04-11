const goods = [
  {
    title: '商品1',
    price: 3,
  },
  {
    title: '商品2',
    price: 5,
  },
  {
    title: '商品3',
    price: 6,
  },
  {
    title: '商品4',
    price: 2,
  },
]

// 单件商品数据
class UIGoods {
  constructor (g) {
    this.data = g
    this.choose = 0
  }
  // 新增某一个商品的选择数量
  increase() {
    this.choose++
  }
  // 减少某一个商品的选择数量
  decrease() {
    if (this.choose < 1) {
      return
    }
    this.choose--
  }
  // 获取总价
  getTotalPrice() {
    return this.data.price * this.choose
  }
  // 获取是否选择当前商品
  isChoose() {
    return this.choose > 0
  }
}

// 整个界面数据（购物车数据）
class UIData {
  constructor () {
    // 实例化所有商品对象
    this.uiGoods = goods.map(item => (
      new UIGoods(item)
    ))
    // 起送价格
    this.deliveryThreshold = 30
    // 配送费
    this.deliveryPrice = 5
  }
  // 获取总价
  getTotalPrice() {
    return this.uiGoods.reduce((a,b) => a + b.getTotalPrice(), 0)
  }
  // 新增某一个商品的选择数量
  increase(index) {
    return this.uiGoods[index].increase()
  }
  // 减少某一个商品的选择数量
  decrease(index) {
    return this.uiGoods[index].decrease()
  }
  getTotalChooseNumber() {
    return this.uiGoods.reduce((a,b) => a + b.choose, 0)
  }
  // 购物车中有没有东西
  hasGoodsInCar() {
    return this.getTotalChooseNumber() > 0
  }
  // 有没有达到起送标准
  isCrossDeliveryThreshold() {
    return this.getTotalPrice() >= this.deliveryThreshold
  }
}

// 整个界面
class UI {
  constructor () {
    this.uiData = new UIData()
    this.doms = {
      goodsContainer: '',
      car: '',
    }
    this.createHTML()
    this.listenEvent()
  }
  // 监听各种事件
  listenEvent() {
    // 动画事件结束，移除动画class，下次添加class才会再次触发特效
    this.doms.car && this.doms.car.addEventListener('animationend', function () {
      this.classList.remove('animate')
    })
  }
  createHTML() {
    // 1. 生成html字符串（执行效率不高，开发效率高，需要生成dom）
    // 2. 一个一个创建元素（js创建好dom，浏览器直接拿去用）
    // 该场景使用第一种会更高效 不要提前优化，提前优化是灾难的开始
    let html = ''
    for (let i = 0; i < this.uiData.uiGoods.length; i++) {
      let g = this.uiData.uiGoods[i]
      console.log(g)
      html += `<div class="goods-item>
        <img >
        <div class="goods-info">
          <h2 class="goods-title">
            ${g.data.title}
          </h2>
          <p class="goods-price">
            ${g.data.price}
          </p>
          <i index="${i}" class="zengjia">+</i>
          ${g.choose}
          <i index="${i}" class="zengjia">-</i>
        </div>
      </div>`
    }
    console.log(html)
  }
  increase(index) {
    this.uiData.increase(index)
    this.updateGoodsItem(index)
  }
  decrease(index) {
    this.uiData.decrease(index)
    this.updateGoodsItem(index)
  }
  // 更新某个商品元素的显示状态
  updateGoodsItem(index) {

  }
}
// 只需要调用UI工具，不需要关心UIGoods和UIData，UI已经自动帮你用了
let ui = new UI()

// 绑定事件，事件委托
ui.doms.goodsContainer && ui.doms.goodsContainer.addEventListener('click', (e) => {
  // 使用自定义属性来获取下标
  // 方式一
  let index = +e.target.getAttribute('index')
  // 方式二
  index = +e.target['data-index']
  if (e.target.classList.contains('zengjia')) {
    ui.increase(index)
  } else if (e.target.classList.contains('jianshao')) {
    ui.decrease(index)
  }
})


// 加购物车特效
function addToCar () {
  let div = document.createElement('div')
  let span = document.createElement('span')
  div.appendChild(span)
  span.innerText = 'haha'
  div.style.zIndex = '999'
  div.style.position = 'fixed'
  div.style.top = '300px'
  div.style.transform = 'translateX(10px)'
  div.style.transition = '0.6s linear'

  span.style.display = 'block'
  // div.style.background = 'blue'
  span.style.background = 'red'
  span.style.transform = 'translateY(-100px)'
  span.style.transition = '0.6s cubic-bezier(0.5, -0.5, 1, 1)'
  document.body.appendChild(div)
  div.clientWidth;

  div.style.transform = 'translateX(800px)'
  span.style.transform = 'translateY(100px)'
  div.addEventListener('transitionend', () => {
    div.remove()
  })
}