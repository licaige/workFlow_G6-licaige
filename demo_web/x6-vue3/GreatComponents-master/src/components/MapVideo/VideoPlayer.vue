<template>
  <div class="my-video-player">
    <video-player
      class="video-player vjs-custom-skin"
      ref="positiveVideoPlayer"
      :playsinline="true"
      :options="getOptions(option.url)"></video-player>
    <div class="header">
      <div class="title">{{option.name}}</div>
      <div class="time">{{current}}</div>
    </div>
  </div>
</template>

<script>
import { parseTime } from '@/scripts/util'
import { videoPlayer } from 'vue-video-player'
import { getCookie } from '@/apis/jjsyq'
export default {
  name: 'VideoPlayer',

  props: {
    option: Object,
  },

  watch: {
    option: {
      immediate: true,
      deep: true,
      handler () {
        if (this.option) {
          let url = this.option.url
          url = url.split('https://www.jjsyq.cn:10001/jkdz/rtp/')[1].split('/hls.m3u8')[0].replace('_', '/')
          getCookie(url).then(res => {
            console.log(res)
            if (res.status === 200) {
              this.isStart = true
            } else {
              this.$message.error('请刷新页面后重试！')
            }
          })
        }
      }
    }
  },

  data() {
    return {
      player: null,
      current: '',
      timer: null,
      isStart: false,
      /**
       *播放器配置
      */
      positivePlayerOptions: {
        // playbackRates: [0.5, 1.0, 1.5, 2.0], //播放速度
        autoplay: true, //如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: 'zh-CN',
        aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如'16:9'或'4:3'）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [{
          type: 'application/x-mpegURL',
          src: '' //视频url地址
        }],
        poster: '', //你的封面地址
        // width: document.documentElement.clientWidth,
        notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: false,
          durationDisplay: false,
          remainingTimeDisplay: false,
          fullscreenToggle: true  //全屏按钮
        },
        common: 'positivePlayer',
      },
    };
  },
  components: {
    videoPlayer,
  },
  mounted() {
    // 设置播放容器的宽高并监听窗口大小变化
    window.addEventListener('resize', this.handleResize)
    this.$once('hook:beforeDestory', () => {
      window.removeEventListener("resize",this.handleResize)
      clearInterval(this.timer)
    })
    this.current = parseTime(new Date(), '{y}-{m}-{d} {h}:{i}:{s}')
    this.timer = setInterval(() => {
      this.current = parseTime(new Date(), '{y}-{m}-{d} {h}:{i}:{s}')
    }, 1000)
  },

  beforeDestroy () {
    this.stopPlay()
    clearInterval(this.timer)
  },

  methods: {
    getOptions (src) {
      // let positivePlayerOptions = JSON.parse(JSON.stringify(this.positivePlayerOptions))
      this.positivePlayerOptions.sources[0].src = src
      return this.positivePlayerOptions
    },
    handleResize () {
      let positiveVideoPlayer = this.$refs.positiveVideoPlayer
      if (positiveVideoPlayer) {
        let paddingTop = (100 * positiveVideoPlayer.$parent.$el.offsetHeight / positiveVideoPlayer.$parent.$el.offsetWidth) + '%'
        setTimeout(() => {
          positiveVideoPlayer.$el.children[0].style.paddingTop = paddingTop
        }, 0)
      }
    },
    stopPlay() {
      this.isStart = false
    },
    startPlay() {
    },
  },
};
</script>

<style lang="less" scoped>
.my-video-player ::v-deep {
  height: 100%;
  width: 100%;
  cursor: pointer;
  position: relative;
  .video-player {
    height: 100%;
    width: 100%;
  }
  .header {
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    padding: 7px 12px;
    box-sizing: border-box;
    height: 34px;
    background: rgba(0, 0, 0, 0.5);
    .title {
      position: absolute;
      left: 12px;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #FFFFFF;
      line-height: 20px;
      letter-spacing: 1px;
    }
    .time {
      position: absolute;
      right: 12px;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #FFFFFF;
      line-height: 20px;
      letter-spacing: 1px;
    }
  }
}
</style>