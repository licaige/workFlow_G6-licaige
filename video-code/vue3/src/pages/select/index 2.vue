<template>
  <div class="select-container">
    <div class="select-content">
      <LeftNav />

      <selectDetail />
    </div>
  </div>
</template>

<script lang="ts">
import LeftNav from './components/leftNav.vue'
import selectDetail from './components/selectDetail.vue'
export default {
  name: 'index',
  components: {
    LeftNav,
    selectDetail,
  },
};
</script>

<style lang="scss">
.select{
  &-container{
    margin-top: 50px;
  }
  &-content{
    width: 1200px;
    margin: 0 auto;
    display: flex;
  }
}
</style>
