<template>
  <a-button @click="addRect">addRect</a-button>
  <a-button @click="rectConfig">rectConfig</a-button>
  <a-button @click="toJson">toJSON</a-button>
  <a-button @click="erRect">erRect</a-button>
  <div id="container"></div>
</template>

<script lang="ts">
  import { defineComponent, onMounted } from 'vue';
  import { Graph, Shape, Node, ObjectExt } from '@antv/x6';

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

      const addRect = () => {
        const rect = new Shape.Rect({
          x: 10,
          y: 40,
          width: 100,
          height: 45,
          attrs: {
            // 指定 text 元素的样式
            label: {
              text: 'attrs/label', // 文字
              // fill: '#333', // 文字颜色
            },
          },
        });
        graph.addNode(rect);
      };

      const rectConfig = () => {
        Shape.Rect.config({
          width: 80,
          height: 40,
          attrs: {
            label: {
              fill: 'red',
            },
          },
          data: {
            tableId: 1,
          },
          // 通过钩子将 label 应用到 'attrs/text/text' 属性上
          propHooks(metadata) {
            console.log(metadata);
            const { data, ...others } = metadata;
            if (data) {
              ObjectExt.setByPath(others, 'data/tableId', 2);
            }
            // ObjectExt.setByPath(others, 'attrs/body/fill', "green")

            return others;
          },
        });
      };

      const toJson = () => {
        console.log(graph.toJSON());
      };

      const erRect = () => {
        const LINE_HEIGHT = 24;
        Graph.registerPortLayout(
          'erPortPosition',
          (portsPositionArgs) => {
            return portsPositionArgs.map((_, index) => {
              return {
                position: {
                  x: -63,
                  y: (index + 1) * LINE_HEIGHT,
                },
                angle: 0,
              };
            });
          },
          true,
        );
        const erRect: Node = new Node({
          id: '1',
          shape: 'rect',
          position: {
            x: 240,
            y: 150,
          },
          markup: [
            {
              tagName: 'rect',
              selector: 'body',
            },
            {
              tagName: 'text',
              selector: 'label',
            },
          ],
          attrs: {
            rect: {
              ref: 'label',
              refWidth: 126,
              refHeight: 20,
              refX: -63,
              refY: -10,
              strokeWidth: 1,
              stroke: '#5F95FF',
              fill: '#5F95FF',
            },
            label: {
              text: '学生',
              fontWeight: 'bold',
              fill: '#ffffff',
              fontSize: 12,
            },
          },
          ports: {
            groups: {
              list: {
                markup: [
                  {
                    tagName: 'rect',
                    selector: 'portBody',
                  },
                  {
                    tagName: 'text',
                    selector: 'portNameLabel',
                  },
                  {
                    tagName: 'text',
                    selector: 'portTypeLabel',
                  },
                ],
                attrs: {
                  portBody: {
                    width: 150,
                    height: 24,
                    strokeWidth: 1,
                    stroke: '#5F95FF',
                    fill: '#EFF4FF',
                    magnet: true,
                  },
                  portNameLabel: {
                    ref: 'portBody',
                    refX: 6,
                    refY: 6,
                    fontSize: 10,
                  },
                  portTypeLabel: {
                    ref: 'portBody',
                    refX: 95,
                    refY: 6,
                    fontSize: 10,
                  },
                },
                position: 'erPortPosition',
              },
            },
            items: [
              {
                id: '1-1',
                group: 'list',
                attrs: {
                  portNameLabel: {
                    text: 'ID',
                  },
                  portTypeLabel: {
                    text: 'STRING',
                  },
                },
              },
              {
                id: '1-2',
                group: 'list',
                attrs: {
                  portNameLabel: {
                    text: 'Name',
                  },
                  portTypeLabel: {
                    text: 'STRING',
                  },
                },
              },
              {
                id: '1-3',
                group: 'list',
                attrs: {
                  portNameLabel: {
                    text: 'Class',
                  },
                  portTypeLabel: {
                    text: 'NUMBER',
                  },
                },
              },
              {
                id: '1-4',
                group: 'list',
                attrs: {
                  portNameLabel: {
                    text: 'Gender',
                  },
                  portTypeLabel: {
                    text: 'BOOLEAN',
                  },
                },
              },
            ],
          },
        });
        graph.addNode(erRect);
      };
      return {
        addRect,
        rectConfig,
        toJson,
        erRect,
      };
    },
  });
</script>

<style scoped></style>
