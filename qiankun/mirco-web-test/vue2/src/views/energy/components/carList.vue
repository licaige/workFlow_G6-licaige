<template>
  <div class="car-list-container">
    <div
      v-for="(item, index) in carList"
      class="car-list-item"
      :key="index"
    >
      <img :src="item.img" alt="">
      {{ item.name }}
    </div>
  </div>
</template>

<script lang="ts">
import axios from 'axios'
export default {
  name: 'carList',
  data () {
    return {
      carList: [],
    }
  },
  methods: {
    async getCarLst() {
      const res = await axios.get('http://localhost:3000/vue2/car/list')
      this.carList = res.data
    }
  },
  mounted() {
    this.getCarLst()
  }
};
</script>

<style lang="scss">
.car-list{
  &-container{
    width: 100%;
    height: 153px;
    padding-top: 20px;
    display: flex;
    justify-content: space-between;

  }
  &-item{
    width: 128px;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 14px;
    color: #333333;

    img{
      width: 128px;
      height: 96px;
    }
  }
}
</style>
