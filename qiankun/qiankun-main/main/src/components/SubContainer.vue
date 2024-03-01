<script setup lang="ts">
import { onMounted } from 'vue'
import { registerMicroApps, start } from 'qiankun'

onMounted(() => {
  if (!(window as any).qiankunStarted) {
    ;(window as any).qiankunStarted = true

    registerMicroApps([
      {
        name: 'app-1',
        entry: '//localhost:1111',
        container: '#sub-container',
        activeRule: '/app/app-1',
      },
      {
        name: 'app-2',
        entry: '//localhost:2222',
        container: '#sub-container',
        activeRule: '/app/app-2',
      },
    ])

    start({
      sandbox: {
        experimentalStyleIsolation: true, // 样式隔离
      },
    })
  }
})
</script>

<template>
  <div id="sub-container"></div>
</template>
