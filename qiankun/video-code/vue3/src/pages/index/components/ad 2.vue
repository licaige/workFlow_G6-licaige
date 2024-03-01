<template>
  <div class="index-ad-container">
    <div class="index-ad-content">
      <img src="../../../assets/ad.png" alt="">
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'ad',
};
</script>

<style lang="scss">
.index-ad{
  &-container{
    width: 100%;
  }
  &-content{
    width: 1200px;
    margin: 30px auto 0;
    height: 90px;

    img{
      width: 100%;
      height: 100%;
    }
  }
}
</style>
