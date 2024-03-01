<template>
  <div class="nav-title-container">
    <div
      v-for="(item, index) in navTitleList"
      :key="index"
      class="nav-title-item"
    >
      <div class="nav-title-prefix">
        {{ item.prefix }}
      </div>
      <div class="nav-title-enum-wrapper">
        <div
            v-for="(child, cIndex) in item.children"
            :key="cIndex"
            class="nav-title-enum"
        >
          <div>{{ child.text }}</div>
          <div>
            <span>配置</span> |
            <span>图库</span> |
            <span>优惠</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { navTitleList } from '../../../store'

export default {
  name: 'navTitle',
  setup() {
    return {
      navTitleList,
    }
  },
};
</script>

<style lang="scss">
.nav-title{
  &-container{

  }
  &-item{
    width: 100%;
    height: 76px;
    border-bottom: 1px solid #E4E4E4;
    display: flex;
    align-items: center;
  }
  &-prefix{
    width: 72px;
    height: 100%;
    font-size: 18px;
    color: #333333;
    line-height: 24px;
    display: flex;
    align-items: center;
  }
  &-enum{
    width: 92px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-size: 14px;
    color: #333333;
    cursor: pointer;

    &-wrapper{
      flex: 1;
      display: flex;
      justify-content: space-between;
    }

    &>div{
      width: 100%;
      display: flex;
      justify-content: center;
    }

    div:nth-child(1){
      margin-bottom: 2px;
    }
    div:nth-child(2){
      font-size: 12px;
      color: #999999;

      span{
        padding: 0 2px;
      }
    }
  }

  &-enum:hover{
    color: #0091FF;
    div:nth-child(2){
      color: #0091FF;
    }
  }
}
</style>
