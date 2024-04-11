<template>
  <div>
    <input
      ref="myUpload"
      type="file"
      @change="handleChange">
  </div>
</template>

<script>
import SparkMD5 from 'spark-md5'
export default {
  name: 'GreatUpload',

  data() {
    return {
      
    };
  },

  mounted() {
    
  },
  // file和blob只保存了文件的基本信息：名称、大小、类型等，没有保存内容
  // 查看内容需要用fileReader读取
  // 文件秒传概念：用md5生成分片内容的hash码，上传时校验是否存在相同文件
  // 如果相同，就从服务器生成新地址进行同文件的上传/下载
  // B站解决方案：将文件分片、将分片文件再分片
  methods: {
    async handleChange(e) {
      // 文件列表
      console.log(e.target.files)
      // 文件名称
      console.log(e.target.value)
      let file = e.target.files[0]
      if (!file) {
        return
      }
      // 分10片
      // const chunks = this.createChunks(file, file.size / 10)
      // 10M
      const chunks = this.createChunks(file, 10 * 1024 * 1024)
      console.log(chunks)
      const hash = await this.hash(chunks)
      console.log(hash)
    },
    createChunks(file, chunkSize) {
      const result = []
      for (let i = 0; i < file.size; i+= chunkSize) {
        result.push(file.slice(i, i + chunkSize))
      }
      return result
    },
    /**
     * spart-md5
     * 整个文件算hash会造成卡顿，采用分片计算hash
     * 增量算法：将一个分片计算hash，
     * 将hash和下一个分片一起计算hash，
     * 计算出来的hash再和下一个分片一起计算……
     * 使用web worker线程来计算hash
     * */ 
    hash(chunks) {
      return new Promise(resolve => {
        const spark = new SparkMD5()
        function _read(i) {
          if (i >= chunks.length) {
            resolve(spark.end())
            return
          }
          const blob = chunks[i]
          const reader = new FileReader()
          reader.onload = e => {
            const bytes = e.target.result // 读取到的字节数组
            spark.append(bytes)
            _read(i+1)
          }
          console.log(blob)
          // 读取字节数组
          reader.readAsArrayBuffer(blob)
        }
        _read(0)
      })
    },
  },
};
</script>

<style lang="less" scoped>

</style>