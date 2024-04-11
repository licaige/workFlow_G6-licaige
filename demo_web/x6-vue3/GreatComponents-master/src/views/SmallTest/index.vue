<template>
  <div class="SmallTest">
    <GreatUpload></GreatUpload>
    <OlympicRings></OlympicRings>
    <span>{{ val.toFixed(2) }}</span>
    <button @click="sale">打折</button>
  </div>
</template>

<script>
import animation from '@/scripts/animation.js'
import GreatUpload from '@/components/Upload/index.vue'
import OlympicRings from '@/components/Canvas/OlympicRings.vue'
export default {
  name: 'SmallTest',

  components: {
    GreatUpload,
    OlympicRings
  },

  data() {
    return {
      val: 0,
    };
  },

  mounted() {
    this.sale()
  },

  methods: {
    sale() {
      animation(500, 30, 1999, (val) => {
        this.val = val
      })
    },
  },
};
</script>

<style lang="less" scoped>
.SmallTest ::v-deep {
  height: calc(100% - 93px);
}
</style>