<template>
  <div class="car-swapper-container">
    <!-- 轮播图 -->
    <div class="car-swapper-detail">
      <!-- 图片展示 -->
      <div
        class="car-swapper-item"
        v-for="(item, index) in swapperList"
        :key="index"
        v-show="index === currentIndex"
      >
        <img :src="item" alt="">
      </div>
      <!-- 左边按钮 -->
      <div
        class="car-swapper-left-arrow"
        @mouseenter="hoverArrow('leftHover', true)"
        @mouseleave="hoverArrow('leftHover', false)"
        @click="changeIndex(currentIndex - 1)"
      >
        <img src="../../../assets/gray-bg-left-arrow.png" alt="" v-if="!leftHover">
        <img src="../../../assets/orange-bg-left-arrow.png" alt="" v-else>
      </div>
      <!-- 右边按钮 -->
      <div
        class="car-swapper-right-arrow"
        @mouseenter="hoverArrow('rightHover', true)"
        @mouseleave="hoverArrow('rightHover', false)"
        @click="changeIndex(currentIndex + 1)"
      >
        <img src="../../../assets/gray-bg-right-arrow.png" alt="" v-if="!rightHover">
        <img src="../../../assets/orange-bg-right-arrow.png" alt="" v-else>
      </div>

      <!-- 底部下标 -->
      <div class="car-swapper-index">
        <span
          v-for="(item, index) in swapperList"
          :key="item"
          :class="currentIndex === index ? 'car-swapper-index-active' : 'car-swapper-index-normal'"
          @click="changeIndex(index)"
        >
          {{ index }}
        </span>
      </div>

      <!-- 底部广告栏 -->
      <div class="car-swapper-ad-wrapper">
        北京大兴奥迪A4L优惠高达5.5万元预购从速
      </div>
    </div>

    <!-- 新闻列表 -->
    <div class="car-swapper-news">
      <div class="car-swapper-news-title">
        配置升级 试驾2021款凯迪拉克XT5/XT6
      </div>

      <div
        v-for="(item, index) in textList"
        :key="index"
        class="car-swapper-news-item"
      >
        {{ item }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import axios from 'axios'
export default {
  name: 'car-swapper',
  data () {
    return {
      swapperList: [],
      currentIndex: 0,
      leftHover: false,
      rightHover: false,
      textList: []
    }
  },
  methods: {
    changeIndex(index) {
      if (index < 0) {
        index = this.swapperList.length - 1
      }
      if (index > this.swapperList.length - 1) {
        index = 0
      }
      this.currentIndex = index
    },
    hoverArrow(key, type){
      this[key] = type;
    },
    async getSwapper() {
      const res = await axios.get('http://localhost:3000/vue3/swapper')
      this.swapperList = res.data
    },
    async getText() {
      const res = await axios.get('http://localhost:3000/vue3/text')
      this.textList = res.data
    }
  },
  mounted() {
    this.getSwapper()
    this.getText()
  }
};
</script>

<style lang="scss">
.car-swapper{
  &-container{
    width: 100%;
    height: 354px;
    display: flex;
    margin-top: 30px;
  }
  &-detail{
    width: 738px;
    height: 100%;
    position: relative;
  }
  &-item {
    width: 100%;
    height: 100%;

    img{
      width: 100%;
      height: 100%;
    }
  }
  &-left-arrow, &-right-arrow{
    width: 34px;
    height: 70px;
    position: absolute;
    top: 120px;
    cursor: pointer;

    img{
      width: 100%;
      height: 100%;
    }
  }
  &-left-arrow{
    left: 10px;
  }
  &-right-arrow{
    right: 10px;
  }
  &-ad-wrapper{
    width: 100%;
    height: 70px;
    background: #000000;
    opacity: 0.59;
    font-size: 26px;
    color: #FFFFFF;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    bottom:0;
  }
  &-index{
    width: 100%;
    display: flex;
    padding-right: 10px;
    position: absolute;
    justify-content: flex-end;
    bottom: 80px;

    span{
      display: flex;
      justify-content: center;
      align-items: center;
      margin-left: 4px;
      width: 40px;
      height: 20px;
      font-size: 16px;
      font-weight: 500;
      color: #FFFFFF;
      cursor: pointer;
    }
    &-active{
      background: #FF7819;
    }
    &-normal{
      background: #464646;
    }
  }
  &-news{
    flex: 1;
    margin-left: 40px;

    &-title{
      font-size: 20px;
      color: #333333;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    &-item{
      height: 21px;
      margin-top: 20px;
      padding-left: 14px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 16px;
      position: relative;
    }
    &-item:after{
      content: '';
      display: block;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #C3C3C3;
      position: absolute;
      top: 7px;
      left: 0;
    }
  }

}
</style>
