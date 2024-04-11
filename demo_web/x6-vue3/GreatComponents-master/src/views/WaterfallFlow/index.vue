
import Vue from 'vue/types/umd';
<template>
  <div class="WaterfallFlow">
    <div v-for="item in 100" :key="item" class="item">
      <img src="./default.jpg" alt="" :data-src="`https://picsum.photos/400/600?r=${item}`" >
    </div>
  </div>
</template>
<script>

export default {
  mounted() {
    const ob = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          const img = entry.target
          img.src = img.dataset.src
          ob.unobserve(img)
        }
      }
    }, {
      threshold: 0, // 0: 刚刚交叉 1：完全交叉
    })
    const imgs = document.querySelectorAll('img[data-src]')
    imgs.forEach(item => {
      ob.observe(item)
    })
  }
}
</script>

<style lang="less">
.WaterfallFlow {
  height: 100%;
  display: flex;
  flex-flow: row wrap;
  overflow: auto;
  gap: 20px;
  & > .item {
    width: 400px;
    height: 600px;
  }
}
</style>