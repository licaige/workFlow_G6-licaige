export class Site {
  constructor(target) {
    // if (!Site.instance) {
      if (target instanceof HTMLElement) {
        this.target = target
        this.height = 500
        this.width = 1000
        this.target.style.cssText = `
          position: relative;
          height: ${this.height}px;
          width: ${this.width}px;
          border: 1px solid #888;
          pointer-events: none;
          overflow: hidden;
        `
        Site.instance = this
      } else {
        return new Error('请传入HTMLElement类型元素！')
      }
    // }
    // return Site.instance
  }
}

export class Leader {
  constructor(site, x, y, height, width, color) {
    // if (!Leader.instance) {
      this.#site = site.target
      this.#x = Number.parseInt(x * site.width)
      this.#y = Number.parseInt(y * site.height)
      this.#color = color
      this.#height = height
      this.#width = width
      Leader.instance = this
    // }
    // return Leader.instance
  }
  #site
  #target
  to = 'right'
  disabled=[]
  intersectionRatio=1
  others = []
  #x
  #y
  #height
  #width
  #color
  #init() {
    const dom = document.createElement('div')
    dom.className = `leader ${this.to}`
    dom.style.cssText = `
      position: absolute;
      height: ${this.#height}px;
      width: ${this.#width}px;
      border: 1px solid ${this.#color ?? 'blue'};
      z-index: ${Number.parseInt(this.#y + 100)};
      // margin-top: ${this.#y}px;
      // margin-left: ${this.#x}px;
      transform: translate(${this.#x}px, ${this.#y}px);
    `
    this.#site.appendChild(dom)
    // document.body.addEventListener('keypress', this.#onKeypress)
    document.body.onkeypress = this.#onKeypress
    this.io = new IntersectionObserver((changes, observer) => {
      if (changes[0].intersectionRatio < this.intersectionRatio ) {
        this.disabled.push(this.to)
      } else {
        this.disabled = []
      }
      this.intersectionRatio = changes[0].intersectionRatio
      console.log(this.disabled)
    }, {
      // root: this.#site,
      threshold: [0, 1]
    })
    this.io.observe(dom)
    return dom
  }
  #onKeypress(e) {
    // console.log(e)
    if (e.key == 'w') {
      // 上
      Leader.instance.move('top', 10)
    } else if (e.key == 's') {
      // 下
      Leader.instance.move('bottom', 10)
    } else if (e.key == 'a') {
      // 左
      Leader.instance.move('left', 10)
    } else if (e.key == 'd') {
      // 右
      Leader.instance.move('right', 10)
    }
  }
  freshCSS() {
    this.#target.className = `leader ${this.to}`
    this.#target.style.height = `${this.#height}px`
    this.#target.style.width = `${this.#width}px`
    this.#target.style.zIndex = `${Number.parseInt(this.#y + 100)}`
    // this.#target.style.marginTop = `${this.#y}px`
    // this.#target.style.marginLeft = `${this.#x}px`
    this.#target.style.transform = `translate(${this.#x}px, ${this.#y}px)`
  }
  higher(num, times = 1) {
    this.#height = this.#height + num * times
  }
  fat(num, times = 1) {
    this.#width = this.#width + num * times
  }
  biger(num, times = 1) {
    this.higher(num, times)
    this.fat(num, times)
  }
  move(to, step) {
    this.to = to
    if (this.disabled.indexOf(to) !== -1) return
    for (let i = 0; i < this.others.doms.length; i++) {
      if(isOverlap(this.#target, this.others.doms[i].target)) {
        // console.log('重合！！！！！！！！！！！')
        // console.log(this.#target, this.others.doms[i].target)
        this.#height += (0.1 * (this.#height - this.others.doms[i].height))
        this.#width += (0.1 * (this.#width - this.others.doms[i].width))
        if (this.#height < 5 || this.#width < 5) {
          console.log('Game Over!')
          window.vm.setWords('Game Over!')
          this.destroy()
        }
        if (this.#height > this.others.doms[i].height || this.#width > this.others.doms[i].wdith) {
          console.log('eat!')
          window.vm.setWords('Eat!')
          this.others.destroy(i)
          setTimeout(() => {
            window.vm.setWords()
          }, 1000)
        }
      }
    }
    if (to == 'top') {
      this.#y = this.#y - step
      this.biger(-step, 0.01)
    } else if (to == 'bottom') {
      this.#y = this.#y + step
      this.biger(step, 0.01)
    } else if (to == 'left') {
      this.#x = this.#x - step
    } else if (to == 'right') {
      this.#x = this.#x + step
    }
    this.freshCSS()
  }
  setOthers(others) {
    this.others = others
    this.#target = this.#init()
  }
  destroy() {
    this.others.destroy()
    // document.body.removeEventListener('keypress', this.#onKeypress)
    document.body.onkeypress = null
    this.io.disconnect()
  }
}

export class Others {
  constructor(site, x, y, height, width, color) {
    this.#site = site.target
    this.#x = Number.parseInt(x * site.width)
    this.#y = Number.parseInt(y * site.height)
    this.height = height
    this.width = width
    this.#color = color
    this.target = this.#init()
  }
  #site
  to = 'right'
  disabled=[]
  #x
  #y
  #color
  #init() {
    const dom = document.createElement('div')
    dom.className = `others ${this.to}`
    dom.style.cssText = `
      position: absolute;
      height: ${this.height}px;
      width: ${this.width}px;
      background: ${this.#color ?? 'red'};
      z-index: ${Number.parseInt(this.#y + 100)};
      transform: translate(${this.#x}px, ${this.#y}px);
    `
    this.#site.appendChild(dom)
    
    return dom
  }
  freshCSS() {
    this.target.className = `lead ${this.to}`
    this.target.style.height = `${this.height}px`
    this.target.style.width = `${this.width}px`
    this.target.style.zIndex = `${Number.parseInt(this.#y + 100)}`
    // this.target.style.marginTop = `${this.#y}px`
    // this.target.style.marginLeft = `${this.#x}px`
    this.target.style.transform = `translate(${this.#x}px, ${this.#y}px)`
  }
  higher(num, times = 1) {
    this.height = this.height + num * times
  }
  fat(num, times = 1) {
    this.width = this.width + num * times
  }
  biger(num, times = 1) {
    this.higher(num, times)
    this.fat(num, times)
  }
  move(to, step) {
    this.to = to
    if (this.disabled.indexOf(to) !== -1) return
    if (to == 'top') {
      this.#y = this.#y - step
    } else if (to == 'bottom') {
      this.#y = this.#y + step
    } else if (to == 'left') {
      this.#x = this.#x - step
    } else if (to == 'right') {
      this.#x = this.#x + step
    }
    this.freshCSS()
  }
  destroy() {
    this.target.style.display = `none`
    this.#site.removeChild(this.target)
  }
}


export class MultiOthers{
  constructor(number, site, color, height, width) {
    this.doms = []
    for (let i = 0; i < number; i++) {
      const x = Math.random()
      const y = Math.random()
      const h = Number.parseInt((1.5 - Math.random()) * height)
      const w = Number.parseInt((1.5 - Math.random()) * width)
      const dom = new Others(site, x, y, h, w, color)
      this.doms.push(dom)
    }
  }
  destroy(i) {
    console.log(i)
    if (typeof i == 'number') {
      this.doms[i].destroy()
      this.doms = this.doms.filter((item, index) => {
        return index !== i
      })
    } else {
      this.doms.forEach(item => {
        item.destroy()
      })
      this.doms = []
    }
  }
}

function isOverlap(element1, element2) {
  const style1 = window.getComputedStyle(element1);
  const style2 = window.getComputedStyle(element2);
  const rect1 = {
    left: parseInt(style1.getPropertyValue('transform').split(',')[4]),
    top: parseInt(style1.getPropertyValue('transform').split(',')[5]),
    width: parseInt(style1.getPropertyValue('width')),
    height: parseInt(style1.getPropertyValue('height'))
  };
  const rect2 = {
    left: parseInt(style2.getPropertyValue('transform').split(',')[4]),
    top: parseInt(style2.getPropertyValue('transform').split(',')[5]),
    width: parseInt(style2.getPropertyValue('width')),
    height: parseInt(style2.getPropertyValue('height'))
  };
  return !(rect1.left + rect1.width < rect2.left || 
           rect1.left > rect2.left + rect2.width ||
           rect1.top + rect1.height < rect2.top ||
           rect1.top > rect2.top + rect2.height);
}

export function initMap(target, leadProps = {}, others = {}, commen = {}) {
  const site = new Site(target)
  const { x = Math.random(), y = Math.random() } = leadProps
  const { number = 10, color } = others
  const { height = 10, width = 10 } = commen
  let o = new MultiOthers(number, site, color, height, width)
  console.log(o)
  let l = new Leader(site, x, y, height, width)
  l.setOthers(o)
  console.log(l)

}