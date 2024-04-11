<template>
  <div id="app">
    <CodeRain></CodeRain>
    <div v-if="$route.path !== '/'" class="back-btn" @click="$router.push('/')">首页</div>
    <router-view/>
    <div style="position: fixed;top: 110px;right: 20px;cursor: pointer;" class="back-btn" @click="() => {fetch();abort();fetch();fetch();}">调用接口</div>
  </div>
</template>
<script>
import '@/api/axios.js'
import {cancelFetch} from '@/scripts/取消请求/test.js'
import {anyToHash} from '@/scripts/任意类型转hash/index.js'
import CodeRain from '@/components/CodeRain'
import Event from "@/scripts/pubsub.js";
export default {
  components: {
    CodeRain,
  },
  created() {
    import('@/test/大任务分片/index.js')
    const [fetch, abort] = cancelFetch('./scripts/animation.js', res => {console.log(res.blob())})
    this.fetch = fetch
    this.abort = abort
    window.anyToHash = anyToHash
  },
  mounted () {

    // 必须先订阅再发布，由于app的mounted比其他的更早，所以要异步请求
    // 或者放在事件里，如点击触发发布
    setTimeout(() => {
      Event.trigger("user", '老王不上班')
      this.$dialog.open()
    }, 50)

    this.$store.commit('getUserRole', ['CREATE', 'MODIFY', 'READONLY'])
    console.log('原始数据', this.$store.state.roles.toString(2))
    this.$store.dispatch('delRole', 'DELETE')
    // this.$store.dispatch('delRole', 'CREATE')
    setTimeout(() => {
      console.log('删除后数据', this.$store.state.roles.toString(2))
    })
  },
  data() {
    return {
      fetch: () => {},
      abort: () => {},
    }
  },
}
</script>

<style lang="less">
* {
  box-sizing: border-box;
}
html, body, #app {
  width: 100%;
  height:100%;
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  overflow: hidden;
}
html {
  min-width: 1226px;
}
image {
  max-width: 100%;
}
.back-btn {
  position: fixed;
  top: 50px;
  right: 20px;
  height: 20px;
  width: 20px;
  color: #45627a;
  z-index: 999999;
  cursor: pointer;
}
</style>
