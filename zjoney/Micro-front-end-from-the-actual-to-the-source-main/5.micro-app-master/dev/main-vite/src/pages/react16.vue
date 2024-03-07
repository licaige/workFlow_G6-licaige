<template>
<div class="react16">
  <div class='btn-con'>
    <el-button type="primary" round @click='toggleShow'>微应用是否展示</el-button>
    <el-button type="primary" round @click='changeData'>data属性发送数据</el-button>
    <el-button type="primary" round @click='dispatchData'>dispatch方法发送数据</el-button>
    <el-button type="primary" round @click='dispatchGlobalData'>发送全局数据</el-button>
    <el-button type="primary" round @click='changeNameUrl'>切换应用</el-button>
    <el-button type="primary" round @click='changeTestNum'>testNum -- {{ testNum }}</el-button>
  </div>
  <div class='micro-app-con'>
    <micro-app
      v-if="showMicroApp"
      :data='data'
      :name='name'
      :url='url'
      @created='created'
      @beforemount='beforemount'
      @mounted='mounted'
      @unmount='unmount'
      @error='error'
      @datachange='handleDataChange'
      inline
      baseRoute='/react16'
    >
      <!-- destroy  inline -->
    </micro-app>
  </div>
</div>
</template>

<script lang="ts" setup>
import app from '@micro-zoe/micro-app'
import {onMounted, onUpdated, ref} from "vue";

const data = ref({name: '初始化数据'})
const name = ref('react16')
const url = ref('http://localhost:3001/micro-app/react16/')
const showMicroApp = ref(true)
const testNum = ref(0)
onMounted(() => {
  console.time('react16')
  app.addDataListener('react16', (data) => {
    console.log('来自子应用react16的数据', data)
  })

  app.addGlobalDataListener((data) => {
    console.log('这是全局数据--基座应用', data)
  })
})
const created = () => {
  console.log('生命周期：created')
}
const beforemount = (e) => {
  console.log('生命周期：beforemount', e)
}
const mounted = () => {
  console.log('生命周期：mounted')
}
const unmount = () => {
  console.log('生命周期：unmount')
}
const error = () => {
  console.log('生命周期：error')
}

const handleDataChange = (e: any) => {
  console.log('通过生命周周期监听到来自子应用的数据', e)
  $alert(JSON.stringify(e.detail.data), '来自子应用的数据', {
    confirmButtonText: '确定',
    callback: action => {
      $message({
        type: 'info',
        message: `action: ${action}`
      });
    }
  })
}
const toggleShow = () => {
  showMicroApp.value = !showMicroApp.value
}

const changeData = () => {
  data.value = {name: +new Date()}
}

const dispatchData = () => {
  app.setData('react16', {dispatch: 'data from dispatch' + (+new Date())})
}

const dispatchGlobalData = () => {
  app.setGlobalData({name: '全局数据' + (+new Date())})
}

const changeNameUrl = () => {
  name.value = 'vue2'
  url.value = 'http://localhost:4001/micro-app/vue2'
}

const changeTestNum = () => {
  testNum.value = testNum.value + 1
}

</script>

<style>
.react16 {
  display: flex;

}

.btn-con {
  display: flex;
  flex-direction: column;
  width: 200px;
}

.btn-con button {
  margin: 5px;
}

.micro-app-con {
  flex: 1;
}
</style>
