<template>
  <div class="great-slider">
    <div class="great-slider-box">
      <div class="great-slider-bar start-bar">{{min}}</div>
      <div class="great-slider-line start-line" :style="`background: ${colors[0]}`"></div>
      <div class="great-slider-bar end-bar">{{max}}</div>

      <template>
        <div v-for="item in values.length" :key="'bar' + item" class="great-slider-bar move-bar" :class="{mousedown: index == item-1}" :style="`left: calc(${(values[item - 1] - min) * 100 / (max - min)}% - 12px)`" @mousedown="onMouseDown(item - 1)">{{item-1 == index ? values[item - 1].toFixed(2) : Math.round(values[item - 1])}}</div>
        <div v-for="item in values.length" :key="'line' + item" class="great-slider-line move-line" :class="{mousedown: index == item-1}" :style="`background: ${colors[item]};left: calc(${(values[item - 1] - min) * 100 / (max - min)}%`"></div>
      </template>

    </div>
    <div class="great-slider-rule"></div>
  </div>
</template>

<script>
export default {
  name: 'Slider',
  props: {
    colors: {
      type: Array,
      default: () => {
        return ['#1DC046', '#4A74FF', '#C01D1D']
      }
    },
    values: {
      type: Array,
      default: () => {
        return [60, 80]
      }
    },
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 100
    },
    // 当入参有误时，是否停止运行？true停止，false自动校正后运行
    isErrorStop: {
      type: Boolean,
      default: false
    },
  },

  data () {
    return {
      error: false,
      current: null,
      index: null,
      value: null,
      infinity: .0001,
    }
  },

  mounted () {

  },

  watch: {
    min: {
      immediate: true,
      handler () {
        if (this.min >= this.max && !this.error) {
          this.error = true
          console.error('最小值必须小于最大值')
        }
      }
    },
    values: {
      immediate: true,
      handler () {
        if (this.error) {
          console.error('最小值必须小于最大值')
          return
        }
        // 如果有非数字的values，将转为数字类型并更新数据
        if (undefined !== this.values.map(item => Number(item)).find((item, index) => item !== this.values[index])) {
          this.$emit('value-change', this.values.map(item => Number(item)));
          return
        }
        const catchList = []
        try {
          if (!this.values || !Array.isArray(this.values)) {
            catchList.push(() => {
              !this.isErrorStop && this.$emit('value-change', [this.min+1]);
              return 'values属性必须为数组'
            })
          } else if (this.values.length === 0) {
            catchList.push(() => {
              !this.isErrorStop && this.$emit('value-change', [this.min+1]);
              return 'values属性不能为空数组'
            })
          } else {
            const sortFun = (a,b) => a-b
            const val = [...this.values].sort(sortFun)
            if (JSON.stringify(this.values) !== JSON.stringify(val)) {
              catchList.push(() => {
                let val = [...this.values].sort(sortFun)
                !this.isErrorStop && this.$emit('value-change', val);
                return 'values属性必须为有序数组'
              })
            }
            if (val[0] < this.min) {
              catchList.push(() => {
                let val = [...this.values].sort(sortFun)
                val[0] = this.min + this.infinity
                !this.isErrorStop && this.$emit('value-change', val);
                return 'values属性值不能超出范围'
              })
            }
            if (val[val.length - 1] > this.max) {
              catchList.push(() => {
                let val = [...this.values].sort(sortFun)
                val[val.length - 1] = this.max - this.infinity
                !this.isErrorStop && this.$emit('value-change', val);
                return 'values属性值不能超出范围'
              })
            }
            if (undefined !== val.find((item, index) => item == val[index+1])) {
              catchList.push(() => {
                let newVal = new Array(this.values.length).fill(null).map((item,index) => this.min+1+index)
                this.$emit('value-change', newVal);
                return 'values属性值不能有重复项'
              })
            }
          }
          if (catchList.length > 0) throw {...catchList.map(item => item())}
        } catch (e) {
          this.error = this.isErrorStop
          console.error(e)
        }
      }
    }
  },

  methods: {
    onMouseDown (index) {
      if (this.error) {
        return
      }
      this.index = index
      let cover = document.createElement('div')
      cover.classList.add('cover')
      document.body.append(cover)
      this.current = document.querySelector('.cover')
      this.value = this.values[this.index]
      this.current.addEventListener('mousemove', this.onMouseMove)
      this.current.addEventListener('mouseup', this.onMouseUp)
    },
    onMouseMove (event) {
      let clientWidth = this.$el.querySelector('.great-slider-box').clientWidth
      let values = [this.min, ...this.values, this.max]
      this.value += (this.max - this.min) * event.movementX / clientWidth
      if (values[this.index] && (this.value < values[this.index])) {
        this.$set(this.values, this.index, values[this.index] + this.infinity)
        this.$emit('value-change', this.values);
      } else if (values[this.index + 2] && (this.value > values[this.index + 2])) {
        this.$set(this.values, this.index, values[this.index + 2] - this.infinity)
        this.$emit('value-change', this.values);
      } else {
        this.$set(this.values, this.index, this.value)
        this.$emit('value-change', this.values);
      }
    },
    onMouseUp () {
      this.current.removeEventListener('mousemove', this.onMouseMove)
      this.index = null
      this.value = null
      this.current.remove()
    },
  },

}
</script>

<style lang="less">
.cover {
  z-index: 9999;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  // background: #ccc;
  // opacity: .4;
  cursor: url('/favicon.ico'), auto;
}
.great-slider {
  width: 100%;
  min-height: 50px;
  padding: 50px 20px;
  box-sizing: border-box;
  overflow: hidden;
  & * {
    user-select: none;
  }
  .great-slider-box {
    width: 100%;
    height: 20px;
    position: relative;
    .great-slider-bar {
      position: absolute;
      width: 24px;
      height: 24px;
      top: -24px;
      border-radius: 50%;
      color: #fff;
      text-align: center;
      font-size: 14px;
      line-height: 24px;
      background: #000;
      &:hover {
        width: 50px;
        height: 50px;
        line-height: 50px;
        font-size: 18px;
        font-weight: 700;
        top: -50px;
        margin-left: -13px;
      }
      &.start-bar {
        left: -12px;
        // left: -5px;
      }
      &.end-bar {
        right: -12px;
        // right: -5px;
      }
      &.move-bar {
        cursor: url('/test.ico'), auto;
        transition: all .3s;
        &.mousedown {
          width: 50px;
          height: 50px;
          line-height: 50px;
          font-size: 18px;
          font-weight: 700;
          top: -50px;
          margin-left: -13px;
          transition: none;
        }
      }
    }
    .great-slider-line {
      position: absolute;
      right: 0;
      height: 10px;
      &.start-line {
        left: 0;
      }
      &.move-line {
        transition: all .3s;
        &.mousedown {
          transition: none;
        }
      }
    }
  }
  .great-slider-rule {
    width: 100%;
  }
}
</style>