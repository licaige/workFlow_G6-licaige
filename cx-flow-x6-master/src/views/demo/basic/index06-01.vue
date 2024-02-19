<template>
  <div id="container"></div>
</template>

<script lang="ts">
  import { Graph } from '@antv/x6';
  import { onMounted } from 'vue';

  export default {
    name: 'Index0601',
    setup() {
      let graph: Graph;
      onMounted(() => {
        graph = new Graph({
          container: document.getElementById('container') as HTMLElement,
          height: 600,
          background: {
            color: '#fffbe6', // 设置画布背景颜色
          },
          grid: {
            size: 10, // 网格大小 10px
            visible: true, // 渲染网格背景
          },
        });
        graph.addNode({
          x: 60,
          y: 60,
          width: 160,
          height: 80,
          label: 'Rect With Ports',
          ports: [
            { id: 'port1' },
            {
              // 唯一标识
              id: 'port2',
              attrs: {
                circle: {
                  // 圆的半径
                  r: 6,
                  // 吸附功能
                  magnet: true,
                  // 边的颜色
                  stroke: '#31d0c6',
                  // 边的宽度
                  strokeWidth: 2,
                  // 链接桩填充颜色
                  fill: '#fff',
                },
                text: {
                  // 标签选择器
                  text: 'port2', // 标签文本
                },
              },
            },
          ],
        });
      });
      return {};
    },
  };
</script>

<style scoped></style>
