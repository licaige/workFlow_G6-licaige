<template>
  <MyButton :textType="2"></MyButton>

  <h4>active: {{ active }}</h4>
  <Tabs v-model="active">
    <Tab name="one">one</Tab>
    <Tab name="two">two</Tab>
    <Tab name="three" ref="childRef">three</Tab>
  </Tabs>
  <button @click="handleClick">选中第三个</button>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const active = ref("one")

const childRef = ref()


const handleClick = () => {
  childRef.value.toggle()
  console.log(active.value)
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
