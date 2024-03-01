
<template>

  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />
    <div class="wrapper">
      <HelloWorld ref="helloRef" msg="You did it!" />
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header>

  <div class="homeContainer" v-if="isShow">
    <div class="piniaList">
      <ul>
        <li><span>count</span>------<label>{{ count }}</label></li>
        <li><span>state 方式的 count</span>------<label>{{ stateCounter.count }}</label></li>
      </ul>
    </div>
    <div class="container">
      <div class="boxscroll">

        <div class="items">
          <span class="item" v-for="item in itemNum">{{item + '-----2292929'}}</span>
        </div>
      </div>
    </div>

  </div>
  <RouterView />
  
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { RouterLink, RouterView, useRoute } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import { useCounterStore,useStateCounterStore } from "@/stores/counter"

import { storeToRefs } from 'pinia'
//直接解构之后count响应性丢失
//const { count } = useCounterStore();
let itemNum = ref(20);
let isShow = ref<Boolean>(false);
let helloRef = ref();
const counter = useCounterStore();
const stateCounter = useStateCounterStore();
const $route = useRoute();

const { count } = storeToRefs(counter);
// mounted用法
onMounted(()=>{
  console.log(helloRef.value.position)
  console.log('当前环境是：'+ import.meta.env.VITE_NODE_ENV)
})
//watch用法

watch($route,(newVal,oldVal)=>{
  console.log('当前路由：', newVal.path)
  helloRef.value.position = newVal.path
  if(newVal.path == '/'){
    isShow.value = true
  }else{
    isShow.value = false
  }
})

</script>
<style scoped>
.items{
  white-space: nowrap;
  position: relative;
}
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
