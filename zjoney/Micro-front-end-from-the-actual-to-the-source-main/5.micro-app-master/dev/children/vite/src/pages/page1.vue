<template>
  <div>
    <img alt="Vue logo" :src="url" />
    <HelloWorld msg="Hello Vue 3 + Vite" />
    <router-link to="/page2">Go to page2</router-link>
  </div>
</template>

<script setup>
import HelloWorld from '../components/HelloWorld.vue'
import { defineProps, reactive } from 'vue'

const url = reactive(new URL('../assets/logo.png', import.meta.url).href)
// This starter template is using Vue 3 experimental <script setup> SFCs
// Check out https://github.com/vuejs/rfcs/blob/script-setup-2/active-rfcs/0000-script-setup.md
</script>
<style>
</style>
