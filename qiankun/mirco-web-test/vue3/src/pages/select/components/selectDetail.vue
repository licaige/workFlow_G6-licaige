<template>
  <div class="select-detail-container">
    <div
      v-for="(item, index) in detailList"
      :key="index"
      class="select-detail-item"
    >
      <img :src="item.icon" alt="">
      <div class="select-detail-item-name">{{ item.name }}</div>
      <div class="select-detail-item-price">{{ item.price }}</div>
    </div>
    <pagination />
  </div>
</template>

<script lang="ts">
const icon = require('../../../assets/car-detail-img.png')
import pagination from './pagination.vue'
const carData = {
  icon,
  name: '哈弗H6',
  price: '5.34-9.56万'
}

export default {
  name: 'selectDetail',
  components: {
    pagination,
  },
  setup() {
    const detailList = []

    for (let i = 0; i < 32; i++) {
      detailList.push(carData)
    }

    return {
      detailList,
    }
  }
};
</script>

<style lang="scss">
.select-detail{
  &-container{
    flex: 1;
    margin-left: 46px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  &-item{
    width: 204px;
    height: 200px;
    font-size: 16px;
    color: #333333;
    line-height: 21px;
    display: flex;
    align-items: center;
    flex-direction: column;

    &-name{
      margin-top: -10px;
    }

    &-price{
      font-size: 14px;
      color: #F24300;
      margin-top: 10px;
    }

    img{
      width: 100%;
      height: 153px;
    }
  }
}
</style>
