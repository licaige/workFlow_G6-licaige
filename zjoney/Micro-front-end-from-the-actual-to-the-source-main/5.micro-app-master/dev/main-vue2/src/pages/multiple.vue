<template>
  <div class="multiple">
    <el-button type="primary" round @click='changeData'>发送数据</el-button>
    <div class='multiple-con'>
      <micro-app
        class='multiple-micro-app'
        name='react162'
        url='http://localhost:3001/micro-app/react16/'
        baseRoute='/multiple'
        :data='data'
      ></micro-app>
      <!-- destroy inline scopecss='false' -->
      <micro-app
        class='multiple-micro-app'
        name='vue22'
        url='http://localhost:4001/micro-app/vue2/'
        :data='data'
      >
      </micro-app>
    </div>
  </div>
</template>

<script>

export default {
  name: 'multiple',
  data () {
    return {
      data: {from: '来自基座的初始化数据'}
    }
  },
  methods: {
    changeData () {
      this.data = {from: '来自基座的数据' + (+new Date())}
    },
  }
}
</script>

<style>
  .multiple-con {
    display: flex;
    width: 100%;
  }

  .multiple-micro-app {
    display: block;
    flex: 1;
    margin: 0 5px;
    min-width: 200px;
  }

</style>
