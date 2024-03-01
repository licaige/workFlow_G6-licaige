<script lang="ts" setup>
import { computed } from 'vue'
import { todoListStore } from '@/stores/common'

// const props = defineProps(['tag']) 或者定义类型：
const props = defineProps({
  tag: {
    type: String,
    default: '',
    required: true
  }
})

const emit = defineEmits(['delClick'])

const todoStore = todoListStore()

const list = computed(() => {
  return todoStore.getList
})
</script>

<template>
  <ul class="todo-list">
    <li v-for="(item, i) of list" :key="i" @click="emit('delClick', i)">
      {{ item }} --- {{ props.tag }}
    </li>
  </ul>
</template>

<style>
.todo-list {
  li {
    cursor: pointer;
  }
}
</style>
