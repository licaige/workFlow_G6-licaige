<template>
  <a-button @click="test01">添加边的同时添加标签</a-button>
  <a-button @click="test02">二次设置标签</a-button>
  <a-button @click="test03">定制样式</a-button>
  <a-button @click="busRoutes">实例：公交路线</a-button>
  <a-button @click="test04">内置箭头</a-button>

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
          height: 1200,
          background: {
            color: '#fffbe6', // 设置画布背景颜色
          },
          grid: {
            size: 10, // 网格大小 10px
            visible: true, // 渲染网格背景
          },
          // 当源/目标是画布上的点时，需要开启 allowBlank 选项（默认已经开启）才能生效
          connecting: {
            allowBlank: false,
          },
        });
      });

      const test01 = () => {
        graph.addEdge({
          source: { x: 200, y: 100 },
          target: { x: 200, y: 300 },
          labels: [
            {
              attrs: {
                label: { text: '标签1' },
              },
              position: {
                distance: 0.3, // 位置
              },
            },
            {
              attrs: {
                label: { text: '标签2' },
              },
              position: {
                distance: 0.7, // 位置
              },
            },
            {
              attrs: {
                label: { text: '标签3' },
              },
              position: {
                distance: 0.5, // 位置
              },
            },
          ],
        });
        graph.addEdge({
          source: { x: 250, y: 100 },
          target: { x: 250, y: 300 },
          labels: ['标签1', '标签2'], // 通过 labels 可以设置多个标签，当只设置标签文本是可以简化为此写法
        });
        graph.addEdge({
          source: { x: 300, y: 100 },
          target: { x: 300, y: 300 },
          label: '标签', // 通过 label 设置单个标签，当只设置标签文本是可以简化为此写法
        });
      };

      const test02 = () => {
        const edge = graph.addEdge({
          source: { x: 350, y: 100 },
          target: { x: 350, y: 300 },
        });
        // 设置标签
        edge.setLabels([
          {
            attrs: { label: { text: 'edge1' } },
            position: {
              distance: 0.1, // 位置
            },
          },
        ]);
        // 或
        edge.setLabels(['edge2']);

        // 添加单个标签
        edge.appendLabel({
          attrs: {
            label: { text: 'edge3' },
          },
          position: {
            distance: 0.7, // 位置
          },
        });
        // 或
        edge.appendLabel('edge4');
      };

      const test03 = () => {
        graph.addEdge({
          source: { x: 400, y: 100 },
          target: { x: 400, y: 300 },
          attrs: {
            line: {
              stroke: '#7c68fc', // 指定 path 元素的填充色
              sourceMarker: 'block', // 实心箭头
              targetMarker: {
                name: 'ellipse', // 椭圆
                rx: 10, // 椭圆箭头的 x 半径
                ry: 6, // 椭圆箭头的 y 半径
              },
            },
          },
        });
      };

      const busRoutes = () => {
        graph.addEdge({
          source: { x: 100, y: 50 },
          target: { x: 1400, y: 50 },
          labels: [
            {
              markup: [
                {
                  tagName: 'circle',
                  selector: 'dot',
                },
                {
                  tagName: 'text',
                  selector: 'txt',
                },
              ],
              attrs: {
                txt: {
                  fill: '#7c68fc',
                  textAnchor: 'middle',
                  textVerticalAnchor: 'middle',
                  refX: 0,
                  refY: 20,
                  text: '始发站',
                },
                dot: {
                  fill: '#fff',
                  stroke: 'red',
                  strokeWidth: 1,
                  r: 5,
                  cx: 0,
                  cy: 0,
                },
              },
              position: {
                distance: 0, // 位置
              },
            },
            {
              markup: [
                {
                  tagName: 'circle',
                  selector: 'dot',
                },
                {
                  tagName: 'text',
                  selector: 'txt',
                },
              ],
              attrs: {
                txt: {
                  fill: '#7c68fc',
                  textAnchor: 'middle',
                  textVerticalAnchor: 'middle',
                  refX: 0,
                  refY: 20,
                  text: '站点A',
                },
                dot: {
                  fill: '#fff',
                  stroke: '#000',
                  strokeWidth: 1,
                  r: 5,
                  cx: 0,
                  cy: 0,
                },
              },
              position: {
                distance: 0.2, // 位置
              },
            },
            {
              markup: [
                {
                  tagName: 'circle',
                  selector: 'dot',
                },
                {
                  tagName: 'text',
                  selector: 'txt',
                },
              ],
              attrs: {
                txt: {
                  fill: '#7c68fc',
                  textAnchor: 'middle',
                  textVerticalAnchor: 'middle',
                  refX: 0,
                  refY: 20,
                  text: '站点B（车辆当前位置）',
                },
                dot: {
                  fill: 'green',
                  stroke: '#000',
                  strokeWidth: 1,
                  r: 5,
                  cx: 0,
                  cy: 0,
                },
              },
              position: {
                distance: 0.5, // 位置
              },
            },
            {
              markup: [
                {
                  tagName: 'circle',
                  selector: 'dot',
                },
                {
                  tagName: 'text',
                  selector: 'txt',
                },
              ],
              attrs: {
                txt: {
                  fill: '#7c68fc',
                  textAnchor: 'middle',
                  textVerticalAnchor: 'middle',
                  refX: 0,
                  refY: 20,
                  text: '终点站',
                },
                dot: {
                  fill: '#fff',
                  stroke: 'red',
                  strokeWidth: 1,
                  r: 5,
                  cx: 0,
                  cy: 0,
                },
              },
              position: {
                distance: 1, // 位置
              },
            },
          ],
          attrs: {
            line: {
              stroke: '#7c68fc',
              sourceMarker: '',
              targetMarker: '',
            },
          },
        });
      };

      const test04 = () => {
        graph.addEdge({
          source: { x: 500, y: 100 },
          target: { x: 500, y: 300 },
          attrs: {
            line: {
              sourceMarker: 'block', // 实心箭头
              targetMarker: 'classic', // 经典箭头
            },
          },
        });
        graph.addEdge({
          source: { x: 550, y: 100 },
          target: { x: 550, y: 300 },
          attrs: {
            line: {
              sourceMarker: 'diamond', // 菱形箭头
              targetMarker: 'cross', // 交叉箭头
            },
          },
        });
        graph.addEdge({
          source: { x: 600, y: 100 },
          target: { x: 600, y: 300 },
          attrs: {
            line: {
              sourceMarker: 'async',
              targetMarker: {
                name: 'path',
                offsetX: 10,
                d: 'M4.834,4.834L4.833,4.833c-5.889,5.892-5.89,15.443,0.001,21.334s15.44,5.888,21.33-0.002c5.891-5.891,5.893-15.44,0.002-21.33C20.275-1.056,10.725-1.056,4.834,4.834zM25.459,5.542c0.833,0.836,1.523,1.757,2.104,2.726l-4.08,4.08c-0.418-1.062-1.053-2.06-1.912-2.918c-0.859-0.859-1.857-1.494-2.92-1.913l4.08-4.08C23.7,4.018,24.622,4.709,25.459,5.542zM10.139,20.862c-2.958-2.968-2.959-7.758-0.001-10.725c2.966-2.957,7.756-2.957,10.725,0c2.954,2.965,2.955,7.757-0.001,10.724C17.896,23.819,13.104,23.817,10.139,20.862zM5.542,25.459c-0.833-0.837-1.524-1.759-2.105-2.728l4.081-4.081c0.418,1.063,1.055,2.06,1.914,2.919c0.858,0.859,1.855,1.494,2.917,1.913l-4.081,4.081C7.299,26.982,6.379,26.292,5.542,25.459zM8.268,3.435l4.082,4.082C11.288,7.935,10.29,8.571,9.43,9.43c-0.858,0.859-1.494,1.855-1.912,2.918L3.436,8.267c0.58-0.969,1.271-1.89,2.105-2.727C6.377,4.707,7.299,4.016,8.268,3.435zM22.732,27.563l-4.082-4.082c1.062-0.418,2.061-1.053,2.919-1.912c0.859-0.859,1.495-1.857,1.913-2.92l4.082,4.082c-0.58,0.969-1.271,1.891-2.105,2.728C24.623,26.292,23.701,26.983,22.732,27.563z',
              },
            },
          },
        });
      };

      return {
        test01,
        test02,
        test03,
        busRoutes,
        test04,
      };
    },
  });
</script>

<style scoped></style>
