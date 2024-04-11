<template>
  <div v-load="init" class="charts" :class="chartClassName">
    
  </div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  name: 'ECharts',

  props: {
    chartClassName: String || Object,
    option: {
      type: Object,
      require: true
    }
  },

  watch: {
    option: {
      deep: true,
      handler () {
        this.reload()
      },
    }
  },

  computed: {
    chartDom () {
      return this.$el
    }
  },

  mounted() {
    // 不懒加载时需解开注释
    this.init()
  },

  methods: {
    init () {
      let myChart = echarts.init(this.chartDom)
      this.option && myChart.setOption(this.option)
      let handleRisize = () => {
        myChart.resize()
      }
      window.addEventListener('resize', handleRisize)
      this.$once('hook:beforeDestory', () => {
        window.removeEventListener('resize', handleRisize)
      })
    },
    reload () {
      if (this.chartDom.hasAttribute('_echarts_instance_')) {
        this.chartDom.removeAttribute('_echarts_instance_')
      }
      let myChart = echarts.init(this.chartDom)
      this.option && myChart.setOption(this.option)
    }
  },
  directives: {
    load: {
      mounted(el, binding) {
        console.log(el, binding)
        let observer = new IntersectionObserver(([{isIntersecting}]) => {
          console.log('触发了', isIntersecting)
          if (isIntersecting) {
            // 懒加载中执行init方法
            binding.value && binding.value()
            observer.unobserve(el)
          }
        })
        observer.observe(el)
      }
    }
  },
};
</script>

<style>
.charts {
  height: 100%;
  width: 100%;
}
</style>