<template>
  <div class="energy-container">
    <div class="energy-content">
      <!-- 导航列表 -->
      <VTabs />
      <!-- 汽车展示列表 -->
      <CarList />
      <!-- 轮播图 -->
      <CarSwapper />
      <!-- 广告图 -->
      <AdBanner />
      <!-- 车型列表 -->
      <NewsList />
    </div>
  </div>
</template>

<script lang="ts">
import VTabs from '../../components/v-tabs/index.vue'
import CarList from './components/carList.vue'
import CarSwapper from './components/carSwapper.vue'
import AdBanner from './components/adBanner.vue'
import NewsList from './components/newsList.vue'
export default {
  name: 'index',
  components: {
    VTabs,
    CarList,
    CarSwapper,
    AdBanner,
    NewsList,
  },
  data () {
    return {
    }
  },
  methods: {

  },
};
</script>

<style lang="scss">
.energy{
  &-container{
    width: 100%;
  }
  &-content{
    width: 1200px;
    margin: 0 auto;
  }
}
</style>
