<script setup lang="ts">
import { defineComponent, ref, reactive, computed, watch, onMounted, onUpdated, provide } from 'vue'
import useMousePosition from './hooks/useMousePosition'
import useURLLoader from './hooks/useURLLoader'
import MyProfile from './components/MyProfile.vue'
import { langKey } from './keys'
interface Person {
  name: string;
  age: number;
}
interface DogResult {
  message: string;
  status: string;
}
interface TodoResult {
  title: string;
}

const count = ref<string | number>(0)
const headline = ref<null | HTMLElement>(null)
const user: Person = reactive({
  name: 'viking',
  age: 8
})
const lang = ref('en')
const changeLang = (type: string) => {
  lang.value = type
}
provide(langKey, lang)
const { x, y } = useMousePosition()
const { loading, result } = useURLLoader<TodoResult>('https://jsonplaceholder.typicode.com/todos/1')
console.log('in setup', headline.value)
onMounted(() => {
  if (headline.value) {
    console.log('mounted', headline.value.innerHTML)
  }
})
onUpdated(() => {
  console.log('the updated', document.getElementById('age')?.innerHTML)
})
const buttonStatus = computed(() => {
  return {
    text: user.age >= 10 ? '可以参与' : '未满10岁不可以参加',
    disabled: user.age < 10
  }
})
watch(count, (newValue, oldValue) => {
  console.log('old count', oldValue)
  console.log('new count', newValue)
  console.log('the dom', document.getElementById('age')?.innerHTML)
  document.title = `目前点击次数是：${newValue}`
}, { flush: 'post' })
// // getter function
// watch(user, (newValue, oldValue) => {
//   console.log('old age', oldValue)
//   console.log('new age', newValue)
//   document.title = `目前点击次数是：${newValue.age}`
// })
// watch([count, () => user.age], (newValue, oldValue) => {
//   console.log('old arr', oldValue)
//   console.log('new arr', newValue)
//   document.title = `目前点击次数是：${newValue[0]}`
// })
const increase = () => {
  if (typeof count.value === 'number') {
    count.value++
  }
  user.age++
}
const onChange = (hidden: boolean) => {
  document.title = hidden ? '年龄被隐藏了～' : '年龄显示出来了'
}
</script>

<template>
  <div>
    <h1 id="age" ref="headline">{{user.age}}</h1>
    <button @click="changeLang('en')">英文</button><br/>
    <button @click="changeLang('ch')">中文</button><br/>
    <button type="button" @click="increase">Increase</button>
    <button type="button" :disabled="buttonStatus.disabled">
      {{ buttonStatus.text }}
    </button>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
    <h1>X:{{x}}</h1>
    <h1>Y:{{y}}</h1>
    <h1 v-if="loading">Loading...</h1>
    <h1 v-if="!loading && result">{{result.title}}</h1>
    <MyProfile @change="onChange" />
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
