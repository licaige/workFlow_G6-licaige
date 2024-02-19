<template>
  <a-button @click="test1">VUE嵌套</a-button>
  <div id="container"></div>
</template>

<script lang="ts">
  import { Graph, Shape, Node } from '@antv/x6';
  import { defineComponent, onMounted, ref, inject } from 'vue';

  import '@antv/x6-vue-shape';

  import { Card } from 'ant-design-vue';

  // 自定义组
  export class CustomGroup extends Node {
    private collapsed = false;
    private expandSize: { width: number; height: number } | undefined;

    protected postprocess() {
      this.toggleCollapse(false);
    }

    isCollapsed() {
      return this.collapsed;
    }

    toggleCollapse(collapsed?: boolean) {
      const target = collapsed == null ? !this.collapsed : collapsed;
      if (target) {
        this.attr('buttonSign', { d: 'M 1 5 9 5 M 5 1 5 9' });
        this.expandSize = this.getSize();
        this.resize(100, 32);
      } else {
        this.attr('buttonSign', { d: 'M 2 5 8 5' });
        if (this.expandSize) {
          this.resize(this.expandSize.width, this.expandSize.height);
        }
      }
      this.collapsed = target;
    }
  }
  CustomGroup.config({
    markup: [
      {
        tagName: 'rect',
        selector: 'body',
      },
      {
        tagName: 'text',
        selector: 'label',
      },
      {
        tagName: 'g',
        selector: 'buttonGroup',
        children: [
          {
            tagName: 'rect',
            selector: 'button',
            attrs: {
              'pointer-events': 'visiblePainted',
            },
          },
          {
            tagName: 'path',
            selector: 'buttonSign',
            attrs: {
              fill: 'none',
              'pointer-events': 'none',
            },
          },
        ],
      },
    ],
    attrs: {
      body: {
        refWidth: '100%',
        refHeight: '100%',
        strokeWidth: 1,
        fill: '#ffffff',
        stroke: 'none',
      },
      buttonGroup: {
        refX: 8,
        refY: 8,
      },
      button: {
        height: 14,
        width: 16,
        rx: 2,
        ry: 2,
        fill: '#f5f5f5',
        stroke: '#ccc',
        cursor: 'pointer',
        event: 'node:collapse',
      },
      buttonSign: {
        refX: 3,
        refY: 2,
        stroke: '#808080',
      },
      label: {
        fontSize: 12,
        fill: '#fff',
        refX: 32,
        refY: 10,
      },
    },
  });

  Graph.registerNode('vue-card', {
    inherit: 'vue-shape',
    x: 200,
    y: 150,
    width: 250,
    height: 130,
    component: {
      template: `
      <a-card :title="title">
        {{ context }}
      </a-card>
    `,
      components: {
        ACard: Card,
      },

      setup() {
        const title = ref('默认标题');
        const context = ref('默认内容');

        onMounted(() => {
          const getNode: Function | undefined = inject<Function>('getNode');

          const node: Node = getNode?.();

          title.value = node?.data?.title;
          context.value = node?.data?.context;

          // 监听数据改变事件
          node?.on('change:data', ({ current }) => {
            title.value = current.title;
          });
        });

        return {
          title,
          context,
        };
      },
    },
  });

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
          connecting: {
            allowBlank: false,
          },
          translating: {
            // 限制子节点的移动
            restrict(view) {
              const cell = view.cell;
              if (cell.isNode()) {
                const parent = cell.getParent();
                if (parent) {
                  return parent.getBBox();
                }
              }

              return null;
            },
          },
        });
      });

      const createCustomGroup = (id: string, x: number, y: number, width: number, height: number, fill: string) => {
        const group = new CustomGroup({
          id,
          x,
          y,
          width,
          height,
          zIndex: 1,
          attrs: {
            body: { fill },
            label: { text: id },
          },
          ports: {
            groups: {
              // 链接桩定义
              topGroup: {
                position: 'top', // https://x6.antv.vision/zh/docs/tutorial/basic/port#%E9%93%BE%E6%8E%A5%E6%A1%A9%E4%BD%8D%E7%BD%AE
                attrs: {
                  circle: {
                    r: 6,
                    magnet: true,
                    stroke: '#31d0c6',
                    strokeWidth: 2,
                    fill: '#fff',
                  },
                },
              },
              bottomGroup: {
                position: 'bottom', // https://x6.antv.vision/zh/docs/tutorial/basic/port#%E9%93%BE%E6%8E%A5%E6%A1%A9%E4%BD%8D%E7%BD%AE
                attrs: {
                  circle: {
                    r: 6,
                    magnet: true,
                    stroke: '#31d0c6',
                    strokeWidth: 2,
                    fill: '#fff',
                  },
                },
              },
            },
            items: [
              {
                id: 'port1',
                group: 'topGroup',
                attrs: {
                  text: {
                    // 标签选择器
                    text: 'top', // 标签文本
                  },
                },
              },
              {
                id: 'port2',
                group: 'bottomGroup',
                attrs: {
                  text: {
                    // 标签选择器
                    text: 'bottom', // 标签文本
                  },
                },
              },
            ],
          },
        });
        graph.addNode(group);
        return group;
      };

      // 构造函数创建
      const test1 = () => {
        const start = new Shape.Rect({
          id: 'start',
          x: 0,
          y: 260,
          width: 80,
          height: 40,
          label: 'start',
        });
        graph.addNode(start);

        const parent = createCustomGroup('条件表达式', 100, 40, 800, 500, '#91d5ff');

        // 添加边
        graph.addEdge({
          source: start, // 源节点
          target: parent, // 目标节点
        });

        // 折叠
        graph.on('node:collapse', ({ node }: { node: CustomGroup }) => {
          node.toggleCollapse();
          const collapsed = node.isCollapsed();
          const cells = node.getDescendants();
          cells.forEach((node) => {
            if (collapsed) {
              node.hide();
            } else {
              node.show();
            }
          });
        });

        const childIF = graph.addNode({
          x: 350,
          y: 150,
          zIndex: 10,
          shape: 'vue-card',
          data: {
            title: 'IF',
            context: 'if中的内容',
          },
        });
        parent.addChild(childIF);

        const childThen = graph.addNode({
          x: 200,
          y: 300,
          zIndex: 10,
          shape: 'vue-card',
          data: {
            title: 'Then',
            context: 'Then中的内容',
          },
        });
        parent.addChild(childThen);

        // 添加边
        graph.addEdge({
          source: childIF, // 源节点
          target: childThen, // 目标节点
        });

        const childElse = graph.addNode({
          x: 500,
          y: 300,
          zIndex: 10,
          shape: 'vue-card',
          data: {
            title: 'Else',
            context: 'Else中的内容',
          },
        });
        parent.addChild(childElse);

        graph.addEdge({
          source: childIF, // 源节点
          target: childElse, // 目标节点
        });

        const end = new Shape.Rect({
          id: 'end',
          x: 920,
          y: 260,
          width: 80,
          height: 40,
          label: 'end',
        });
        graph.addNode(end);

        // 添加边
        graph.addEdge({
          source: parent, // 源节点
          target: end, // 目标节点
        });
      };
      return {
        test1,
      };
    },
  });
</script>

<style scoped></style>
