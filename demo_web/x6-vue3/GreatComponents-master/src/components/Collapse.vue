<template>
  <div class="great-collapse" @mouseenter="handleEnter" :class="{active: !hide}">
    <div class="head" @click="handleClick">
      <div class="point"></div>
      <div class="title">{{title}}</div>
      <div class="collapse" :class="`${hide ? 'hide' : ''}`">▽</div>
    </div>
    <div class="body">
      <slot>
        内容
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GreatCollapse',
  data() {
    return {
      hide: false,
      height: '',
    };
  },

  props: {
    title: {
      type: String,
      default: '标题'
    }
  },

  mounted() {

  },

  methods: {
    handleClick() {
      this.hide = !this.hide
      if (!this.hide) {
        this.$el.style.height = (this.hide ? 0 :
        Number(getComputedStyle(this.$el.querySelector('.body')).height.slice(0, -2))) +
        Number(getComputedStyle(this.$el.querySelector('.head')).height.slice(0, -2)) +
        'px'
        // setTimeout(() => {
        //   this.$el.style.height = 'auto'
        // }, 500)
      } else {
        this.$el.style.height = getComputedStyle(this.$el.querySelector('.head')).height
      }
    },
    handleEnter() {
      this.height =
      (this.hide ? 0 :
        Number(getComputedStyle(this.$el.querySelector('.body')).height.slice(0, -2))) +
        Number(getComputedStyle(this.$el.querySelector('.head')).height.slice(0, -2)) +
        'px'
      this.$el.style.height = this.height
    }
  },
};
</script>

<style lang="less" scoped>
.great-collapse {
  height: 58px;
  width: 100%;
  transition: height 0.5s;
  overflow: hidden;
  &.active {
    height: auto;
    & > .head > .point {
      background: #4af905;
    }
    & > .head > .collapse {
      transform: rotate(180deg);
    }
  }
  .head {
    width: 100%;
    height: 58px;
    line-height: 58px;
    background: #fff;
    box-shadow: 0px 2px 4px 0px #DEE7ED;
    border-radius: 4px;
    position: relative;
    cursor: pointer;
    .point {
      position: absolute;
      left: 17px;
      top: 25px;
      display: inline-block;
      width: 8px;
      height: 8px;
      background: #999999;
      border-radius: 50%;
    }
    .title {
      position: absolute;
      left: 36px;
      top: 0;
      display: inline-block;
      height: 58px;
      line-height: 58px;
      width: auto;
    }
    .collapse {
      position: absolute;
      right: 17px;
      display: inline-block;
    }
  }
  .body {
    width: 100%;
    height: auto;
    background: transparent;
    padding: 19px 0;
    box-sizing: border-box;
    position: relative;
  }
}
</style>