<template>
  <div>
    <img src="../assets/logo.png" alt="">
    <HelloWorld msg="Welcome to Vue@3.0.7"/>
    <div class='msg-title'>{{microDataStr}}</div>
    <el-row justify="center">
      <router-link to="/page2">
        <el-button type="primary" plain>跳转element-plus</el-button>
      </router-link>
    </el-row>
    <br>
    <el-row justify="center">
      <el-button type="primary" @click="centerDialogVisible = true">展示Dialog</el-button>
    </el-row>
    <el-dialog v-model="centerDialogVisible" title="Warning" width="30%" center>
      <span
        >It should be noted that the content will not be aligned in center by
        default</span
      >
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="centerDialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="centerDialogVisible = false"
            >Confirm</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import HelloWorld from '../components/HelloWorld.vue'

export default {
  name: 'Page1',
  data () {
    return {
      centerDialogVisible: false,
      microDataStr: '',
    }
  },
  created () {
    window.microApp && window.microApp.addDataListener(this.handleDataChange)
  },
  beforeUnmount () {
    window.microApp && window.microApp.removeDataListener(this.handleDataChange)
  },
  components: {
    HelloWorld
  },
  methods: {
    handleDataChange (data) {
      console.log('vue3 来自基座应用的数据', data)
      this.centerDialogVisible = true
      this.microDataStr = JSON.stringify(data)
    }
  }
}
</script>

<style>

</style>
