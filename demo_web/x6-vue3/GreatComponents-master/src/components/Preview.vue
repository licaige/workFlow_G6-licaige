<template>
  <div>
    <span @click="previewPdf" style="cursor: pointer;">
      {{title}}
    </span>
    <template v-if="showImg">
      <span @click="showImg = false" style="cursor: pointer;">
        关闭
      </span>

      <img v-for="url in images" :key="url" :src="url">
    </template>
    <!-- <el-image-viewer
      v-if="showImg"
      :on-close="()=>showImg = false"
      :url-list="images"
    /> -->
    <!-- <el-dialog
          :visible="showDoc == true || showPdf == true  || showVideo == true"
          :show-close="true"
          :width="'80%'"
          class="dialog-div-pre-style"
          :before-close="closePreviewClick"
          center>
    </el-dialog> -->
    <Dialog
      :title="title"
      :isShow.sync="isShow"
      :outClose="closePreviewClick">
      <!-- 详情 -->
      <div style="padding: 18px 32px;">
        <!-- doc、xls -->
        <div v-if="showDoc == true" class="dialog-body-content-base-style" style="justify-content: center; align-items: center; height: 500px;">
          <iframe frameborder="0"
                  :src="'https://view.officeapps.live.com/op/view.aspx?src=' + this.docUrl"
                  width='100%'
                  height="100%">
          </iframe>
        </div>
        <!-- pdf -->
        <div v-else-if="showPdf == true" class="dialog-body-content-base-style" style="justify-content: center; align-items: center; height: 500px;">
          <embed :src="pdfUrl" style="width: 100%; height: 100%"/>
        </div>
        <!-- 视频 -->
        <div v-else-if="showVideo == true"
          class="dialog-body-content-base-style"
          style="justify-content: center; align-items: center">
          <video-player class="video-player vjs-custom-skin"
                        ref="positiveVideoPlayer"
                        :playsinline="true"
                        :options="positivePlayerOptions"></video-player>
        </div>
      </div>
      <template slot="foot" slot-scope="{close}">
        <button @click="close" style="padding: 0 32px;">取消</button>
        <button type="primary" style="padding: 0 32px;" @click="closePreviewClick">确定</button>
      </template>
    </Dialog>
  </div>
</template>

<script>
// import ElImageViewer from 'element-ui/packages/image/src/image-viewer'
import { videoPlayer } from 'vue-video-player'
export default {
  name: 'Preview',
  components: {
    // ElImageViewer,
    videoPlayer
  },
  props: {
    // img、doc、video、pdf
    type: String,
    title: {
      type: String,
      default: '预览'
    }
  },
  data() {
    return {
      showImg: false,
      showDoc: false,
      showPdf: false,
      showVideo: false,
      docUrl: '',
      images: ['https://www.baidu.com/img/flexible/logo/pc/result.png'],
      currentPage: 0, // pdf文件页码
      pageCount: 0, // pdf文件总页数
      pdfUrl: '',
      scale: 1.0,
      /**
       *播放器配置
      */
      positivePlayerOptions: {
        playbackRates: [0.5, 1.0, 1.5, 2.0], //播放速度
        autoplay: false, //如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: 'zh-CN',
        aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如'16:9'或'4:3'）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [{
          type: '',
          src: '' //视频url地址
        }],
        poster: '', //你的封面地址
        // width: document.documentElement.clientWidth,
        notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          fullscreenToggle: true  //全屏按钮
        },
        common: 'positivePlayer',
      },
      infoBtns: [{
        title: '取消',
        class: 'info',
        click: () =>{}
      },
      {
        title: '确认',
        class: 'prim',
        click: () =>{}
      }],
    };
  },
  computed: {
    isShow () {
      return this.showDoc == true || this.showPdf == true  || this.showVideo == true
    },
  },
  watch: {
    isShow () {
      if (!this.isShow) {
        this.showDoc == false
        this.showPdf == false 
        this.showVideo == false
      }
    },
  },

  mounted() {
    
  },

  methods: {
    /**
     * pdf预览
     */
    previewPdf() {
      this.infoBtns[0].click = () => {
        this.closePreviewClick()
      }
      this.infoBtns[1].click = () => {
        this.closePreviewClick()
      }
      // let fileName = '123(20211012164512).pdf'
      // let type = this.iconByType(fileName);
      let type, url
      const getType = {
        img: () => {
          type = 'png'
          url = 'https://www.baidu.com/img/flexible/logo/pc/result.png'
        },
        doc: () => {
          type = 'doc'
          url = 'http://www.cc.ecnu.edu.cn/_upload/article/files/a0/7a/defe69344cddb20659c26a5e15be/faabdc3a-966d-4c86-bf57-678aa0b2cea4.doc'
        },
        xls: () => {
          type = 'xls'
          url = 'http://www.cc.ecnu.edu.cn/_upload/article/files/a0/7a/defe69344cddb20659c26a5e15be/e7fe2651-b281-429a-9830-43980115ab87.xls'
        },
        video: () => {
          type = 'mp4'
          url = "//nos.netease.com/vod163/demo.mp4"
        },
        pdf: () => {     
          type = 'pdf'
          url = 'http://www.stats.gov.cn/xxgk/zcfggz/tjxzfg2020/201708/P020200612543783221164.PDF'
        },
      }
      getType[this.type]()
      console.log(this.type, type)
      
      // type = 'mp4'
      if (["doc","docx", "xls", "xslx"].indexOf(type) != -1) {
        this.docUrl = url
        this.showDoc = true
      } else if ("pdf".indexOf(type) != -1) {
        this.pdfUrl = url
        this.showPdf = true
      } else if (["jpg", "png", "jpeg"].indexOf(type) != -1) {
        this.images = [url]
        this.showImg = true
      } else if (["avi", "mp4", "webm", "m4v", "rmvb", "mpg", "3gp", "swf", "mkv"].indexOf(type) != -1) {
        this.positivePlayerOptions.sources[0].src = url
        this.positivePlayerOptions.sources[0].type = "video/" + type
        this.showVideo = true
      } else {
        alert("当前文件暂不支持预览")
        // this.$message("当前文件暂不支持预览")
      }
    },
    /**
     * 通过文件后缀返回文件的图标
     */
    iconByType(fileName) {
      return fileName.substring(fileName.lastIndexOf(".") + 1, fileName.length)
    },
    closePreviewClick() {
      this.showImg = false
      this.showDoc = false
      this.showPdf = false
      this.showVideo = false
    },
  },
};
</script>

<style lang="less" scoped>

</style>