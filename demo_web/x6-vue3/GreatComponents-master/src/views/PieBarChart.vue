<template>
  <div class="pie-bar-chart">
    <!-- <div class="line top-line" :style="topLine"></div>
    <div class="line bottom-line" :style="bottomLine"></div> -->
    <canvas class="line top-line" :style="topLine"></canvas>
    <canvas class="line bottom-line" :style="bottomLine"></canvas>
    <ECharts :option="option"></ECharts>

    <div class="radio">
      <ElRadio v-model="radio" label="1">28.1%</ElRadio>
      <ElRadio v-model="radio" label="2">93.9%</ElRadio>
    </div>
  </div>
</template>

<script>
import { Radio } from 'element-ui'
import { sin, cos, atan } from '@/scripts/utils.js'
export default {
  components: { ElRadio: Radio },
  data () {
    return {
      radio: '1',
      option: {},
      topLine: {},
      bottomLine: {},
    }
  },
  watch: {
    radio() {
      let data
      if (this.radio == '1') {
        data = {
          '贫营养': 10,
          '中营养': 61.9,
          '富营养': 28.1,
          '轻度富营养': 26.8,
          '中度富营养': 1.3,
          '重度富营养': 0,
        }
      } else {
        data = {
          '贫营养': 0,
          '中营养': 6.1,
          '富营养': 93.9,
          '轻度富营养': 92.4,
          '中度富营养': 1.5,
          '重度富营养': 0,
        }
      }
      this.initPie(data)
    }
  },
  mounted () {
    let data = {
      '贫营养': 10,
      '中营养': 61.9,
      '富营养': 28.1,
      '轻度富营养': 26.8,
      '中度富营养': 1.3,
      '重度富营养': 0,
    }
    // let data = {
    //   '贫营养': 0,
    //   '中营养': 6.1,
    //   '富营养': 93.9,
    //   '轻度富营养': 92.4,
    //   '中度富营养': 1.5,
    //   '重度富营养': 0,
    // }
    this.initPie(data)
  },
  methods: {
    // 用canvas画牵引线
    initPie (data) {
      let colors = ['#5470c6', '#19a2de', '#63f7c8', '#f9de2a', '#f27b3a', '#f5735e']
      let pieList = {
        '贫营养': 0,
        '中营养': 0,
        '富营养': 0,
      }
      let barList = {
        '轻度富营养': 0,
        '中度富营养': 0,
        '重度富营养': 0,
      }
      Object.entries(data).forEach(([key, value]) => {
        key in pieList ? (pieList[key] = value) : null
        key in barList ? (barList[key] = value) : null
      })
      let width = document.querySelector('.pie-bar-chart')?.clientWidth ?? 1595
      let angle = pieList['富营养'] * 1.8 > 90 ? 90 : pieList['富营养'] * 1.8
      // 0.35 pie的高是70%， 半径为0.35
      let r = document.querySelector('.pie-bar-chart').clientHeight * 0.35
      // bar的高是0.8，320 是柱状图实际高度
      let height = 320 * 0.8 / 2
      let cosr = cos(angle) * r
      let sinr = sin(angle) * r
      // 0.25 饼的中心点是['25%', '50%'] 
      let lineAngle = atan((sinr - height) / (0.25 * width - cosr))

      this.topLine = {
        '--left': (width * 0.25 + cosr) + 'px',
        '--height': Math.abs(sinr - height) + 'px',
        '--width': (width * 0.25 - cosr) + 'px',
        '--color': colors[2],
        '--marginBottom': 2 * (sinr > height ? height : sinr) + 'px'
      }
      this.bottomLine = {
        '--left': (width * 0.25 + cosr) + 'px',
        '--height': Math.abs(sinr - height) + 'px',
        '--width': (width * 0.25 - cosr) + 'px',
        '--color': colors[2],
      }
      this.$nextTick(() => {
        
				let topCanvas = document.getElementsByClassName('top-line')[0]
				let bottomCanvas = document.getElementsByClassName('bottom-line')[0]
				console.log(topCanvas, bottomCanvas)
				let topContext = topCanvas.getContext('2d')
				let bottomContext = bottomCanvas.getContext('2d')
	
				topContext.clearRect(0, 0, topCanvas.width, topCanvas.height)
				bottomContext.clearRect(0, 0, bottomCanvas.width, bottomCanvas.height)
	
				topCanvas.height = Math.abs(sinr - height)
				topCanvas.width = (width * 0.25 - cosr)
				bottomCanvas.height = Math.abs(sinr - height)
				bottomCanvas.width = (width * 0.25 - cosr)
				topContext.beginPath()
				bottomContext.beginPath()
				if (lineAngle > 0) {
					topContext.moveTo(0, 0)
					topContext.lineTo(topCanvas.width,topCanvas.height)
					bottomContext.moveTo(0,bottomCanvas.height)
					bottomContext.lineTo(bottomCanvas.width, 0)
				} else {
					topContext.moveTo(0,topCanvas.height)
					topContext.lineTo(topCanvas.width, 0)
					bottomContext.moveTo(0, 0)
					bottomContext.lineTo(bottomCanvas.width,bottomCanvas.height)
				}
				topContext.strokeStyle = colors[2]
				bottomContext.strokeStyle = colors[2]
				topContext.stroke()
				bottomContext.stroke()
        let series = [
          {
            type: 'pie',
            radius: [0, '70%'],
            center: ['25%', '50%'],
            clockwise: false,
            startAngle: 0 + pieList['富营养'] * 1.8,
            tooltip: {
              trigger: 'item',
              formatter: '{b}: {d}%'
            },
            label: {
              show: true,
              formatter: '{b}: {d}%'
            },
            colorBy: 'data',
            data: Object.entries(pieList).map(([name, value], index) => ({name, value, itemStyle: {color: colors[index]}}))
          },
          {
            type: 'bar',
            barWidth: 20,
            barGap: '-100%',
            data: [100, 100, 100],
            itemStyle: {
              normal: {
                color: '#f3f3f3',
                barBorderRadius: 10,
              }
            },
            tooltip: {
              show: false
            },
          },
          {
            type: 'bar',
            zlevel: 1,
            silent: false,
            barWidth: 20,
            label: {
              normal: {
                show: true,
                position: [0, -24],
                textStyle: {
                  fontSize: 16
                },
                formatter: (a, b) => a.name + ':' + a.value + '%'
              }
            },
            itemStyle: {
              normal: {
                color: colors[2],
                barBorderRadius: 30,
              }
            },
            tooltip: {
              trigger: 'item',
              axisPointer: {
                type: 'none'
              },
              formatter: (params) => params.name + '占比：' + params.value + '%'
            },
            data: Object.entries(barList).map(([key, value]) => ({name: key, value}))
          },
        ]
        this.option = {
          grid: [{top: '12%', height: '80%', width: '40%', left: '50%', containLabel: true}],
          angleAxis: {show: false},
          radiusAxis: {
            type: 'category',
            axisLine: {show: false}
          },
          polar: [{}],
          xAxis: {
            show: false,
            type: 'value'
          },
          yAxis: [
            {
              type: 'category',
              inverse: true,
              axisLabel: { show: false },
              splitLine: { show: false },
              axisTick: { show: false },
              axisLine: { show: false },
              data: Object.keys(barList)
            }
          ],
          title: {
            show: true,
            top: 30,
            left: '50%',
            textStyle: {
              fontSize: 16
            },
            text: '其中：'
          },
          series
        }
      })
    },
    // 用div画牵引线，会出现锯齿状，看不清
    initPie2 (data) {
      let colors = ['#5470c6', '#19a2de', '#63f7c8', '#f9de2a', '#f27b3a', '#f5735e']
      let pieList = {
        '贫营养': 0,
        '中营养': 0,
        '富营养': 0,
      }
      let barList = {
        '轻度富营养': 0,
        '中度富营养': 0,
        '重度富营养': 0,
      }
      Object.entries(data).forEach(([key, value]) => {
        key in pieList ? (pieList[key] = value) : null
        key in barList ? (barList[key] = value) : null
      })
      let width = document.querySelector('.pie-bar-chart')?.clientWidth ?? 1595
      let angle = pieList['富营养'] * 1.8 > 90 ? 90 : pieList['富营养'] * 1.8
      // 0.35 pie的高是70%， 半径为0.35
      let r = document.querySelector('.pie-bar-chart').clientHeight * 0.35
      // bar的高是0.8，320 是柱状图实际高度
      let height = 320 * 0.8 / 2
      let cosr = cos(angle) * r
      let sinr = sin(angle) * r
      // 0.25 饼的中心点是['25%', '50%'] 
      let lineAngle = atan((sinr - height) / (0.25 * width - cosr))

      this.topLine = {
        '--left': (width * 0.25 + cosr) + 'px',
        '--height': Math.abs(sinr - height) + 'px',
        '--width': (width * 0.25 - cosr) + 'px',
        '--angle': lineAngle > 0 ? 'to right top' : 'to right bottom',
        '--color': colors[2],
        '--marginBottom': 2 * (sinr > height ? height : sinr) + 'px'
      }
      this.bottomLine = {
        '--left': (width * 0.25 + cosr) + 'px',
        '--height': Math.abs(sinr - height) + 'px',
        '--width': (width * 0.25 - cosr) + 'px',
        '--angle': lineAngle > 0 ? 'to right bottom' : 'to right top',
        '--color': colors[2],
      }
      let series = [
        {
          type: 'pie',
          radius: [0, '70%'],
          center: ['25%', '50%'],
          clockwise: false,
          startAngle: 0 + pieList['富营养'] * 1.8,
          tooltip: {
            trigger: 'item',
            formatter: '{b}: {d}%'
          },
          label: {
            show: true,
            formatter: '{b}: {d}%'
          },
          colorBy: 'data',
          data: Object.entries(pieList).map(([name, value], index) => ({name, value, itemStyle: {color: colors[index]}}))
        },
        {
          type: 'bar',
          barWidth: 20,
          barGap: '-100%',
          data: [100, 100, 100],
          itemStyle: {
            normal: {
              color: '#f3f3f3',
              barBorderRadius: 10,
            }
          },
          tooltip: {
            show: false
          },
        },
        {
          type: 'bar',
          zlevel: 1,
          silent: false,
          barWidth: 20,
          label: {
            normal: {
              show: true,
              position: [0, -24],
              textStyle: {
                fontSize: 16
              },
              formatter: (a, b) => a.name + ':' + a.value + '%'
            }
          },
          itemStyle: {
            normal: {
              color: colors[2],
              barBorderRadius: 30,
            }
          },
          tooltip: {
            trigger: 'item',
            axisPointer: {
              type: 'none'
            },
            formatter: (params) => params.name + '占比：' + params.value + '%'
          },
          data: Object.entries(barList).map(([key, value]) => ({name: key, value}))
        },
      ]
      this.option = {
        grid: [{top: '12%', height: '80%', width: '40%', left: '50%', containLabel: true}],
        angleAxis: {show: false},
        radiusAxis: {
          type: 'category',
          axisLine: {show: false}
        },
        polar: [{}],
        xAxis: {
          show: false,
          type: 'value'
        },
        yAxis: [
          {
            type: 'category',
            inverse: true,
            axisLabel: { show: false },
            splitLine: { show: false },
            axisTick: { show: false },
            axisLine: { show: false },
            data: Object.keys(barList)
          }
        ],
        title: {
          show: true,
          top: 30,
          left: '50%',
          textStyle: {
            fontSize: 16
          },
          text: '其中：'
        },
        series
      }
    },
  },
}
</script>

<style lang="less">
.pie-bar-chart {
  height: 500px;
  position: relative;
  display: flex;
  flex-flow: column;
  justify-content: center;
  .charts {
    position: absolute;
    left: 0;
    top: 0;
  }
  .line {
    --color: #000;
    margin-left: var(--left);
    display: inline-block;
    width: var(--width);
    height: var(--height);
    &.top-line {
      background: linear-gradient(var(--angle), transparent 49%, var(--color) 49%, var(--color) 50%, transparent 50%);
      margin-bottom: var(--marginBottom);
    }
    &.bottom-line {
      background: linear-gradient(var(--angle), transparent 49%, var(--color) 49%, var(--color) 50%, transparent 50%);
    }
  }
  .radio {
    position: absolute;
    left: calc(50% - 100px);
    bottom: -10px;
  }
}
</style>