<template>
  <div class='left-nav-container'>
    <div class="left-nav-word">
      <div
        v-for="(item, index) in wordList"
        :key="index"
        :class="{ 'left-nav-word-active': index === currentWord }"
      >
        {{ item }}
      </div>
    </div>

    <div class="left-nav-car-wrapper">
      <div
          class="left-nav-car"
          v-for="(item, key) in carData"
          :key="key"
      >
        <div class="left-nav-car-prefix">
          {{ key }}
        </div>
        <div v-for="(child, index) in item" :key="key + index">
          <img :src="child.icon" alt="">
          {{ child.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue'
const wordList = []

const icon = require('../../../assets/hot-car-icon.png')
const carList = [
  {
    icon,
    name: '奥迪'
  },
  {
    icon,
    name: '奥迪'
  },
  {
    icon,
    name: '奥迪'
  },
  {
    icon,
    name: '奥迪'
  },
  {
    icon,
    name: '奥迪'
  },
  {
    icon,
    name: '奥迪'
  },
  {
    icon,
    name: '奥迪'
  },
  {
    icon,
    name: '奥迪'
  },
  {
    icon,
    name: '奥迪'
  },
  {
    icon,
    name: '奥迪'
  },
]

const carData = {}

export default {
  name: 'leftNav',
  setup() {
    const currentWord = ref(0)
    for (let i = 65; i <= 90; i++) {
      wordList.push(String.fromCharCode(i))
    }

    wordList.forEach(item => {
      carData[item] = carList
    })

    return {
      currentWord,
      wordList,
      carData,
    }
  }
};
</script>

<style lang="scss">
.left-nav{
  &-container{
    width: 270px;
    height: 780px;
    display: flex;
  }
  &-word{
    width: 30px;
    height: 100%;
    background: #EAF3FE;
    font-size: 16px;
    font-weight: 400;
    color: #0091FF;

    &>div{
      display: flex;
      justify-content: center;
      align-items: center;
      width: 30px;
      height: 30px;
    }
  }
  &-word-active{
    color: white;
    background: #0091FF;
  }

  &-car &-car-prefix{
    height: 28px;
    background: #F0F3F9;
    font-size: 14px;
    font-weight: 400;
    color: #666666;
  }
  &-car{
    &-wrapper{
      width: 100%;
      height: 100%;
      overflow: auto;
    }

    &>div{
      flex: 1;
      display: flex;
      align-items: center;
      height: 50px;
      border-bottom: 1px solid #E4E4E4;
      border-right: 1px solid #E4E4E4;
      padding-left: 10px;

      img{
        width: 36px;
        height: 36px;
        margin-right: 20px;
      }
    }

  }
}
</style>
