<template>
  <div class="Radar">
    <div ref="radar" class="score-radar"></div>
    <div class="form">
      <div v-for="(item, index) in list" :key="index" class="form-item">
        <input v-model="item.item" type="text">
        <Slider :values="item.score" @value-change="values => item.score = values.map(i => Math.round(i))"></Slider>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.init()
    window.addEventListener('resize', this.init)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.init)
  },
  data() {
    return {
      radar: null,
      times: 1,
      list: [
        {
          item: '综合素质评价一',
          score: [78]
        },
        {
          item: '综合素质评价二',
          score: [68]
        },
        {
          item: '综合素质评价三',
          score: [98]
        },
        {
          item: '综合素质评价四',
          score: [38]
        },
        {
          item: '综合素质评价五',
          score: [58]
        },
        {
          item: '综合素质评价六',
          score: [78]
        },
      ],
      // 多边形每边长度
      cWidth: 0,
      // 多边形直径
      cHeight: 0,
      // 内角
      angle1: 0,
      // 二分之一顶角
      angle2: 0,
    }
  },
  computed: {
    // 多边形边数
    itemNum() {
      return this.list.length
    },
  },
  watch: {
    list: {
      deep: true,
      handler() {
        this.init()
      }
    },
    times() {
      this.init()
    },
  },
  methods: {
    init() {
      this.radar = this.$refs.radar
      const {height, width} = getComputedStyle(this.radar)
      const rWidth = Number(width.split('px')[0])
      const rHeight = Number(height.split('px')[0])
      this.angle1 = Math.PI * 2 / this.itemNum
      this.angle2 = (Math.PI - this.angle1) / 2
      this.cHeight = Math.min(rWidth, rHeight) / 2
      this.cWidth = Math.floor(this.cHeight / Math.tan(this.angle2))
      this.initRadar()
    },
    initRadar() {
      this.radar.innerHTML = ''
      const mainDiv = document.createElement('div')
      mainDiv.classList.add('mainDiv')
      mainDiv.style.height = (this.cHeight / 2) + 'px'
      mainDiv.style.marginTop = -(this.cHeight / 2) + 'px'
      mainDiv.style.width = this.cWidth + 'px'
      
      const div = document.createElement('div')
      div.classList.add('item-label')
      for (let i = 0; i < this.itemNum; i++) {
      // for (let i = 0; i < 1; i++) {
        const angle = this.angle1 * 180 / Math.PI
        mainDiv.style.transform = `rotate(${angle * i}deg) scale(${this.times})`
        const valueDiv = document.createElement('div')
        valueDiv.classList.add('valueDiv')
        const line = this.getComputedAngle(this.cWidth, i)
        valueDiv.style.clipPath = `polygon(${line}, 50% 100%)`
        const e = mainDiv.cloneNode(true)
        e.appendChild(valueDiv)
        this.radar.appendChild(e)

        div.style.transform = `rotate(${angle * (0.5 + i)}deg)`
        const clone = div.cloneNode()
        const span = document.createElement('span')
        span.style.transform = `rotate(${-angle * (0.5 + i)}deg)`
        if (angle * (0.5 + i) > 180) {
          span.style.direction = 'rtl'
        }
        span.innerHTML = `<div>${this.list[i].item}</div><div>${this.list[i].score[0]}分</div>`
        clone.appendChild(span)
        this.radar.appendChild(clone)
        const {height, width} = getComputedStyle(span)
        console.log(span, height, width)
        const margin = Math.max(Number(height.split('px')[0]), Number(width.split('px')[0]), 30)
        clone.style.height = ((this.cHeight / 2) / Math.cos(this.angle2 / 2) + margin) + 'px'
        clone.style.marginTop = -((this.cHeight / 2) / Math.cos(this.angle2 / 2) + margin) + 'px'
      }
    },
    getComputedAngle(cWidth, i) {
      // 二分之一顶角
      const angle = this.angle2
      let last = i == 0 ? this.list.length -1 : i - 1
      let a = this.list[last].score[0], b = this.list[i].score[0]
      let af = 2*b*(100-a)*Math.sin(angle) / (a+b)
      let bk = 200 * (a - b)*Math.sin(angle) / (a+b) + af
      return `0% ${af * cWidth / Math.cos(angle) / 200}px, ${cWidth}px ${bk * cWidth / Math.cos(angle) / 200}px`
    },
  },
}
</script>
<style lang="less">
.Radar {
  height: 100%;
  width: 100%;
  display: inline-flex;
  padding: 0 100px;
  gap: 100px;
  .score-radar {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
    border: 3px solid #999;
    resize: both;
    .mainDiv {
      display: inline-block;
      transform-origin: bottom center;
      position: absolute;
      border: 1px solid #000;
      clip-path: polygon(0% 0%, 100% 0%, 50% 100%);
      background: #ccc;
      &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #fff; /* 设置边框 */
        clip-path: inherit; /* 应用裁剪路径 */
      }
      & > .valueDiv {
        height: 100%;
        width: 100%;
        background: red;
        // &::before {
        //   content: "";
        //   position: absolute;
        //   top: 0;
        //   left: 0;
        //   width: 100%;
        //   height: 100%;
        //   background: #fff; /* 设置边框 */
        //   clip-path: inherit; /* 应用裁剪路径 */
        // }
      }
    }
    .item-label {
      display: inline-block;
      transform-origin: bottom center;
      position: absolute;
      & > span {
        // width: 0;
        display: inline-block;
        white-space: pre-line;
        text-align: center;
        word-break: keep-all;
      }
    }
  }
  .form {
    display: flex;
    flex-flow: column nowrap;
    width: 500px;
    & > .form-item {
      display: inline-flex;
      align-items: center;
      height: 80px;
    }
  }
}
</style>