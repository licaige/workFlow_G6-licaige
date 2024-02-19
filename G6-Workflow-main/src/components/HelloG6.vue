<script setup lang="ts">
import { onMounted } from 'vue';
// import { ref } from 'vue'
 // 扩展了节点、边的G6
import G6, { ShapeStyle } from '@antv/g6'
const data = {
  nodes: [
    {
      id: 'node0',
      x: 100,
      y: 100,
      size: 20,
    },
    {
      id: 'node1',
      x: 200,
      y: 200,
      size: 20,
    },
  ],
  edges: [
    {
      source: 'node0',
      target: 'node1',
      type: 'cubic',
      style: {
        endArrow: true,
        stroke: '#088',
        lineWidth: 3,
      },
      curveOffset: 33
    },
  ]
}
onMounted(() => {
  console.log('onMounted')
})
</script>

<template>
 <template>
  <div id="helloG6"></div>
</template>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
