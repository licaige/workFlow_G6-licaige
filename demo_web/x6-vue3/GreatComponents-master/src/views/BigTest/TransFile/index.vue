/**
  * 使用showOpenFilePicker,showDirectoryPicker,showSaveFilePicker选择文件
  * 支持chrome、edge、opara
  * 将选中文件转其他格式
  *
  * border-image + background + background-clip组合
  * 异形边框自适应尺寸
  */
<template>
  <div class="TransFile">
    <div class="btn-list">
      <div class="btn" @click="choose('file')">选择文件</div>
      <div class="btn" @click="choose('directory')">选择文件夹</div>
      <div class="btn" style="float: right;" @mouseenter="isShow = true" @mouseleave="isShow = false">
        批量转格式
        <div class="btn-content" :class="{isShow: isShow}" @click="transByType">
          <div v-for="item in transTypeList" :key="item.id" :data-id="item.title" class="btn-item">{{item.title}}</div>
        </div>
      </div>
    </div>
    <div class="file-content">

      <div v-if="fileList.length" class="file-list">
        <h3>选中文件</h3>
        <div v-for="(item, index) in fileList" :key="index" class="file-list-item">{{ item.name }}</div>
        <h6>总共{{fileList.length}}个文件</h6>
      </div>

      <div v-if="transList.length" class="file-list">
        <h3>可以转格式文件</h3>
        <div v-for="(item, index) in transList" :key="index" class="file-list-item">{{ item.name }}</div>
        <h6>总共{{transList.length}}个文件</h6>
      </div>

      <div v-if="finish" class="file-list">
        <div v-if="successList.length || !failList.length" class="file-list" style="position: relative;">
          <h3>成功文件列表</h3>
          <div class="btn inside" @click="downloadT">导出文件</div>
          <div v-for="(item, index) in successList" :key="index" class="file-list-item">{{ item.name }}</div>
          <h6>总共{{successList.length}}个文件</h6>
        </div>

        <div v-if="failList.length" class="file-list">
          <h3>失败文件列表</h3>
          <div v-for="(item, index) in failList" :key="index" class="file-list-item">{{ item.name }}</div>
          <h6>总共{{failList.length}}个文件</h6>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { processHandle, directoryFlat, filterFileType, downloadFile } from '@/views/BigTest/TransFile/utils/index.js'
const maxLength = 10
export default {
  name: 'TransFile',
  data() {
    return {
      fileList: [],
      isShow: false,
      transList: [],
      successList: [],
      failList: [],
      finish: false,
      transTypeList: [
        { id: 0, title: 'mp4转mp3' },
        { id: 1, title: 'mp4转mp3mp4转mp' },
        { id: 2, title: 'mp4转mp3mp4转mp3' },
        { id: 3, title: 'mp3转mp4' },
      ],
    }
  },
  watch: {
    fileList: {
      deep: true,
      handler() {
        this.transList = []
        this.successList = []
        this.failList = []
        this.finish = false
      }
    },
  },
  methods: {
    async choose(kind) {
      try {
        let handle, result = {name: '未命名', kind: 'directory', children: []}
        if (kind == 'file') {
          handle = await showOpenFilePicker({ multiple: true })
          if (handle.length > maxLength) {
            throw '超出最大上传文件数量'
          }
          for (const item of handle) {
            result.children.push(await processHandle(item))
          }
        } else if (kind == 'directory') {
          handle = await showDirectoryPicker()
          result = await processHandle(handle)
        }
        this.fileList = directoryFlat(result)
      } catch (e) {
        if (e == '超出最大上传文件数量') {
          alert(e)
        } else {
          // 用户拒绝处理
          console.log(e)
        }
      }
    },
    // 事件委托，根据dataset.id（文件类型和要转的格式）选择调用的库
    transByType() {
      console.log(event.target.dataset.id)
      if (this.fileList.length == 0) {
        alert('请先选择文件！')
        return
      }
      if (event.target.dataset.id == 'mp4转mp3') {
        this.transMp4ToMp3()
      } else {
        this.transEverything()
      }
    },
    // mp4转mp3
    async transMp4ToMp3() {
      this.transList = filterFileType(this.fileList, ['mp4', 'MP4'])
      for (let i = 0; i < this.transList.length; i++) {
        try {
          await setTimeout(_ => {}, 2000)
          const newName = this.transList[i].name.replace('mp4', 'mp3')
          this.transList[i].move(newName)
          this.successList.push(this.transList[i])
        } catch {
          this.failList.push(this.transList[i])
        } finally {
          this.finish = true
        }
      }
    },
    // 假过程，模拟某一个库转格式的过程
    async transEverything() {
      console.log(filterFileType(this.fileList, 'png'))
      this.transList = filterFileType(this.fileList, 'png')
      setTimeout(() => {
        this.successList = this.transList.filter((item, index) => index % 2)
        this.failList = this.transList.filter((item, index) => !(index % 2))
        this.finish = true
      }, 2000)
    },
    downloadT() {
      this.successList.forEach(async item => {
        const file = await item.getFile()
        downloadFile(file)
      })
    },
  },
}
</script>

<style lang="less">
.TransFile {
  height: 100%;
  width: 100%;
  padding: 20px;
  .btn-list {
    width: calc(100% - 100px);
    // display: flex;
    // flex-flow: row wrap;
  }
  .btn {
    display: inline-block;
    width: fit-content;
    // height: 32px;
    line-height: 32px;
    border: 8px solid transparent;
    border-image: url('~@/assets/img/ScrollBox/编组 15.png') 8 round;
    // background: url('~@/assets/img/ScrollBox/编组 15.png') no-repeat center center / calc(100% + 18px);
    background: linear-gradient(#7e7e7f, #5587b5);
    background-clip: content-box;
    background-position: center center;
    color: #fff;
    margin-right: 5px;
    cursor: pointer;
    position: relative;
    &:last-of-type {
      margin-right: 0;
    }
    & > .btn-content {
      position: absolute;
      top: calc(100% + 10px);
      left: -10px;
      padding: 12px 6px;
      background-color: #7e7e7f;
      width: fit-content;
      height: fit-content;
      transform: scaleY(0);
      transform-origin: top;
      transition: all 0.3s;
      overflow: hidden;
      display: flex;
      flex-flow: column nowrap;
      gap: 6px;
      border-radius: 5px;
      &.isShow {
        transform: scaleY(1);
      }
      & > .btn-item {
        cursor: pointer;
        // width: max-content;
        word-break: keep-all;
        height: 24px;
        line-height: 24px;
        font-size: 12px;
        padding: 0 6px;
        border-radius: inherit;
        &:hover {
          background-color: #5587b5;
        }
      }
    }
    &.inside {
      position: absolute;
      right: 20px;
      top: 10px;
      border-image: unset;
      padding: 0 10px;
      border-radius: 5px;
      border: 0;
      background-clip: unset;
      margin-right: 0;
    }
  }
  .file-content {
    display: flex;
    flex-flow: row nowrap;
    align-items: flex-start;
    gap: 20px;
    height: 600px;
    .file-list {
      width: min(500px, fit-content);
      max-height: 100%;
      overflow-y: auto;
      overflow-x: hidden;
      background: #eee;
      display: flex;
      flex-flow: column nowrap;
      gap: 6px;
      padding: 0 20px;
      & > .file-list-item {
        height: 32px;
        line-height: 32px;
        padding: 0 12px;
        background-color: #7e7e7f;
        color: #eee;
        cursor: pointer;
        &:hover {
          background-color: #5587b5;
        }
      }
      & > h3 {
        position: sticky;
        margin: 0;
        padding: 10px 0;
        top: 0;
        background-color: inherit;
      }
      & > h6 {
        position: sticky;
        margin: 0;
        padding: 10px 0;
        bottom: 0;
        background-color: inherit;
        text-align: end;
      }
      & > .file-list {
        padding: 0;
        padding-right: 20px;
        width: calc(100% + 20px);
      }
    }
  }
}
</style>
