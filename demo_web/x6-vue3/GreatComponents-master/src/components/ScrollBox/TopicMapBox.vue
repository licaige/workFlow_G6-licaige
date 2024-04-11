<template>
  <div class="MapBox">
    <div class="title">
      <span>{{title}}</span>
      <span class="is-show" :class="{active: isShow}" @click="$emit('update:isShow', !isShow)"></span>
    </div>
    <div v-show="isShow" class="body">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TopicMapBox',

  props: {
    title: String,
    isShow: {
      type: Boolean,
      default: true
    },
  },

  data() {
    return {
    };
  },

  mounted() {
    
  },

  methods: {
    
  },
};
</script>

<style lang="less" scoped>
.MapBox ::v-deep {
  width: 100%;
  display: flex;
  flex-flow: column nowrap;
  background: linear-gradient(180deg, rgba(0,80,173,0) 0%, rgba(0,74,159,0.3000) 100%);
  // linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.5500) 100%)
  // linear-gradient(180deg, rgba(0,80,173,0) 0%, rgba(0,74,159,0.3000) 100%)
  box-shadow: inset 2px 0px 0px 0px #009AFF;
  border-radius: 8px;
  margin-bottom: 15px;
  &>.title {
    height: 42px;
    width: 100%;
    padding-left: 15px;
    box-sizing: border-box;
    position: relative;
    &>span {
      font-size: 18px;
      font-family: DOUYUFont;
      color: #FFFFFF;
      line-height: 42px;
      text-shadow: 0px 2px 4px rgba(255, 255, 255, 0.26);
      background: linear-gradient(180deg, #FFFFFF 0%, #FFDF8F 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    & > .is-show {
      position: absolute;
      right: 9px;
      top: 14px;
      cursor: pointer;
      display: inline-block;
      height: 12px;
      width: 17px;
      background: url('~@/assets/img/ScrollBox/形状结合.png') no-repeat center center;
    }
  }
  .body {
    font-size: 14px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #FFFFFF;
    line-height: 18px;
  }
}
</style>