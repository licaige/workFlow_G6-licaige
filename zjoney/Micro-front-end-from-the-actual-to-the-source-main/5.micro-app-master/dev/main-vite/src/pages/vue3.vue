<template>
<div class="vue3">
  <micro-app
    name='vue3'
    url='http://localhost:4002/micro-app/vue3/'
    :data='data'
    macro
    baseRoute='/vue3'
  >
    <!-- destroy inline scopecss='false' -->
  </micro-app>
</div>
</template>

<script lang="ts" setup>
import {ref} from "vue";

const data = ref({from: '来自基座的初始化数据'})

</script>

<style>

</style>
