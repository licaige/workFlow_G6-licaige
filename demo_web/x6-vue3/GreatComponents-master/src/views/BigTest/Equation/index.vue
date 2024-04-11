<template>
  <div class="equation">
    <div class="form">
      x1:<input v-model="x1" type="text"/>
      y1:<input v-model="y1" type="text"/>
      x2:<input v-model="x2" type="text"/>
      y2:<input v-model="y2" type="text"/>
    </div>
    <div class="content">
      <canvas :key="k" ref="canvas" width="700" height="500"></canvas> 
    </div>
    <div class="form">
      函数: {{ equation }}
    </div>
  </div>
</template>

<script>
export default {
  async mounted() {
    this.canvas = this.$refs.canvas
    this.ctx = this.canvas?.getContext('2d')
    // 翻转Y轴  
    this.ctx.scale(1, -1); // 翻转Y轴，X轴保持不变  
    this.ctx.translate(this.canvas.width / 2, -this.canvas.height / 2); // 将画布向下移动一个画布的高度，以补偿翻转
    this.init()
    await this.$nextTick()
    this.canvas.onmousedown = (e) => {
      console.log('eeeeeeeeeeee')
      let x= e.offsetX - this.canvas.width / 2, y = this.canvas.height / 2 - e.offsetY;
      if (this.x1 - 5 < x && this.x1 + 5 > x && this.y1 - 5 < y && this.y1 + 5 > y) {
        this.canvas.onmousemove = (e2) => {
          this.x1 = e2.offsetX - this.canvas.width / 2
          this.y1 = this.canvas.height / 2 - e2.offsetY
        }
      } else if (this.x2 - 5 < x && this.x2 + 5 > x && this.y2 - 5 < y && this.y2 + 5 > y) {
        this.canvas.onmousemove = (e2) => {
          console.log('222222222222222222')
          this.x2 = e2.offsetX - this.canvas.width / 2
          this.y2 = this.canvas.height / 2 - e2.offsetY
        }
      } else {
        return
      }
      this.canvas.onmouseup = _ => {
        this.canvas.onmouseup = null
        this.canvas.onmousemove = null
      }
    }
  },
  data() {
    return {
      k: 1,
      canvas: null,
      ctx: null,
      x1: 0,
      y1: 0,
      x2: 20,
      y2: 20,
      equation: '',
    }
  },
  computed: {
    list() {
      return [Number(this.x1), Number(this.y1), Number(this.x2), Number(this.y2)]
    },
  },
  watch: {
    list: {
      deep: true,
      handler() {
        this.init()
      }
    },
  },
  methods: {
    async init() {
      // this.k++
      // await this.$nextTick()
      
      this.ctx.clearRect(-this.canvas.width, -this.canvas.height, this.canvas.width * 2, this.canvas.height * 2)
      // 绘制x轴
      this.ctx.beginPath()
      this.ctx.moveTo(-this.canvas.width / 2, 0)
      this.ctx.lineTo(this.canvas.width / 2, 0)
      this.ctx.strokeStyle = 'black'; // 线条颜色
      this.ctx.lineWidth = 2; // 线条粗细
      this.ctx.stroke(); // 绘制线条
      // 绘制y轴
      this.ctx.beginPath()
      this.ctx.moveTo(0, this.canvas.height / 2)
      this.ctx.lineTo(0, -this.canvas.height / 2)
      this.ctx.strokeStyle = 'black'; // 线条颜色
      this.ctx.lineWidth = 2; // 线条粗细
      this.ctx.stroke(); // 绘制线条

      // 添加箭头（可选）
      // X轴箭头
      this.ctx.beginPath();
      this.ctx.moveTo(this.canvas.width / 2 - 10, -5);
      this.ctx.lineTo(this.canvas.width / 2, 0);
      this.ctx.lineTo(this.canvas.width / 2 - 10, 5);
      this.ctx.strokeStyle = 'black';
      this.ctx.stroke();
  
      // Y轴箭头
      this.ctx.beginPath();
      this.ctx.moveTo(-5, this.canvas.height / 2 - 10);
      this.ctx.lineTo(0, this.canvas.height / 2);
      this.ctx.lineTo(5, this.canvas.height / 2 - 10);
      this.ctx.strokeStyle = 'black';
      this.ctx.stroke();
  
      // // 添加标签（可选）
      this.ctx.save(); // 保存当前状态
      this.ctx.translate(0, 0); // 将原点移动到画布中心
      this.ctx.scale(1, -1); // 沿Y轴翻转
      this.ctx.font = '14px Arial';
      this.ctx.fillText('X', this.canvas.width / 2 - 15, 25);
      this.ctx.fillText('Y', -15, -this.canvas.height / 2 + 25);
      this.ctx.restore(); // 恢复之前保存的状态
      this.draw()
    },
    draw() {
      if (this.list.reduce((a, b) => a && typeof b == 'number', true)) {
        // 绘制两点坐标
        this.ctx.beginPath();
        this.ctx.arc(this.x1, this.y1, 5, 0, 2 * Math.PI, true)
        this.ctx.fillStyle = 'red'
        this.ctx.fill()

        this.ctx.beginPath();
        this.ctx.arc(this.x2, this.y2, 5, 0, 2 * Math.PI, true)
        this.ctx.fillStyle = 'red'
        this.ctx.fill()
        this.equation = this.getComputedEquation()
        this.ctx.beginPath();
        let x1, x2, y1, y2;
        if (!this.equation) return;
        if (this.equation.includes('y =')) {
          x1 = -this.canvas.width
          x2 = this.canvas.width
          y1 = new Function(this.equation.replace('y =', 'return').replace('x', x1))()
          y2 = new Function(this.equation.replace('y =', 'return').replace('x', x2))()
        } else if (this.equation.includes('x =')) {
          y1 = -this.canvas.height
          y2 = this.canvas.height
          x1 = new Function(this.equation.replace('x =', 'return'))()
          x2 = new Function(this.equation.replace('x =', 'return'))()
        }
        this.ctx.moveTo(x1, y1);
        this.ctx.lineTo(x2, y2);
        this.ctx.strokeStyle = 'blue';
        this.ctx.stroke();
      }
      this.ctx
    },
    getComputedEquation() {
      let k = (this.y2 - this.y1) / (this.x2 - this.x1)
      let b = this.y1 - k * this.x1
      if (this.x2 == this.x1 && this.y2 == this.y1) {
        return false
      } else if (this.x2 == this.x1) {
        return `x = ${this.x1}`
      } else if (this.y2 == this.y1) {
        k = 0
        return `y = ${this.y1}`
      } else {
        b = this.y1 - k * this.x1
        let result = `y = ${Number(k.toFixed(2))} * x `
        if (b > 0) {
          result += `+ ${Number(b.toFixed(2))}`
        } else if (b < 0) {
          result += `- ${-Number(b.toFixed(2))}`
        }
        return result
      }
    },
  },
}
</script>
<style lang="less">
.equation {
  height: 100%;
  width: 100%;
  display: flex;
  flex-flow: column nowrap;
  margin: 0 auto;
  gap: 20px;
  .form {
    display: flex;
    justify-content: center;
  }
  .content {
    display: flex;
    justify-content: center;
    & > canvas{
      border: 1px solid #ccc
    }
  }
}
</style>