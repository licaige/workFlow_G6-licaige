<template>
  <div>
    <div class='logo-img'></div>
    <!-- <div class='outer-img'></div>
    <img src="../assets/logo.png" alt=""> -->
    <h3>Vue@{{version}}</h3>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <div class='msg-title'>{{microDataStr}}</div>
    <span class="iconfont">&#xe649;</span>
    <span class="iconfont zoe-ui-right"></span>
    <svg class="icon" aria-hidden="true">
      <use xlink:href="#zoe-ui-right"></use>
    </svg>
    <div class='test-safari-before' title='sdfsfs'></div>
    <div class="pt60">
      <ul class="wrapper">
        <li v-for="item in aaa" :key="item">{{ item }}</li>
      </ul>
      <button @click="test">test</button>
    </div>
  </div>
</template>

<script>
import HelloWorld from '../components/HelloWorld.vue'
import Vue from 'vue'

export default {
  name: 'Page1',
  data () {
    return {
      version: Vue.version,
      centerDialogVisible: false,
      microDataStr: '',
      aaa: 1,
    }
  },
  created () {
    console.timeEnd('vue2')
    window.microApp && window.microApp.addDataListener(this.handleDataChange, true)
  },
  beforeDestroy () {
    window.microApp && window.microApp.removeDataListener(this.handleDataChange)
  },
  components: {
    HelloWorld
  },
  methods: {
    handleDataChange (data) {
      console.log('vue2 来自基座应用的数据', data)
      this.centerDialogVisible = true
      this.microDataStr = JSON.stringify(data)
    },
    test() {
      console.time("run loop", 10000);

      for (let index = 2; index < 1 * 10000; index++) {
        this.aaa = index;
      }

      console.timeLog("run loop", 10000);

      this.$nextTick(() => {
        console.timeEnd("run loop", 10000);
      });
    },
  }
}
</script>

<style>
  .logo-img {
    background: url(../assets/logo.png) no-repeat;
    height: 200px;
    width: 200px;
    margin: 0 auto;
  }
  .msg-title {
    font-weight: 500;
  }
  .outer-img {
    background: url(//vuejs.org/images/logo.png) no-repeat;
    background-size: 100% 100%;
    height: 200px;
    width: 200px;
    margin: 0 auto;
  }

  .test-safari-before::before {
    content: 'ddddd';
    color: red;
  }
</style>
