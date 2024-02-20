<template>
  <div class="profile-component">
    <HelloWorld msg="hello from profile"/>
    <h1>Name: {{user.name}}</h1>
    <h1 v-if="!isHidden">Age: {{user.age}}</h1>
    <h1 v-if="!isHidden">DoubleAge: {{doubleAge}}</h1>
    <button type="button" @click="toggleHide">{{ isHidden ? '显示' : '隐藏'}}</button>
  </div>
</template>

<script setup lang="ts">
import { computed, PropType, ref } from 'vue'
import HelloWorld from './HelloWorld.vue'
import type { IPerson, IEvents } from './types'
// interface IPerson {
//   name: string;
//   age: number;
// }
// interface IEvents {
//   (e: 'change', hidden: boolean): void
// }
const props = withDefaults(defineProps<IPerson>(), {
  user: () => ({ name: 'viking', age: 50 })
})
const emit = defineEmits<IEvents>()
const isHidden = ref(false)
const doubleAge = computed(() => props.user.age * 2)
const toggleHide = () => {
  isHidden.value = !isHidden.value
  emit('change', isHidden.value)
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
