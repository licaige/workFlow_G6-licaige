import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

// 函数式
export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  return { count, doubleCount, increment }
})

// 组合式
export const useNameStore = defineStore('name', {
  state: () => ({
    name: ''
  }),
  getters: {
    hello: (state) => state.name && `你好！${state.name}`
  },
  actions: {
    sayHello(val: string) {
      this.name = val
    }
  }
})

// todo-list
export const todoListStore = defineStore('todo-list', {
  state: () => ({
    list: []
  }),
  getters: {
    getList: (state) => state.list
  },
  actions: {
    updateList(list: []) {
      this.list = list
    }
  }
})
