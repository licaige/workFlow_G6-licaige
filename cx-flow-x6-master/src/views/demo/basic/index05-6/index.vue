<template>
  <div id="container"></div>
</template>

<script lang="ts">
  import { Graph } from '@antv/x6';
  import { Group } from './shape';
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
          embedding: {
            enabled: true,
          },
        });
        const createGroup = (id: string, x: number, y: number, width: number, height: number, fill: string) => {
          const group = new Group({
            id,
            x,
            y,
            width,
            height,
            attrs: {
              body: { fill },
              label: { text: id },
            },
          });
          graph.addNode(group);
          return group;
        };

        const createNode = (id: string, x: number, y: number, width: number, height: number, fill: string) => {
          return graph.addNode({
            id,
            x,
            y,
            width,
            height,
            attrs: {
              body: {
                fill: fill || 'blue',
                stroke: 'none',
              },
              label: {
                text: id,
                fill: '#fff',
                fontSize: 12,
              },
            },
          });
        };

        const createEdge = (id: string, source: string, target: string, vertices?: { x: number; y: number }[]) => {
          return graph.addEdge({
            id,
            source,
            target,
            vertices,
            label: id,
          });
        };

        const a = createGroup('a', 100, 40, 480, 280, '#91d5ff');
        const aa = createGroup('aa', 180, 100, 160, 140, '#47C769');
        const aaa = createGroup('aaa', 200, 160, 120, 40, '#3199FF');
        const c = createNode('c', 450, 200, 50, 50, 'orange');

        a.addChild(aa);
        aa.addChild(aaa);
        a.addChild(c);

        createNode('d', 680, 80, 50, 50, 'black');

        createEdge('edge1', 'aa', 'c');
        createEdge('edge3', 'c', 'd');
        aa.addChild(
          createEdge('edge2', 'aa', 'aaa', [
            { x: 60, y: 140 },
            { x: 60, y: 220 },
          ]),
        );
        // 当父节点展开/折叠时显示/隐藏对应的子节点
        graph.on('node:collapse', ({ node }: { node: Group }) => {
          node.toggleCollapse();
          const collapsed = node.isCollapsed();
          const collapse = (parent: Group) => {
            const cells = parent.getChildren();
            if (cells) {
              cells.forEach((cell) => {
                if (collapsed) {
                  cell.hide();
                } else {
                  cell.show();
                }

                if (cell instanceof Group) {
                  if (!cell.isCollapsed()) {
                    collapse(cell);
                  }
                }
              });
            }
          };

          collapse(node);
        });
      });

      return {};
    },
  });
</script>

<style scoped>
  body {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans',
      'Helvetica Neue', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
  }

  .app {
    font-family: sans-serif;
    display: flex;
    padding: 16px 8px;
  }

  .app-side {
    bottom: 0;
    padding: 0 8px;
  }

  .app-content {
    flex: 1;
    height: 240px;
    margin-left: 8px;
    margin-right: 8px;
    box-shadow: 0 0 10px 1px #e9e9e9;
  }

  .ant-card {
    box-shadow: 0 0 10px 1px #e9e9e9;
  }

  .ant-card-head-title {
    text-align: center;
  }

  .ant-row {
    margin: 16px 0;
    text-align: left;
  }

  .slider-value {
    background: #eee;
    color: #333333;
    padding: 3px 7px;
    border-radius: 10px;
    display: inline-block;
    font-size: 12px;
    margin-left: 8px;
    line-height: 1.25;
  }
</style>
