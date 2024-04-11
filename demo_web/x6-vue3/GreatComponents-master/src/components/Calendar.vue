<template>
  <div class="great-calendar">
    <div class="great-calendar-flex">
      <div v-for="dayNum in 7" :key="dayNum*4+1" class="day-num" :class="`day${dayNum+1}`">
        {{dayNum===1 ? '日' :
          dayNum===2 ? '一' :
          dayNum===3 ? '二' :
          dayNum===4 ? '三' :
          dayNum===5 ? '四' :
          dayNum===6 ? '五' : '六'
        }}
      </div>
      <div v-for="(day, index) in beforeMounth" :key="index*4+2" class="day before">
        {{new Date(day.date).getDate()}}
      </div>
      <div v-for="(day, index) in currentMounth" :key="index*4+3" class="day current">
        <div :class="day.num<=0?'':day.num<2?'green':day.num<=4?'yellow':'red'" :title="user? user: ''">
          {{
            new Date(day.date).getDate()
          }}
        </div>
      </div>
      <div v-for="(day, index) in afterMounth" :key="index*4" class="day after">
        {{new Date(day.date).getDate()}}
      </div>
    </div>
  </div>
</template>

<script>
import Event from "@/scripts/pubsub.js"
export default {
  name: 'GreatCalendar',
  props: {
    currentMounth: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      beforeMounth: [],
      afterMounth: [],
      user: '',
    }
  },
  mounted () {
    // 测试 loading 防抖
    this.getValue(100, {target: this.$el})
    this.getValue(200, {target: this.$el})
    this.getValue(500)
    var that = this
    // 测试发布订阅pubsub
    Event.listen('user', function (user) {
      that.user = user
    })
  },
  watch: {
    currentMounth: {
      immediate: true,
      deep: true,
      handler () {
        let time1, time2
        if(this.currentMounth.length>0){
        let first = new Date(this.currentMounth[0].date).getDay()
        let beforeDay = first === 7 ? 0 : first
        this.beforeMounth = []
        for (let i = 0; i < beforeDay; i++) {
          time1 = new Date(new Date(this.currentMounth[0].date).getTime() - (i + 1) * 1000*60*60*24)
          this.beforeMounth.unshift({
            date: time1.getFullYear() + '-' + (time1.getMonth() + 1) + '-' + time1.getDate()
          })
        }
        // 六行补齐
        let afterDay = 42 - this.currentMounth.length - beforeDay
        this.afterMounth = []
        for (let i = 0; i < afterDay; i++) {
          time2 = new Date(new Date(this.currentMounth[this.currentMounth.length - 1].date).getTime() + (i + 1) * 1000*60*60*24)
          this.afterMounth.push({
            date: time2.getFullYear() + '-' + (time2.getMonth() + 1) + '-' + time2.getDate()
          })
        }
        }
      }
    }
  },
  methods: {
    // 模拟后端接口方法
    async getValue (delay, loadingProps) {
      // 这里也得用await，否则接收到的是一个Promise对象
      let { data } = await this.$server(() => this.f1(delay), loadingProps)
      console.log(data)
    },
    // 模拟后端接口，delay为模拟后端响应时间
    f1 (delay) {
      return new Promise((resolve) => {
        setTimeout(function () {
          let a = {
            data: {
              code: 200,
              msg: '接口有误',
              data: 'chenggong'
            }
          }
          // f1的任务代码
          resolve(a);
        }, delay);
      })
    },
    // 模拟后端接口，delay为模拟后端响应时间
    f2 (delay) {
      return new Promise(resolve => setTimeout(resolve, delay));
    },
  },
}
</script>

<style lang="less" scoped>
.great-calendar {
  width: 100%;
  height: 100%;
  background: #F5F8FF;
  border-radius: 4px;
  .great-calendar-flex {
    display: flex;
    flex-flow: row wrap;
    padding-top: 9px;
    .day-num {
      width: calc(100% / 7);
      line-height: 32px;
      text-align: center;
      font-size: 16px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #050809;
      letter-spacing: 2px;
      text-shadow: 1px 7px 19px #D1DAE2;
    }
    .day {
      width: calc(100% / 7);
      font-size: 16px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      line-height: 32px;
      letter-spacing: 2px;
      text-shadow: 1px 7px 19px #D1DAE2;
      text-align: center;
      &.before {
        color: #8F959C;
      }
      &.current {
        color: #050809;
        cursor: pointer;
        .green, .yellow, .red {
          display: inline-block;
          box-sizing: border-box;
          width: 28px;
          height: 28px;
          line-height: 28px;
          border-radius: 16px;
          color: #fff;
        }
        .green {
          background: #59C850;
        }
        .yellow {
          background: #F1CD21;
        }
        .red {
          background: #E46F6F;
        }
      }
      &.after {
        color: #8F959C;
      }
    }
  }
}
</style>