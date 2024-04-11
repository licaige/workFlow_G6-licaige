<!-- 小人走路 -->
<template>
  <div class="WalkControl">
    <div class="site"></div>
  </div>
</template>

<script>
import { initMap } from './config/index'
export default {
  name: 'WalkControl',
  components: {  },
  data () {
    return {
    }
  },
  mounted () {
    initMap(this.$el.querySelector('.site'))
  },
  methods: {
  },
  computed: {
  },
  beforeDestroy() {
    window.vm.setWords()
  }
}
</script>

<style lang="less">
.WalkControl {
  display: flex;
  justify-content: center;
  margin-top: 30px;
  width: 100%;
  height: 100%;
  .site {
    transform: rotate3d(1, 0, 0, -38deg);
  }
  .leader {
    display: flex;
    align-items: center;
    &::after {
      content: '';
      height: 3px;
      width: 3px;
      border-radius: 50%;
      background: red;
    }
    &.left {
      flex-direction: row;
    }
    &.right {
      flex-direction: row-reverse;
    }
    &.top {
      flex-direction: column;
    }
    &.bottom {
      flex-direction: column-reverse;
    }
  }
}
</style>
