<template>
  <div class="maze">
    <div class="input">
      <label>速度：</label>
      <input type="number" v-model.number="time">
    </div>
    <div class="radio">
      <ElRadio
        v-for="(item, index) in options"
        :key="item.type"
        v-model="radio"
        :label="String(index)">
        {{item.name}}
      </ElRadio>
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
    <template v-if="type != 'beehive'">
      <div v-for="(item, index) in map" :key="index" class="line">
        <div
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
        </div>
      </div>
    </template>
    <beehive :time="time" :mapList="mapList" v-else></beehive>
  </div>
</template>

<script>
import mixin from './mixin'
import { Radio } from 'element-ui'
import beehive from './beehive.vue'
import config from './config.json'
const time = 500
const UP = 0, RIGHT = 1, DOWN = 2, LEFT = 3, UP2 = 4, DOWN2 = 5
const map = [
  {
    type: UP,
    do: (index) => {
      return [index[0] - 1, index[1]]
    },
  }, {
    type: DOWN,
    do: (index) => {
      return [index[0] + 1, index[1]]
    },
  }, {
    type: LEFT,
    do: (index) => {
      return [index[0], index[1] - 1]
    },
  }, {
    type: RIGHT,
    do: (index) => {
      return [index[0], index[1] + 1]
    },
  }, {
    type: UP2,
    do: (index) => {
      return [index[0] - 1, index[1] - 1]
    },
  }, {
    type: DOWN2,
    do: (index) => {
      return [index[0] + 1, index[1] + 1]
    },
  }
]

export default {
  name: 'Maze',
  mixins: [mixin(map)],
  components: { ElRadio: Radio, beehive},
  data() {
    return {
      options: config,
      radio: '2',
      time: time,
      timer1: null,
      timer2: null,
      // 当前下标
      index: [],
      // 路径
      path: [
        // [0, 0, [DOWN]]
      ],
      // 要移除的路径
      removeIndex: [],
    };
  },
  watch: {
    mapList: {
      deep: true,
      immediate: true,
      handler() {
        this.history = []
        this.shortestPath = []
        clearTimeout(this.timer1)
        clearTimeout(this.timer2)
        this.index = [...this.mapList.input]
        this.path = []
        this.removeIndex = []
        this.nextStep(this.index)
      }
    }
  },
  computed: {
    mapList() {
      return config[this.radio]
    },
    type() {
      return this.mapList.type
    },
    // 入口
    input() {
      return [...this.mapList.input]
    },
    // 出口
    output() {
      return [...this.mapList.output]
    },
    // 地图
    map() {
      return this.mapList.map
    },
    directions() {
      return this.mapList.type == 'triangle' ? [UP, DOWN, LEFT, RIGHT, UP2, DOWN2] : [UP, DOWN, LEFT, RIGHT]
    }
  },
  
  methods: {
  },
};
</script>

<style lang="less" scoped>
.maze {
  // height: 900px;
  // width: 900px;
  display: inline-flex;
  flex-flow: column nowrap;
  .line {
    height: 100px;
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    .cell {
      width: 100px;
      // border: 1px solid rgba(0, 0, 255, 0.3);
      outline: auto;
      &.wall {
        background: #00000088;
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
        background: rgba(0, 255, 0, 0.5);
        transition: background .5s;
      }
      &.path2 {
        background: rgba(255, 0, 0, 0.5);
        transition: background .5s;
      }
    }
  }
  
  .input, .radio {
    margin: 10px 0;
    display: flex;
    justify-content: center;
  }
}
</style>