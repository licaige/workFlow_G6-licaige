<template>
  <div id="container"></div>
</template>

<script lang="ts">
  import { Graph } from '@antv/x6';
  import { defineComponent, onMounted } from 'vue';

  export default defineComponent({
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
          // 限制节点移动
          translating: {
            restrict(view) {
              const cell = view.cell;
              if (cell.isNode()) {
                const parent = cell.getParent();
                if (parent) {
                  // 返回容器渲染到画布后的包围盒
                  return parent.getBBox();
                }
              }
              return null;
            },
          },
        });
        const child = graph.addNode({
          x: 100,
          y: 80,
          width: 120,
          height: 60,
          label: 'Child',
          zIndex: 10,
          attrs: {
            body: {
              stroke: 'none',
              fill: '#3199FF',
            },
            label: {
              fill: '#fff',
            },
          },
        });
        const parent = graph.addNode({
          x: 40,
          y: 40,
          width: 240,
          height: 160,
          zIndex: 1,
          label: 'Parent\n(try to move me)',
          attrs: {
            label: { refY: 130 },
            body: {
              fill: '#fffbe6',
            },
          },
        });
        parent.addChild(child);
      });

      return {};
    },
  });
</script>

<style scoped></style>
