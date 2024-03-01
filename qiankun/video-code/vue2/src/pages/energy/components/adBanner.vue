<template>
  <div class="ad-banner-container">
    <img :src="adImg" alt="" v-if="adImg">
    <img src="../../../assets/ad.png" alt="" v-else>
  </div>
</template>

<script lang="ts">
export default {
  name: 'adBanner',
  props: ['adImg'],
};
</script>

<style lang="scss">
.ad-banner-container{
  width: 100%;
  height: 80px;
  margin: 30px 0;
  img{
    width: 100%;
    height: 100%;
  }
}
</style>
