<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import HelloWorld from './components/HelloWorld.vue'
import Test from './components/Test'
const confirm = () => {
  console.log('确认')
}
</script>

<template>
  <div>
    <c-button type="primary" size="large" block>确定</c-button>
    <c-button type="primary" size="medium" @click="confirm">确定</c-button>
    <c-button type="primary" size="small" disabled @click="confirm">确定</c-button>
    <c-button>取消</c-button>
    <Test />
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <HelloWorld msg="Vite + Vue" />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
