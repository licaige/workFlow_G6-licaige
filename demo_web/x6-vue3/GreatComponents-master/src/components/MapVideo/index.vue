<template>
  <div class="map-video">
    <Haikang v-if="option.isOperate === '1' && option.indexCode" ref="map-video" :index="option.indexCode" :name="option.stationName"></Haikang>
    <VideoPlayer v-if="option.isOperate === '0' && option.url" ref="map-video" :option="option"></VideoPlayer>
  </div>
</template>

<script>
import Haikang from './Haikang.vue'
import VideoPlayer from './VideoPlayer.vue'
export default {
  name: 'MapVideo',

  components: {
    Haikang,
    VideoPlayer,
  },

  props: {
    option: Object,
  },

  watch: {
    option: {
      deep: true,
      handler () {
        this.$nextTick(() => {
          if (this.$refs['map-video']) {
            this.$refs['map-video'].handleResize()
          }
        })
      }
    }
  },

  data() {
    return {
    };
  },

  mounted() {
    if (this.$refs['map-video']) {
      this.$refs['map-video'].handleResize()
    }
  },

  methods: {
  },
};
</script>

<style lang="less" scoped>
.map-video ::v-deep {
  height: 100%;
  width: 100%;
}
</style>