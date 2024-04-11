<template>
  <div class="container">
    <div class="block" v-for="n in 21" :key="n">
      <template v-if="defer(n)">
        <!-- 某重组件 -->
        <!-- <heavy-comp></heavy-comp> -->
      </template>
    </div>
  </div>
</template>
<script>
// 某重组件
// import HeavyComp from './HeavyComp'
import defer from './defer'
export default {
  mixins: [defer(21)],
  // components: { HeavyComp }
}
</script>