<template>
  <a-button @click="test1">test1：构造函数</a-button>
  <a-button @click="test21">test2-1</a-button>
  <a-button @click="test22">test2-2</a-button>
  <a-button @click="test31">test3-1</a-button>
  <a-button @click="test32">test3-2</a-button>

  <div id="container"></div>
</template>

<script lang="ts">
  import { Graph, Shape, Node } from '@antv/x6';
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
        });
      });

      // 构造函数创建
      const test1 = () => {
        // 创建节点
        const rect = new Shape.Rect({
          x: 100,
          y: 200,
          width: 80,
          height: 40,
          angle: 30,
          attrs: {
            body: {
              fill: 'blue',
            },
            label: {
              text: 'Hello',
              fill: 'white',
            },
          },
        });
        // 添加到画布
        graph.addNode(rect);
      };

      let test2Rect: Node;
      const test21 = () => {
        test2Rect = new Shape.Rect();
        // 添加到画布
        graph.addNode(test2Rect);
      };
      const test22 = () => {
        test2Rect
          // 设置节点位置
          ?.position(100, 200)
          // 设置节点大小
          ?.resize(80, 40)
          // 旋转节点
          ?.rotate(30)
          // 设置节点样式
          ?.attr({
            body: {
              fill: 'blue',
            },
            label: {
              text: 'Hello',
              fill: 'white',
            },
          });
      };

      let test3Rect: Node;
      const test31 = () => {
        test3Rect = graph.addNode({
          shape: 'rect', // 指定使用何种图形，默认值为 'rect'
          x: 100,
          y: 200,
          width: 80,
          height: 40,
          angle: 30,
          attrs: {
            body: {
              fill: 'blue',
            },
            label: {
              text: 'Hello',
              fill: 'white',
            },
          },
        });
      };
      const test32 = () => {
        test3Rect
          // 设置节点位置
          ?.position(100, 200)
          // 设置节点大小
          ?.resize(80, 40)
          // 旋转节点
          ?.rotate(30)
          // 设置节点样式
          ?.attr({
            body: {
              fill: 'blue',
            },
            label: {
              text: 'Hello',
              fill: 'white',
            },
          });
      };

      return {
        test1,
        test21,
        test22,
        test31,
        test32,
      };
    },
  });
</script>

<style scoped></style>
