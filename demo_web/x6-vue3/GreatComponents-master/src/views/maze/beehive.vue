<template>
  <div class="maze-beehive">
    <div v-for="(item, index) in map" :key="index" class="line">
      <svg
        width="100"
        height="100"
        v-for="(cell, k) in item"
        :key="k"
        class="cell"
        :class="{
          'wall': cell,
          'start': index == input[0] && k == input[1],
          'end': index == output[0] && k == output[1],
          'path': path.find(
            ([x, y]) => x == index && y == k
          ) && removeIndex.indexOf(
            path.findIndex(([x, y]) => x == index && y == k)
          ) == -1,
          'path2': removeIndex.indexOf(
            path.findIndex(([x, y]) => x == index && y == k)
          ) != -1
        }">
        <text v-if="index == input[0] && k == input[1]" x="32" y="57" color="rgb(0, 0, 255)">start</text>
        <text v-if="index == output[0] && k == output[1]" x="35" y="57" color="rgb(0, 0, 255)">end</text>
        <polygon
          fill="transparent"
          points="25,0 75,0 100,50 75,100 25,100 0,50" />
        <line
          x1='25' y1='0' x2='75' y2='0'
          style='stroke-width:1;stroke:rgba(0, 0, 255, 0.3)'/>
        <line
          x1='100' y1='50' x2='75' y2='0'
          style='stroke-width:1;stroke:rgba(0, 0, 255, 0.3)'/>
        <line
          x1='100' y1='50' x2='75' y2='100'
          style='stroke-width:1;stroke:rgba(0, 0, 255, 0.3)'/>
        <line
          x1='25' y1='100' x2='75' y2='100'
          style='stroke-width:1;stroke:rgba(0, 0, 255, 0.3)'/>
        <line
          x1='25' y1='100' x2='0' y2='50'
          style='stroke-width:1;stroke:rgba(0, 0, 255, 0.3)'/>
        <line
          x1='25' y1='0' x2='0' y2='50'
          style='stroke-width:1;stroke:rgba(0, 0, 255, 0.3)'/>
      </svg>
    </div>
    <div v-if="shortestPath.length > 1" class="radio">
      <ElRadio
        v-for="(item, index) in shortestPath"
        :key="index"
        v-model="radio2"
        :label="index"
        @change="handleChange">
        路径{{index+1}}
      </ElRadio>
    </div>
  </div>
</template>

<script>
import { Radio } from 'element-ui'
import mixin from './mixin'
const UP = 'UP', DOWN = 'DOWN', LEFT1 = 'LEFT1', LEFT2 = 'LEFT2', RIGHT1 = 'RIGHT1', RIGHT2 = 'RIGHT2'
// const UP = 0, DOWN = 1, LEFT1 = 2, LEFT2 = 3, RIGHT1 = 4, RIGHT2 = 5
const map = [
  {
    type: UP,
    do: (index) => {
      return [index[0] - 2, index[1]]
    },
  }, {
    type: DOWN,
    do: (index) => {
      return [index[0] + 2, index[1]]
    },
  }, {
    type: LEFT1,
    do: (index) => {
      if (index[0] % 2) {
        return [index[0] - 1, index[1] - 1]
      } else {
        return [index[0] - 1, index[1]]
      }
    },
  }, {
    type: LEFT2,
    do: (index) => {
      if (index[0] % 2) {
        return [index[0] + 1, index[1] - 1]
      } else {
        return [index[0] + 1, index[1]]
      }
    },
  }, {
    type: RIGHT1,
    do: (index) => {
      if (index[0] % 2) {
        return [index[0] - 1, index[1]]
      } else {
        return [index[0] - 1, index[1] + 1]
      }
    },
  }, {
    type: RIGHT2,
    do: (index) => {
      if (index[0] % 2) {
        return [index[0] + 1, index[1]]
      } else {
        return [index[0] + 1, index[1] + 1]
      }
    },
  }
]

export default {
  name: 'Beehive',
  mixins: [mixin(map)],
  components: { ElRadio: Radio},
  props: {
    mapList: {
      require: true,
      type: Object
    },
    time: {
      type: Number,
      default: 100
    },
  },

  data() {
    return {
      directions: [UP, DOWN, LEFT1, LEFT2, RIGHT1, RIGHT2],
      timer1: null,
      timer2: null,
      // 入口
      input: [...this.mapList.input],
      // 出口
      output: [...this.mapList.output],
      // 地图
      map: this.mapList.map,
      // 当前下标
      index: [...this.mapList.input],
      // 路径
      path: [
        // [0, 0, [DOWN]]
      ],
      // 要移除的路径
      removeIndex: [],
    };
  },

  mounted() {
    this.nextStep(this.index)
  },
  
  methods: {
  },
};
</script>

<style lang="less" scoped>
.maze-beehive {
  // height: 900px;
  // width: 900px;
  margin: 100px;
  display: inline-flex;
  flex-flow: column nowrap;
  .line {
    height: 100px;
    display: flex;
    flex-flow: row nowrap;
    margin-right: -50px;
    margin-top: -50px;
    .cell {
      width: 100px;
      margin-left: 50px;
      // border: 1px solid rgba(0, 0, 255, 0.3);
      // outline: auto;
      &.wall {
        // background: #00000088;
        & > polygon {
          fill: #00000088;
        }
      }
      &.start::after {
        content: 'start';
        display: block;
        height: 100px;
        line-height: 100px;
        text-align: center;
        color: rgb(0, 0, 255);
      }
      &.end::after {
        content: 'end';
        display: block;
        height: 100px;
        line-height: 100px;
        text-align: center;
        color: rgb(0, 0, 255);
      }
      &.path {
        // background: rgba(0, 255, 0, 0.5);
        // transition: background .5s;
        & > polygon {
          fill: rgba(0, 255, 0, 0.5);
          transition: fill .5s;
        }
      }
      &.path2 {
        & > polygon {
          fill: rgba(255, 0, 0, 0.5);
          transition: fill .5s;
        }
      }
    }
    &:nth-child(even) {
      margin-left: -75px;
    }
  }
  .input, .radio {
    position: fixed;
    bottom: 0;
    margin: 10px 0;
    display: flex;
    width: 100%;
    justify-content: center;
  }
}
</style>