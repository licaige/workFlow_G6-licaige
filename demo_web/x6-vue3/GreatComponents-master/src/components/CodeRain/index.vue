<template>
  <canvas class="CodeRain">
    
  </canvas>
</template>

<script>
import {debounce} from '@/scripts/utils.js'
export default {
  name: 'CodeRain',

  data() {
    return {
      ctx: null,
      width: window.innerWidth,
      height: window.innerHeight,
      columnWidth: 20,
      // 列数
      columnCount: null,
      // 记录每列写到了第几个字
      columnNextIndexes: null,
      timer: null,
      words: null,
    };
  },

  mounted() {
    window.vm = this
    this.getComputedSize()
    // 使用防抖优化不断触发的窗口变化
    window.addEventListener('resize', debounce(this.getComputedSize, 200))
    // this.$el.height = this.height
    // this.$el.width = this.width
    // this.ctx = this.$el.getContext('2d')
    // this.columnCount = Math.floor(this.width / this.columnWidth)
    // this.columnNextIndexes = new Array(this.columnCount).fill(1)
    // this.timer = setInterval(this.draw, 40)
  },

  methods: {
    draw() {
      this.ctx.fillStyle = 'rgba(240, 240, 240, 0.1)'
      this.ctx.fillRect(0, 0, this.width, this.height)
      const fz = 20
      this.ctx.fillStyle = this.getRandomColor()
      this.ctx.font = `${fz}px "Roboto Mono"`
      for(let i = 0; i < this.columnCount; i++) {
        const x = i * this.columnWidth
        const y = fz * this.columnNextIndexes[i]
        this.ctx.fillText(this.getRandomChar(), x, y)
        if (y > this.height && Math.random() > 0.99) {
          this.columnNextIndexes[i] = 0
        } else {
          this.columnNextIndexes[i]++
        }
      }
    },
    getRandomColor() {
      const fontColors = [
        // '#33b5e5',
        // '#0099cc',
        // '#aa66cc',
        // '#99cc00',
        // '#669900',
        // '#ffbb33',
        // '#ff8800',
        // '#ff4444',
        // '#cc0000',
      ]
      for (let i = 0; i < 100; i++) {
        fontColors.push(this.getRandomColorStr())
      }
      return fontColors[Math.floor(Math.random() * fontColors.length)]
    },
    getRandomColorStr() {
      return '#' + Math.random().toString(16).slice(2, 8).padEnd(6, 0)
    },
    getRandomChar() {
      // const str = 'console.log("hello world")'
      if (!this.words) {
        const str = Math.random().toString(36).slice(2, -1)
        return str[Math.floor(Math.random() * str.length)]
      } else {
        return this.words
      }
    },
    getComputedSize() {
      clearInterval(this.timer)
      this.height = window.innerHeight
      this.width = window.innerWidth
      this.$el.height = this.height
      this.$el.width = this.width
      this.ctx = this.$el.getContext('2d')
      this.ctx.clearRect(0, 0, this.width, this.height)
      this.columnCount = Math.floor(this.width / this.columnWidth)
      this.columnNextIndexes = new Array(this.columnCount).fill(1)
      this.timer = setInterval(this.draw, 40)
    },
    setWords(words) {
      this.words = words
      this.columnWidth = words ? words.length * 20 : 20
    },
  },
  beforeDestroy() {
    clearInterval(this.timer)
  }
};
</script>

<style lang="less" scoped>
.CodeRain {
  position: fixed;
  pointer-events: none; // 解决不能滚动问题
  z-index: -1;
}
</style>