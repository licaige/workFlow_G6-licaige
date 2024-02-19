<template>
  <a-button @click="isPan">画布是否可以平移</a-button>
  <a-button @click="enablePanning">启用画布平移</a-button>
  <a-button @click="disablePanning">禁止画布平移</a-button>
  <a-button @click="togglePanning">切换画布平移状态</a-button>
  <a-button @click="zoom">获取缩放级别</a-button>
  <a-button @click="zoomAdd">在原来缩放级别上增加 0.2</a-button>
  <a-button @click="zoomReduce">在原来缩放级别上减少 0.2</a-button>

  <a-button @click="centerContent">将画布内容中心与视口中心对齐</a-button>

  <a-button @click="toSVG">导出svg</a-button>
  <a-button @click="toPNG">导出png</a-button>

  <a-button @click="dispose">销毁画布</a-button>

  <div id="container"></div>
</template>

<script lang="ts">
  import { defineComponent, onMounted } from 'vue';
  import { Graph, DataUri } from '@antv/x6';
  export default defineComponent({
    setup() {
      const data = {
        // 节点
        nodes: [
          {
            id: 'node1', // String，可选，节点的唯一标识
            x: 0, // Number，必选，节点位置的 x 值
            y: 0, // Number，必选，节点位置的 y 值
            width: 80, // Number，可选，节点大小的 width 值
            height: 40, // Number，可选，节点大小的 height 值
            label: 'hello', // String，节点标签
          },
          {
            id: 'node2', // String，节点的唯一标识
            x: 160, // Number，必选，节点位置的 x 值
            y: 180, // Number，必选，节点位置的 y 值
            width: 80, // Number，可选，节点大小的 width 值
            height: 40, // Number，可选，节点大小的 height 值
            label: 'world', // String，节点标签
          },
        ],
        // 边
        edges: [
          {
            source: 'node1', // String，必须，起始节点 id
            target: 'node2', // String，必须，目标节点 id
          },
        ],
      };
      let graph = {};
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
          // panning: true,
          panning: {
            enabled: true,
            modifiers: 'shift', // shift、ctrl、alt
            // eventTypes: ['leftMouseDown', 'rightMouseDown', 'mouseWheel']
          },
          // scroller: {
          //   enabled: true,
          //   // pannable: true,
          //   // pageVisible: true,
          //   // pageBreak: false,
          // },
          // mousewheel: {
          //   enabled: true,
          //   modifiers: ['ctrl', 'meta'],
          // },
        });
        (graph as Graph).fromJSON(data);
      });

      const isPan = () => {
        // 画布是否可以平移
        console.log((graph as Graph).isPannable());
      };

      const enablePanning = () => {
        (graph as Graph).enablePanning(); // 启用画布平移
      };

      const disablePanning = () => {
        (graph as Graph).disablePanning(); // 禁止画布平移
      };

      const togglePanning = () => {
        (graph as Graph).togglePanning(); // 切换画布平移状态
      };

      const zoom = () => {
        console.log((graph as Graph).zoom()); // 获取缩放级别
      };
      const zoomAdd = () => {
        (graph as Graph).zoom(0.2); // 在原来缩放级别上增加 0.2
      };
      const zoomReduce = () => {
        (graph as Graph).zoom(-0.2); // 在原来缩放级别上减少 0.2
      };

      const centerContent = () => {
        (graph as Graph).centerContent(); // 将画布内容中心与视口中心对齐
      };

      const toSVG = () => {
        (graph as Graph).toSVG(
          (dataUri: string) => {
            // 下载
            DataUri.downloadDataUri(DataUri.svgToDataUrl(dataUri), 'chart.svg');
          },
          {
            preserveDimensions: {
              width: 200,
              height: 200,
            },
            stylesheet: `
              rect {
                fill: red;
              }
            `,
            beforeSerialize: (svg: SVGSVGElement) => {
              console.log('我执行了', svg);
            },
          },
        );
      };

      const toPNG = () => {
        (graph as Graph).toPNG(
          (dataUri: string) => {
            // 下载
            DataUri.downloadDataUri(dataUri, 'chart.png');
          },
          {
            backgroundColor: 'red',
            padding: {
              top: 20,
              right: 30,
              bottom: 40,
              left: 50,
            },
            quality: 1,
          },
        );
      };

      const dispose = () => {
        (graph as Graph).dispose();
      };

      return {
        isPan,
        enablePanning,
        disablePanning,
        togglePanning,
        zoom,
        zoomAdd,
        zoomReduce,
        centerContent,
        toSVG,
        toPNG,
        dispose,
      };
    },
  });
</script>

<style scoped></style>
