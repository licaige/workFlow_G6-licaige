<template>
  <div>
    <h1>child-vite-vue3-test</h1>
    <p>test</p>
    <!-- <img :src="microAppLogo" alt="micro-app-logo" /> -->
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
const microAppLogo = new URL('../../assets/images/svg/favicon.svg', import.meta.url).href

export default defineComponent({
  name: 'About',
  setup () {
    return { microAppLogo }
  }
})
</script>