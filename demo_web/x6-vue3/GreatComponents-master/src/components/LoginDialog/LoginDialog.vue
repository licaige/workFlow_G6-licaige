<!-- 
  单例模式实现的弹框，调用this.$login.show()打开
 -->
<template>
  <div v-if="show" class="great-dialog-mask">
    <div class="dialog" :style="{'--width': width, '--top': top}">
      <div class="close" @click="close"></div>
      <div class="header">登录</div>
      <div class="main">
        <!-- 登录表单 -->
        单例组件
      </div>
      <div class="foot">
        <slot name="foot" :close="close"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GreatLoginDialog',

  props: {
  },

  mounted () {
  },

  data() {
    return {
      show: false,
      width: '300px',
      top: '12vh',
    };
  },

  mounted() {
    
  },

  methods: {
    open () {
      this.show = true
    },
    close () {
      this.show = false
    },
  },
};
</script>

<style lang="less" scoped>
.great-dialog-mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(45, 45, 45, 0.7);
  z-index: 1999;
  .dialog {
    --width: 861px;
    --top: 15vh;
    display: flex;
    flex-flow: column nowrap;
    width: var(--width);
    background: #FFFFFF;
    border-radius: 8px;
    border: 1px solid #007EFF;
    margin: var(--top) calc(50% - var(--width) / 2) 0 calc(50% - var(--width) / 2);
    position: relative;
    .close {
      position: absolute;
      right: -31px;
      top: 0;
      display: inline-block;
      height: 20px;
      width: 20px;
      mask: url('~@/assets/img/删除.svg') no-repeat center center;
      background-color: #fff;
      cursor: pointer;
      transition: 1s;
      &:hover {
        transform: rotate(180deg);
        background-color: #6EF5FD;
      }
    }
    .header {
      flex: 0 0 auto;
      height: 60px;
      line-height: 60px;
      background: url('~@/assets/img/编组 8.png') no-repeat center center;
      background-size: cover;
      text-align: center;
      font-size: 18px;
      font-weight: 700;
      color: #FFFFFF;
      letter-spacing: 2px;
    }
    .foot {
      flex: 0 0 auto;
      margin: 0 4px;
      border-top: 1px dashed #DCDCDC;
      padding: 14px 30px 14px 0;
      display: flex;
      flex-flow: row nowrap;
      justify-content: flex-end;
      align-items: center;
      &>* {
        margin-left: 12px;
      }
      .el-button {
        padding: 0 32px;
        color: #262626;
        &.el-button--primary {
          background: rgba(0, 126, 255, 0.1);
          color: #0C84FF;
          font-weight: 700;
        }
      }
    }
  }
}
</style>