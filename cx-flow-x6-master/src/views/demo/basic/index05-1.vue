<template>
  <a-button @click="test1">test1：简单的父子嵌套</a-button>
  <a-button @click="test2">test2：子节点的原点位置-左上角</a-button>
  <a-button @click="test3">test3：移动父节点时，边的路径点将跟随移动(注意添加边的顺序)</a-button>
  <a-button @click="test4">test4：移动父节点时，边的路径点不跟随移动(注意添加边的顺序)</a-button>

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
          // 当源/目标是画布上的点时，需要开启 allowBlank 选项（默认已经开启）才能生效
          // connecting: {
          //   allowBlank: false,
          // },
          // translating: {
          //   // 限制子节点的移动
          //   restrict(view) {
          //     const cell = view.cell
          //     if (cell.isNode()) {
          //       const parent = cell.getParent()
          //       if (parent) {
          //         return parent.getBBox()
          //       }
          //     }
          //
          //
          //     return null
          //   },
          // },
        });
      });

      const test1 = () => {
        const child = graph.addNode({
          x: 120,
          y: 80,
          width: 120,
          height: 60,
          zIndex: 10,
          label: 'Child\n(embedded)',
          attrs: {
            body: {
              fill: 'green',
            },
            label: {
              fill: '#fff',
            },
          },
        });
        const parent = graph.addNode({
          x: 80,
          y: 40,
          width: 320,
          height: 240,
          zIndex: 1,
          label: 'Parent\n(try to move me)',
        });
        parent.addChild(child);
      };

      const test2 = () => {
        const child1 = graph.addNode({
          x: 100,
          y: 300,
          width: 120,
          height: 60,
          label: 'Child\n(inside)',
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

        const child2 = graph.createNode({
          x: 360,
          y: 300,
          width: 120,
          height: 60,
          label: 'Child\n(outside)',
          zIndex: 10,
          attrs: {
            body: {
              stroke: 'none',
              fill: '#47C769',
            },
            label: {
              fill: '#fff',
            },
          },
        });

        const parent = graph.addNode({
          x: 80,
          y: 300,
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

        parent.addChild(child1);
        parent.addChild(child2);
      };

      const test3 = () => {
        const source = graph.addNode({
          x: 520,
          y: 100,
          width: 80,
          height: 40,
          label: 'Child\n(source)',
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

        const target = graph.addNode({
          x: 780,
          y: 80,
          width: 80,
          height: 40,
          label: 'Child\n(target)',
          zIndex: 10,
          attrs: {
            body: {
              stroke: 'none',
              fill: '#47C769',
            },
            label: {
              fill: '#fff',
            },
          },
        });

        const parent = graph.addNode({
          x: 500,
          y: 40,
          width: 360,
          height: 160,
          zIndex: 1,
          label: 'Parent\n(try to move me)',
          attrs: {
            label: { refY: 140 },
            body: {
              fill: '#fffbe6',
            },
          },
        });

        parent.addChild(source);
        parent.addChild(target);

        graph.addEdge({
          source,
          target,
          vertices: [
            { x: 620, y: 60 },
            { x: 700, y: 100 },
          ],
        });
      };

      const test4 = () => {
        const source = graph.addNode({
          x: 520,
          y: 400,
          width: 80,
          height: 40,
          label: 'Child\n(source)',
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

        const target = graph.addNode({
          x: 780,
          y: 380,
          width: 80,
          height: 40,
          label: 'Child\n(target)',
          zIndex: 10,
          attrs: {
            body: {
              stroke: 'none',
              fill: '#47C769',
            },
            label: {
              fill: '#fff',
            },
          },
        });

        const parent = graph.addNode({
          x: 500,
          y: 340,
          width: 360,
          height: 160,
          zIndex: 1,
          label: 'Parent\n(try to move me)',
          attrs: {
            label: { refY: 140 },
            body: {
              fill: '#fffbe6',
            },
          },
        });

        graph.addEdge({
          source,
          target,
          vertices: [
            { x: 620, y: 360 },
            { x: 700, y: 400 },
          ],
        });

        parent.addChild(source);
        parent.addChild(target);
      };

      return {
        test1,
        test2,
        test3,
        test4,
      };
    },
  });
</script>

<style scoped></style>
