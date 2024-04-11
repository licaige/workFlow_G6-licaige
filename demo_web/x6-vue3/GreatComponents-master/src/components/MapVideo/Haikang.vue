<template>
  <div class="haikang-video">
    <div class="haikang" @mouseenter="enter = true" @mouseleave="enter = false">
      <div class="player" :id="`player${name}`"></div>
      <div v-show="enter || $parent.$parent.name === name" class="tool" :class="{disabled: !isStart}">
        <div class="tool-icon tool1" title="全屏" @click.stop="wholeFullScreen"></div>
        <div v-if="!startRecord" title="开始录屏" class="tool-icon tool2" @click.stop="recordStart('MP4')"></div>
        <div v-if="startRecord" title="停止录屏" class="tool-icon tool2 active" @click.stop="recordStop"></div>
        <div class="tool-icon tool3" title="截图" @click.stop="capture('JPEG')"></div>
        <div v-if="isStart" class="tool-icon tool4" title="停止播放" @click.stop="stopPlay"></div>
        <div v-if="!isStart" class="tool-icon x-tool4" title="开始播放" @click.stop="startPlay"></div>
      </div>
    </div>
    <div class="my-drawer">
      <div class="control">
        <div class="control-item">
          <div class="control-item-title">云台控制</div>
          <div class="control-item-body mini">
            <el-row>
              <el-col :span="8"><div class="circle control-btn top-left" @mousedown="controller(command['LEFT_UP'], 0, $event.target)" @mouseup="controller(command['LEFT_UP'], 1)"></div></el-col>
              <el-col :span="8"><div class="circle control-btn top" @mousedown="controller(command['UP'], 0, $event.target)" @mouseup="controller(command['UP'], 1)"></div></el-col>
              <el-col :span="8"><div class="circle control-btn top-right" @mousedown="controller(command['RIGHT_UP'], 0, $event.target)" @mouseup="controller(command['RIGHT_UP'], 1)"></div></el-col>
            </el-row>
            <el-row>
              <el-col :span="8"><div class="circle control-btn left" @mousedown="controller(command['LEFT'], 0, $event.target)" @mouseup="controller(command['LEFT'], 1)"></div></el-col>
              <el-col :offset="8" :span="8"><div class="circle control-btn right" @mousedown="controller(command['RIGHT'], 0, $event.target)" @mouseup="controller(command['RIGHT'], 1)"></div></el-col>
            </el-row>
            <el-row>
              <el-col :span="8"><div class="circle control-btn bottom-left" @mousedown="controller(command['LEFT_DOWN'], 0, $event.target)" @mouseup="controller(command['LEFT_DOWN'], 1)"></div></el-col>
              <el-col :span="8"><div class="circle control-btn bottom" @mousedown="controller(command['DOWN'], 0, $event.target)" @mouseup="controller(command['DOWN'], 1)"></div></el-col>
              <el-col :span="8"><div class="circle control-btn bottom-right" @mousedown="controller(command['RIGHT_DOWN'], 0, $event.target)" @mouseup="controller(command['RIGHT_DOWN'], 1)"></div></el-col>
            </el-row>
            <el-row>
              <el-col :span="8">步长</el-col>
              <el-col :span="8">
                <el-input-number
                  v-model="step"
                  :step="1"
                  :min="1"
                  :max="99"
                  size="mini"
                  placeholder="1~99"
                  class="just-input"></el-input-number></el-col>
              <el-col :span="8"></el-col>
            </el-row>
            <el-row>
              <el-col :span="8">预置点</el-col>
              <el-col :span="8">
                <el-input-number
                  v-model="preset"
                  :step="1"
                  :min="1"
                  :max="300"
                  size="mini"
                  placeholder="1~300"
                  class="just-input"></el-input-number></el-col>
              <el-col :span="8">
                <div class="circle el-icon-thumb" @click="controller(command['GOTO_PRESET'], 0)" title="转到预置点">
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8"><div class="circle" @mousedown="controller(command['NARROW'], 0, $event.target)" @mouseup="controller(command['NARROW'], 1)">-</div></el-col>
              <el-col :span="8">变倍</el-col>
              <el-col :span="8"><div class="circle" @mousedown="controller(command['ENLARGE'], 0, $event.target)" @mouseup="controller(command['ENLARGE'], 1)">+</div></el-col>
            </el-row>
            <el-row>
              <el-col :span="8"><div class="circle" @mousedown="controller(command['MOVE_BACK'], 0, $event.target)" @mouseup="controller(command['MOVE_BACK'], 1)">-</div></el-col>
              <el-col :span="8">变焦</el-col>
              <el-col :span="8"><div class="circle" @mousedown="controller(command['MOVE_ON'], 0, $event.target)" @mouseup="controller(command['MOVE_ON'], 1)">+</div></el-col>
            </el-row>
            <el-row>
              <el-col :span="8"><div class="circle" @mousedown="controller(command['LIGHT_DOWN'], 0, $event.target)" @mouseup="controller(command['LIGHT_DOWN'], 1)">-</div></el-col>
              <el-col :span="8">光圈</el-col>
              <el-col :span="8"><div class="circle" @mousedown="controller(command['LIGHT_UP'], 0, $event.target)" @mouseup="controller(command['LIGHT_UP'], 1)">+</div></el-col>
            </el-row>
          </div>
        </div>
        <div class="control-item">
          <div class="control-item-title">视频回放</div>
          <div class="control-item-body">
            <div style="display: inline-flex;">
              <div class="range-label">
                开始时间
                <br>
                结束时间
              </div>
              <el-date-picker
                type="datetimerange"
                v-model="timerange"
                clearable
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
                style="width: calc(100% - 72px);"
                class="control-daterange">
              </el-date-picker>
            </div>
            <el-button v-if="!start" class="control-buttom" style="margin-top: 16px;" @click="playbackStart('ws://10.20.112.41:559/openUrl/Kcp28k8')">开始回放</el-button>
            <el-button v-if="start && !stop" class="control-buttom" style="margin-top: 16px;" @click="playbackPause">暂停</el-button>
            <el-button v-if="start && stop" class="control-buttom" style="margin-top: 16px;" @click="playbackResume">开始</el-button>
            <el-button v-if="start" class="control-buttom" style="margin-top: 16px;" @click="stopPlayBack">停止</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { parseTime } from '@/scripts/util'
import { previewURLs, playbackURLs, controlling, getCameras, getCommand } from '@/apis/haikang'
export default {
  name: 'MapVideo',

  props: {
    index: String,
    name: String,
  },

  data() {
    return {
      enter: false,
      player: null,
      startRecord: false,
      isStart: false,

      // 操作云台
      timerange: [],
      playbackRate: '',
      start: false,
      stop: false,
      command: {
        UP: 5,
        LEFT_UP: 9,
        RIGHT_UP: 11,
        RIGHT: 4,
        LEFT: 3,
        DOWN: 6,
        LEFT_DOWN: 10,
        RIGHT_DOWN: 12,
        NARROW: 8,
        ENLARGE: 7,
        MOVE_ON: 13,
        MOVE_BACK: 14,
        LIGHT_UP: 15,
        LIGHT_DOWN: 16,
        GOTO_PRESET: 22,
      },
      preset: null,
      step: 50,
    };
  },

  watch: {
  },

  mounted() {
    // this.$el.style.setProperty('display', 'block')
    this.createPlayer()
    this.getCommand()
  },

  beforeDestroy () {
    if (this.isStart) {
      this.stopPlay()
    }
  },

  methods: {
    async getCommand () {
      let { command } = this
      let {data} = await getCommand()
      if (data.code === 200) {
        let len = data.data.length
        let i = 0
        for (; i < len; i++) {
          if (data.data[i].actionName === '上转') {
            command['UP'] = data.data[i].id
          } else if (data.data[i].actionName === '下转') {
            command['DOWN'] = data.data[i].id
          } else if (data.data[i].actionName === '左转') {
            command['LEFT'] = data.data[i].id
          } else if (data.data[i].actionName === '右转') {
            command['RIGHT'] = data.data[i].id
          } else if (data.data[i].actionName === '左上') {
            command['LEFT_UP'] = data.data[i].id
          } else if (data.data[i].actionName === '左下') {
            command['LEFT_DOWN'] = data.data[i].id
          } else if (data.data[i].actionName === '右上') {
            command['RIGHT_UP'] = data.data[i].id
          } else if (data.data[i].actionName === '右下') {
            command['RIGHT_DOWN'] = data.data[i].id
          } else if (data.data[i].actionName === '焦距变大') {
            command['ENLARGE'] = data.data[i].id
          } else if (data.data[i].actionName === '焦距变小') {
            command['NARROW'] = data.data[i].id
          } else if (data.data[i].actionName === '焦点前移') {
            command['MOVE_ON'] = data.data[i].id
          } else if (data.data[i].actionName === '焦点后移') {
            command['MOVE_BACK'] = data.data[i].id
          } else if (data.data[i].actionName === '光圈扩大') {
            command['LIGHT_UP'] = data.data[i].id
          } else if (data.data[i].actionName === '光圈缩小') {
            command['LIGHT_DOWN'] = data.data[i].id
          } else if (data.data[i].actionName === '预置点') {
            command['GOTO_PRESET'] = data.data[i].id
          }
        }
      }
    },
    async controller (command, action) {
      let param = {
        cameraIndexCode: this.index,
        action: isNaN(action) ? 1 : action,
        command: command,
        speed: !Number.isNaN(this.step) ? this.step : 50,
        presetIndex: command === 22 ? this.preset : 0
      }
      let { data } = await controlling(param)
      if (data.code === '200') {

      } else {
        this.$message.error(data.message)
      }
    },
    previewURLs () {
      return new Promise((resolve, reject) => {
        let cameraIndexCode = this.index
        let param = {
          cameraIndexCode: cameraIndexCode,
          expand: 0,
          protocol: 'ws',
          // protocol: 'hls',
          streamType: 0,
          transmode: 1
        }
        previewURLs(param).then(({data}) => {
          console.log(data)
          if (data.msg === 'success') {
            resolve(data.data.url)
          } else {
            reject(data.msg)
          }
        })
      })
    },
    playbackURLs (startTime, endTime) {
      return new Promise((resolve, reject) => {
        if (!this.index) reject()
        let cameraIndexCode = this.index
        let param = {
          beginTime: startTime,
          endTime:endTime,
          cameraIndexCode: cameraIndexCode,
          expand: '',
          protocol: 'ws',
          // protocol: 'hls',
          recordLocation: '',
          transmode: 1,
          uuid: '',
        }
        playbackURLs(param).then(({data}) => {
          if (data.msg === 'success') {
            resolve(data.data.url)
          } else {
            reject(data.msg)
          }
        })
      })
    },
    handleResize () {
      this.player.JS_Resize()
    },
    createPlayer() {
      this.player = new window.JSPlugin({
        szId: `player${this.name}`,
        szBasePath: "/sw_videoMap/",
        iMaxSplit: 1,
        iCurrentSplit: 1,
        openDebug: true,
        oStyle: {
          borderSelect: 'transparent',
          // borderSelect: '#FFCC00',
          // background: '#ccc',
        }
      })
      console.log(this.player)
      // 事件回调绑定
      this.player.JS_SetWindowControlCallback({
        windowEventSelect: function (iWndIndex) {  //插件选中窗口回调
          console.log('windowSelect callback: ', iWndIndex);
        },
        pluginErrorHandler: function (iWndIndex, iErrorCode, oError) {  //插件错误回调
          console.log('pluginError callback: ', iWndIndex, iErrorCode, oError);
        },
        windowEventOver: function (iWndIndex) {  //鼠标移过回调
          //console.log(iWndIndex);
        },
        windowEventOut: function (iWndIndex) {  //鼠标移出回调
          //console.log(iWndIndex);
        },
        windowEventUp: function (iWndIndex) {  //鼠标mouseup事件回调
          //console.log(iWndIndex);
        },
        windowFullCcreenChange: function (bFull) {  //全屏切换回调
          console.log('fullScreen callback: ', bFull);
        },
        firstFrameDisplay: function (iWndIndex, iWidth, iHeight) {  //首帧显示回调
          console.log('firstFrame loaded callback: ', iWndIndex, iWidth, iHeight);
        },
        performanceLack: function () {  //性能不足回调
          console.log('performanceLack callback: ');
        }
      });
      this.startPlay()
    },
    stopPlay() {
      this.player.JS_Stop().then(
        () => { this.isStart = false; console.log('stop realplay success') },
        e => { console.error(e) }
      )
    },
    startPlay() {
      this.previewURLs().then(playURL => {
        let index = this.player.currentWindowIndex
        this.player.JS_Play(playURL, { playURL, mode: 1 }, index).then(
          () => {
            this.isStart = true
            console.log('realplay success')
          },
          e => { console.error(e) }
        )
      }).catch(e => {
        this.$message.error(e)
      })
    },
    wholeFullScreen() {
      if (!this.isStart) return
      this.player.JS_FullScreenSingle(0).then(
        () => { console.log(`wholeFullScreen success`) },
        e => { console.error(e) }
      )
      // this.player.JS_FullScreenDisplay(true).then(
      //   () => { console.log(`wholeFullScreen success`) },
      //   e => { console.error(e) }
      // )
    },
    recordStart(type) {
      if (!this.isStart) return
      const codeMap = { MP4: 5, PS: 2 }
      let player = this.player,
        index = player.currentWindowIndex,
        fileName = `${parseTime(new Date(), '{y}-{m}-{d} {h}:{i}:{s}')}.mp4`
        // fileName = `${moment().format('YYYYMMDDHHmm')}.mp4`
      let typeCode = codeMap[type]
      this.startRecord = true
      player.JS_StartSaveEx(index, fileName, typeCode).then(
        () => {
          console.log('record start ...')
        },
        e => { console.error(e) }
      )
    },
    recordStop() {
      let player = this.player 
      let index = player.currentWindowIndex

      this.startRecord = false
      player.JS_StopSave(index).then(
        () => { console.log('record stoped, saving ...') },
        e => { console.error(e) }
      )
    },
    capture(imageType) {
      if (!this.isStart) return
      let player = this.player,
        index = player.currentWindowIndex

      player.JS_CapturePicture(index, 'img', imageType).then(
        () => { console.log('capture success', imageType) },
        e => { console.error(e) }
      )
    },
    /* 回放 */
    playbackStart(playURL) {
      let date = new Date()
      let startTime = parseTime(new Date(date.getTime() - 1000 * 30), '{y}-{m}-{d}T{h}:{i}:{s}')
      let endTime = parseTime(date, '{y}-{m}-{d}T{h}:{i}:{s}')
      this.playbackURLs(startTime, endTime).then(playURL => {
        this.start = true
        let { player, timerange } = this,
          index = player.currentWindowIndex
          // [ startTime, endTime ] = timerange
  
          startTime += 'Z'
          endTime += 'Z'
  
        player.JS_Play(playURL, { playURL, mode: 1 }, index, startTime, endTime).then(
          () => {
            console.log('playbackStart success')
            this.playbackRate = 1
          },
          e => { console.error(e) }
        )
      }).catch(e => {
        this.$message.error(e)
      })

    },
    playbackPause() {
      this.stop = true
      this.player.JS_Pause().then(
        () => {
          console.log('playbackPause success')
        },
        e => { console.error(e) }
      )
    },
    playbackResume() {
      this.stop = false
      this.player.JS_Resume().then(
        () => {
          console.log('playbackResume success')
        },
        e => { console.error(e) }
      )
    },
    stopPlayBack() {
      this.start = false
      this.player.JS_Stop().then(
        () => {
          this.playbackRate = 0; console.log('stop realplay success')
        },
        e => { console.error(e) }
      )
    },
  },
};
</script>

<style lang="less" scoped>
.haikang-video ::v-deep {
  height: 100%;
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
  .haikang {
    height: 100%;
    // width: 80%;
    min-height: 100px;
    min-width: 100px;
    flex: 1;
    position: relative;
    cursor: pointer;
    .player {
      height: 100%;
    }
    .tool {
      position: absolute;
      bottom: 0px;
      right: 0;
      left: 0;
      padding: 10px;
      text-align: end;
      // box-sizing: border-box;
      // background: rgba(0,0,0,.3);
      // z-index: 1;
      .tool-icon {
        display: inline-block;
        height: 40px;
        width: 40px;
        margin-left: 20px;
        cursor: pointer;
        &.tool1 {
          background: url('~@/assets/img/sssp/tool1.png') no-repeat center center;
          &:hover {
            background: url('~@/assets/img/sssp/tool1-hover.png') no-repeat center center;
          }
        }
        &.tool2 {
          background: url('~@/assets/img/sssp/tool2.png') no-repeat center center;
          &.active {
            background: url('~@/assets/img/sssp/tool2-active.png') no-repeat center center;
          }
          &:hover {
            background: url('~@/assets/img/sssp/tool2-hover.png') no-repeat center center;
          }
        }
        &.tool3 {
          background: url('~@/assets/img/sssp/tool3.png') no-repeat center center;
          &:hover {
            background: url('~@/assets/img/sssp/tool3-hover.png') no-repeat center center;
          }
        }
        &.tool4 {
          background: url('~@/assets/img/sssp/tool4.png') no-repeat center center;
          &:hover {
            background: url('~@/assets/img/sssp/tool4-hover.png') no-repeat center center;
          }
        }
        &.x-tool4 {
          background: url('~@/assets/img/sssp/x-tool4.png') no-repeat center center;
          &:hover {
            background: url('~@/assets/img/sssp/x-tool4-hover.png') no-repeat center center;
          }
        }
      }
      &.disabled {
        .tool1, .tool2, .tool3 {
          cursor: not-allowed;
        }
        .tool1 {
          &:hover {
            background: url('~@/assets/img/sssp/tool1.png') no-repeat center center;
          }
        }
        .tool2 {
          &:hover {
            background: url('~@/assets/img/sssp/tool2.png') no-repeat center center;
          }
        }
        .tool3 {
          &:hover {
            background: url('~@/assets/img/sssp/tool3.png') no-repeat center center;
          }
        }
      }
    }
  }
  .my-drawer {
    flex: 1;
    width:220px;
    min-width:220px;
    max-width:220px;
    background: #fff;
    overflow-y: auto;
    .el-drawer__header {
      margin-bottom: 5px;
    }
    .address {
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #7A7F89;
      line-height: 20px;
      letter-spacing: 1px;
      margin-left: 17px;
    }
    .control {
      display: flex;
      flex-flow: column nowrap;
      padding: 6px;
      .control-item {
        flex: 1;
        margin-bottom: 6px;
        border-top: 1px solid #E4E4EF;
        .control-item-title {
          display: inline-block;
          width: 100%;
          height: 30px;
          padding-top: 8px;
          box-sizing: border-box;
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #0B0E17;
          line-height: 18px;
          letter-spacing: 2px;
          padding-left: 15px;
          position: relative;
          &::before {
            content: '';
            position: absolute;
            left: 0px;
            top: 14px;
            display: inline-block;
            width: 8px;
            height: 8px;
            background: #999999;
            border-radius: 50%;
          }
        }
        .control-item-body {
          display: inline-block;
          width: 100%;
          padding: 0px 0 12px 0;
          font-size: 12px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #444C5D;
          letter-spacing: 1px;
          .control-btn {
            display: inline-block;
            width: 15px;
            height: 15px;
            cursor: pointer;
            &.top {
              width: 18px;
              height: 12px;
              background: url('~@/assets/img/sssp/top.png') no-repeat center center;
            }
            &.top-left {
              background: url('~@/assets/img/sssp/top-left.png') no-repeat center center;
            }
            &.top-right {
              background: url('~@/assets/img/sssp/top-right.png') no-repeat center center;
            }
            &.left {
              width: 11px;
              height: 18px;
              background: url('~@/assets/img/sssp/left.png') no-repeat center center;
            }
            &.right {
              width: 11px;
              height: 18px;
              background: url('~@/assets/img/sssp/right.png') no-repeat center center;
            }
            &.bottom {
              width: 18px;
              height: 12px;
              background: url('~@/assets/img/sssp/bottom.png') no-repeat center center;
            }
            &.bottom-left {
              background: url('~@/assets/img/sssp/bottom-left.png') no-repeat center center;
            }
            &.bottom-right {
              background: url('~@/assets/img/sssp/bottom-right.png') no-repeat center center;
            }
          }
          .control-buttom {
            width: 81px;
            height: 30px;
            line-height: 30px;
            padding: 0;
          }
          &.mini {
            .el-row {
              margin-top: 9px;
              margin-bottom: 10px;
              .el-col {
                text-align: center;
                line-height: 30px;
                .just-input {
                  width: 70px;
                  .el-input-number__decrease {
                    display: none;
                  }
                  .el-input-number__increase {
                    display: none;
                  }
                  &>.el-input {
                    .el-input__inner {
                      padding-left: 10px;
                      padding-right: 10px;
                    }
                  }
                }
                .circle {
                  display: inline-block;
                  height: 30px;
                  width: 30px;
                  border: 1px solid #ccc;
                  border-radius: 50%!important;
                  padding: 0;
                  min-width: unset!important;
                  line-height: 30px;
                  text-align: center;
                  cursor: pointer;
                }
                .el-input {
                  height: 34px;
                  .el-input__inner {
                    height: 34px;
                    line-height: 34px;
                  }
                }
              }
            }
          }
        }
        .range-label {
          width: 72px;
          line-height:40px;
          font-size: 12px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #444C5D;
          letter-spacing: 1px;
        }
        .control-daterange {
          display: block;
          border: 0;
          padding: 0;
          height: auto;
          .el-input__icon, .el-range-separator {
            display: none;
          }
          .el-range-input {
            height: 32px;
            width: 100%;
            background: #F5F8FA;
            border-radius: 4px;
          }
        }
      }
    }
  }
}
</style>