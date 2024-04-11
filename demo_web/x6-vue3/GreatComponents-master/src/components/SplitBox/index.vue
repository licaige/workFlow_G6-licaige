<!--
  裂变组件：
    属性： 【 ind 】
    事件： 【 todo, finish 】
    插槽： 【 无 】
-->
<template>
  <div class="great-split-box" :class="{root: isRoot}" @click.stop="$emit('todo')" :style="i ? 'background: transparent!important':''">
    <template v-if="isRoot">
      <SplitBox :ind="index" @todo="index++" @finish="index = 1" style="height: 100%;"></SplitBox>
    </template>
    <template v-else-if="i">
      <!-- <SplitBox v-for="item in 4" :key="item" :ind="ind" @todo="$emit('todo')" @finish="$emit('finish');i = false"></SplitBox> -->
      <SplitBox :ind="ind" @todo="$emit('todo')" @finish="$emit('finish');i = false" class="gray"></SplitBox>
      <SplitBox :ind="ind" @todo="$emit('todo')" @finish="$emit('finish');i = false"></SplitBox>
      <SplitBox :ind="ind" @todo="$emit('todo')" @finish="$emit('finish');i = false"></SplitBox>
      <SplitBox :ind="ind" @todo="$emit('todo')" @finish="$emit('finish');i = false" class="gray"></SplitBox>
    </template>
  </div>
</template>

<script>
import SplitBox from './index'
// import SplitBox from '@/components/SplitBox/index'
export default {
  name: 'SplitBox',
  components: { SplitBox },
  props: {
    ind: Number
  },

  data () {
    return {
      isRoot: false,
      index: 1,
      i: false,
    }
  },
  watch: {
    ind (a, b) {
      if ( a > b && a < 9) {
        this.i = true
      } else {
        this.$emit('finish')
      }
    },
  },
  mounted () {
    if (!this.ind) {
      this.isRoot = true
    }
  },
  methods: {
  },
};
</script>
<style scoped>
.great-split-box {
  display: flex;
  flex-wrap: wrap;
  flex: 1 1 auto;
  height: 50%;
  width: 50%;
  /* border: 1px solid black;
  border-width: 1px 1px 0 1px; */
  /* margin: -1px; */
  cursor: pointer;
  box-sizing: border-box;
}
.root {
  height: 200px;
  width: 200px;
  margin: 20px auto;
}
.gray {
  background: rgba(12, 12, 12, .3);
}
</style>