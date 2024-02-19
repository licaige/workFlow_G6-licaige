<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import useCount from '../hooks/useCount'
const todoList = reactive<{value: string, isDone: boolean}[]>([])
const todoVal = ref('')
const { count } = useCount();
const handleAdd = () => {
  todoList.push({
    value: todoVal.value,
    isDone: false
  })
}
const handleDelete = (index) => {
  if(todoList[index].isDone){
    todoList.splice(index,1)
  }
}
const handleDone = (index) => {
  todoList[index].isDone = true
}

onMounted(() => {
  console.log('mounted11')
  console.log(count)
})
onMounted(() => {
  console.log('mounted22')
})
</script>

<template>
  <p>
    自动化工作流，倒计时相关的逻辑（后端往前端推送），前后端分工
    路由、项目、工作项、子任务的权限管理、
    表格操作的复杂性有哪些？
  </p>
  <ul>
    <li v-for = "(item, index) in todoList" key = 'index'>
      <span>{{item.value}}</span>
      <button @click="handleDelete(index)">Delete</button>
      <button @click="handleDone(index)">Done</button>
    </li>
  </ul>
  <div>
    <input v-model="todoVal" />
    <button @click="handleAdd">Add</button>
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
