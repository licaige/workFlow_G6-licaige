<!--
  滚动列表组件：
    （如果插槽子组件中传了lineHeight，那么父组件中也必须传，不传有显示bug）
    属性： 【 *datas, *height, scrollTime, delayTime, lineHeight, closeShadow 】
    事件： 【 -- 】
    插槽： 【 default(*ScrollBoardItem) 】
-->
<template>
  <div class="scroll-board" @mouseenter="hover = true" @mouseleave="hover = false">
    <ScrollBoardItem v-for="(item, index) in datas" :key="index" :itemColor="itemColor">
      <slot :item="item">{{item}}</slot>
    </ScrollBoardItem>
  </div>
</template>

<script>
export default {
  name: 'ScrollBoard',

  props: {
    datas: {
      type: Array,
      required: true,
      default:() => {
        return [
          {}
        ]
      }
    },
    // 容器高度，单位px
    height: {
      type: Number,
      default: 0
    },
    // 滚动动画时间
    scrollTime: {
      type: Number,
      default: 1000
    },
    // 滚动间隔时间
    delayTime: {
      type: Number,
      default: 1000
    },
    // 行高，单位px
    lineHeight: {
      type: Number,
      default: 40
    },
    // 鼠标放上去停止滚动
    hoverStop: {
      type: Boolean,
      default: true
    },
    // 当datas大于一条数据并且hoverStop为true时，white元素会有shadow，通过设置closeShadow可以关闭shadow
    closeShadow: {
      type: Boolean,
      default: false
    },
    background: {
      type: String,
      default: '#fff'
    },
    itemColor: {
      type: String,
      default: '#fff'
    },
  },

  data() {
    return {
      timer: null,
      timeoutTimer: null,
      hover: false
    };
  },

  mounted() {
    this.scroll()
  },

  beforeDestroy() {
    this.timer ? clearInterval(this.timer) : ''
  },

  activated() {
    this.scroll()
  },
  deactivated() {
    this.timer ? clearInterval(this.timer) : ''
  },

  methods: {
    scroll () {
      let timer = setInterval(() => {
        if (this.$el.querySelector('.scroll-board-item')) {
          clearInterval(timer)
          if (this.datas.length > Math.floor(this.height / this.lineHeight)) {
            // 需要滚动
            // 子元素初始化
            this.$el.querySelectorAll('.scroll-board-item').forEach((item, index) => {
              item.style.setProperty('transition', `top ${this.scrollTime / 1000}s`)
              item.style.setProperty('top', `${index * this.lineHeight}px`)
              item.style.setProperty('height', `${this.lineHeight}px`)
              item.style.setProperty('line-height', `${this.lineHeight}px`)
              if (this.hoverStop) {
                item.style.setProperty('cursor', 'pointer')
              }
            })
            // 初始化时复制第一条数据，置于n+1
            let item = this.$el.querySelector('.scroll-board-item').cloneNode(true)
            item.style.setProperty('top', `${this.datas.length * this.lineHeight}px`)
            item.classList.add('scroll-board-item-copy')
            this.$el.appendChild(item)

            // 遮罩层，隐藏复制过程
            let white = document.createElement('div')
            white.style.setProperty('position', 'absolute')
            white.style.setProperty('top', `${this.datas.length * this.lineHeight}px`)
            white.style.setProperty('height', `${this.lineHeight}px`)
            white.style.setProperty('width', '100%')
            white.style.setProperty('background', this.background)
            if (this.hoverStop && !this.closeShadow) {
              white.style.setProperty('box-shadow', 'rgba(0, 0, 0, .1) 0 -30px 20px 10px')
            }
            white.style.setProperty('z-index', '1')
            this.$el.appendChild(white)

            this.timer = setInterval(() => {
              if (this.hover && this.hoverStop) return
              this.$el.querySelectorAll('.scroll-board-item').forEach((item) => {
                item.style.setProperty('top', `${item.style.top.slice(0, item.style.top.length - 2) - this.lineHeight}px`)
                if (item.style.top.slice(0, item.style.top.length - 2) == 0) {
                  let item2 = item.cloneNode(true)
                  item2.classList.add('scroll-board-item-copy')
                  item2.style.setProperty('top', `${this.datas.length * this.lineHeight}px`)
                  this.$el.appendChild(item2)
                }
                if (item.style.top.slice(0, item.style.top.length - 2) <= -this.lineHeight) {
                  this.timeoutTimer ? clearTimeout(this.timeoutTimer) : ''
                  // 移到-1的位置时，将top为-1的元素置为透明并top设为n
                  this.timeoutTimer = setTimeout(() => {
                    item.style.setProperty('opacity', 0)
                    item.style.setProperty('top', `${(this.datas.length - 1) * this.lineHeight}px`)
                    setTimeout(() => {
                      this.$el.removeChild(this.$el.querySelector('.scroll-board-item-copy'))
                      item.style.setProperty('opacity', 1)
                    }, this.scrollTime)
                  }, this.scrollTime)
                }
              })
            }, this.scrollTime + this.delayTime)
          } else {
            // 不需要滚动
            if (this.$el.querySelector('.scroll-board-item')) {
              // 子元素初始化
              this.$el.querySelectorAll('.scroll-board-item').forEach((item, index) => {
                item.style.setProperty('transition', `top ${this.scrollTime / 1000}s`)
                item.style.setProperty('top', `${index * this.lineHeight}px`)
                item.style.setProperty('height', `${this.lineHeight}px`)
                item.style.setProperty('line-height', `${this.lineHeight}px`)
              })
            }
          }
        }
      }, 0)
      
    },
  },
};
</script>

<style scoped>
.scroll-board-item-copy {
  cursor: default!important;
}
</style>