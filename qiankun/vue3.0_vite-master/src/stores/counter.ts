import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    console.log('调用，调用')
    count.value++
  }

  return { count, doubleCount, increment }
})

export const useStateCounterStore = defineStore('stateCounter', {
  state:()=>({
    count:0
  })
})
