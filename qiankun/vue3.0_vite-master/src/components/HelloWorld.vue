<!-- <script setup lang="ts">
defineProps<{
  msg: string
}>()
</script> -->

<template>
  <div class="greetings">
    <h1 class="green">{{ msg }}</h1>
    <h3>
      You’ve successfully created a project with
      <a href="https://vitejs.dev/" target="_blank" rel="noopener">Vite</a> +
      <a href="https://vuejs.org/" target="_blank" rel="noopener">Vue 3</a>. What's next?
    </h3>
    <h2><span>你现在的位置在</span>&nbsp;&nbsp;<label>{{ position }}</label></h2>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
let position = ref('home页')
const props = defineProps({
  msg:String
})

//使用setup 定义的组件，内部的任何东西都无法被访问到。需要显示暴露。
defineExpose({
  position
})
</script>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
